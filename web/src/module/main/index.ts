import Recoil from "recoil";
import type { State } from "./type";
import { Main } from "./Main";

const initialState: State = {};

const MainState = Recoil.atom({
  key: "MainState",
  default: initialState,
});

export const useMainState = <T>(fn: (state: State) => T): T => {
  const state = Recoil.useRecoilValue(MainState);
  return fn(state);
};

export const useMainStateAction = () => {
  return {};
};

export const MainComponent = Main;
