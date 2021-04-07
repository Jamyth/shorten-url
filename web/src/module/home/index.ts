import { Main } from "./Main";
import Recoil from "recoil";
import { injectLifeCycle } from "util/injectLifecycle";
import type { State } from "./type";

const initialState: State = {};

const HomeState = Recoil.atom({
  key: "HomeState",
  default: initialState,
});

export const useHomeState = <T>(fn: (state: State) => T): T => {
  const state = Recoil.useRecoilValue(HomeState);
  return fn(state);
};

export const useHomeStateAction = () => {
  return {};
};

export const MainComponent = injectLifeCycle(Main, useHomeStateAction);
