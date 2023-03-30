import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import BaseRouter from "~/router/BaseRouter";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <BaseRouter />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
