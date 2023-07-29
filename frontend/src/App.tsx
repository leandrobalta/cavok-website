import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Home from "views/home/home";
import { Header } from "components/layout";

function App() {
    return (
        <div className="App">
            <Header />
            <Outlet />
            <br />
            <footer>i am a footer todo: create me</footer>
        </div>
    );
}

export default App;
