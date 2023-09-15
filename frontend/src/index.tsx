import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "views/home/home";
import NotFounded from "views/not-founded/not-founded";
//import 'bootstrap/dist/css/bootstrap.min.css';
import Search from "views/search/search";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFounded />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/search",
                element: <Search />,
            },
        ],
    },
]);

const theme = createTheme({
    palette: {
        primary: {
            main: "#134074",
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <RouterProvider router={router} />
            </LocalizationProvider>
        </ThemeProvider>
    </React.StrictMode>
);
