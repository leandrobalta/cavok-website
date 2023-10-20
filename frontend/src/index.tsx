import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "pages/home/home";
import NotFounded from "pages/not-founded/not-founded";
//import 'bootstrap/dist/css/bootstrap.min.css';
import Search from "pages/search/search";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material";
import LoginPage from "pages/login/login";
import Signin from "pages/signin/signin";
import Payment from "pages/payment/payment";
import { LoadingProvider } from "hooks/use-loading";
import { AlertUtilsProvider } from "context/alert-utils.context";
import Politics  from 'pages/politics/politics'
import Terms from "pages/terms/terms";
import Privacy from "pages/privacy/privacy";

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
                children: [
                    {
                        path: "payment",
                        element: <Payment />,
                    },
                ],
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/signin",
                element: <Signin />,
            },
            {
                path: "/politics",
                element: <Politics />,
            },
            {
                path: "/terms",
                element: <Terms />,
            },
            {
                path: "/privacy",
                element: <Privacy />,
            }
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
                <AlertUtilsProvider>
                    <LoadingProvider>
                        <RouterProvider router={router} />
                    </LoadingProvider>
                </AlertUtilsProvider>
            </LocalizationProvider>
        </ThemeProvider>
    </React.StrictMode>
);
