import { Main } from "./Main";
import Recoil from "recoil";
import { injectLifeCycle } from "util/injectLifecycle";
import type { State } from "./type";
import { useCoilState } from "util/useCoilState";
import { V1AJAXService } from "../../util/service/V1AJAXService";
import { useToast } from "@chakra-ui/react";

const initialState: State = {
  url: "",
  shortenedURL: null,
  copied: false,
};

const HomeState = Recoil.atom({
  key: "HomeState",
  default: initialState,
});

export const useHomeState = <T>(fn: (state: State) => T): T => {
  const state = Recoil.useRecoilValue(HomeState);
  return fn(state);
};

export const useHomeStateAction = () => {
  const { getState, setState } = useCoilState(HomeState);
  const toast = useToast();

  const updateURL = (url: string) => {
    setState((state) => (state.url = url));
  };

  const copyToClipboard = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setState((state) => (state.copied = true));

    toast({
      title: "Successful",
      description: "URL is copied to clipboard",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });

    await new Promise<void>((res) =>
      setTimeout(() => {
        setState((state) => (state.copied = false));
        res();
      }, 5000)
    );
  };

  const getShortenedURL = async () => {
    const url = getState().url;
    const shortenedURL = await V1AJAXService.createShortURL({ url });
    setState((state) => (state.shortenedURL = shortenedURL));
    copyToClipboard(shortenedURL);
  };

  return {
    updateURL,
    copyToClipboard,
    getShortenedURL,
  };
};

export const MainComponent = injectLifeCycle(Main, useHomeStateAction);
