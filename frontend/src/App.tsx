import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { Footer, NavBar } from "components/layout";
import "react-datetime/css/react-datetime.css";

function App() {
    return (
        <div className="App">
            {/* <Header /> */}
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
}

export default App;
