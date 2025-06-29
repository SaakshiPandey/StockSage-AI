import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0a0a0a", // Solid black background
      paper: "rgba(255, 255, 255, 0.05)", // Glass card base
    },
    text: {
      primary: "#ffffff",
      secondary: "#a0a0a0",
    },
    primary: {
      main: "#90caf9", // Light blue
    },
    secondary: {
      main: "#66bb6a", // Light green
    },
  },
  typography: {
    fontFamily: "Segoe UI, Roboto, sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
