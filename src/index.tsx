import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement // Asserção de tipo para HTMLElement
);
root.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
