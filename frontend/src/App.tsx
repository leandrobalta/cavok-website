import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { Header, Footer } from "components/layout";

function App() {
    return (
        <div className="App">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default App;
