import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Location } from "history";
import { usePrevious } from "./usePrevious";

export interface DefaultAction<RouteParam, HistoryState> {
  onMount?: () => void;
  onRouteMatched?: (
    routeParam: RouteParam,
    history: Location<Readonly<HistoryState> | undefined>
  ) => void;
  [method: string]: ((...args: any[]) => void) | undefined;
}

export function injectLifeCycle<RouteParam = {}, HistoryState = {}>(
  Component: React.ComponentType<any>,
  useActions: () => DefaultAction<RouteParam, HistoryState>
) {
  return React.memo(() => {
    const location = useLocation<HistoryState>();
    const routeParam = useParams<RouteParam>();
    const { onMount, onRouteMatched } = useActions();
    const previousLocation = usePrevious(location);

    React.useEffect(() => {
      onMount?.();
      onRouteMatched?.(routeParam, location);
    }, []);

    React.useEffect(() => {
      if (previousLocation && location && previousLocation !== location) {
        onRouteMatched?.(routeParam, location);
      }
    }, [location]);

    return Component ? <Component /> : null;
  });
}
