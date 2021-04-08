import Recoil from "recoil";
import { produce } from "immer";

export type SetCoilState<State> = (
  stateOrUpdater: ((state: State) => void) | State | Pick<State, keyof State>
) => void;

export const useCoilState = <State>(
  recoilState: Recoil.RecoilState<State>
): {
  getState: () => State;
  setState: SetCoilState<State>;
} => {
  const [state, setState] = Recoil.useRecoilState(recoilState);

  let updatedState: State = state;

  const getState = () => updatedState;

  const setCoilState: SetCoilState<State> = (
    stateOrUpdater: ((state: State) => void) | Pick<State, keyof State> | State
  ) => {
    if (typeof stateOrUpdater === "function") {
      const originalState = updatedState;
      const updater = stateOrUpdater as (state: State) => void;
      const newState = produce<Readonly<State>, State>(
        originalState,
        (draftState) => {
          // Wrap into a void function, in case updater() might return anything
          updater(draftState);
        }
      );
      if (newState !== originalState) {
        updatedState = newState;
        setState(newState);
      }
      return;
    } else {
      const partialState = stateOrUpdater as object;
      return setCoilState((state) => Object.assign(state, partialState));
    }
    throw Error(
      "[setCoilState]: only function and state are allowed in this method."
    );
  };
  return {
    getState,
    setState: setCoilState,
  };
};
