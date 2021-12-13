import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "theme";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
    <ThemeProvider theme={ darkTheme }>
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
    </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);