import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Recoil from "recoil";
import { NavigationService } from "util/NavigationService";
import { ObjectUtil } from "jamyth-web-util";
import { ChakraProvider } from "@chakra-ui/react";

export const Main = React.memo(() => {
  return (
    <Recoil.RecoilRoot>
      <ChakraProvider>
        <BrowserRouter>
          <Switch>
            {ObjectUtil.toArray(NavigationService, (path, config) => {
              return (
                <Route
                  exact
                  path={path}
                  component={config.component}
                  key={config.name}
                />
              );
            })}
          </Switch>
        </BrowserRouter>
      </ChakraProvider>
    </Recoil.RecoilRoot>
  );
});
