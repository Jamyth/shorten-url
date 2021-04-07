import React from "react";
import { async } from "./async";

type Route = "/";

interface RouteConfig {
  name: string;
  component: React.ComponentType<any>;
}

export const NavigationService: Record<Route, RouteConfig> = {
  "/": {
    name: "Home Page",
    component: async(() => import("module/home"), "MainComponent"),
  },
};
