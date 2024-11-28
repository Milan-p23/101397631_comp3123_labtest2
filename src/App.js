import React from "react";
import Weather from "./components/Weather";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    return (
        <div className="container text-center py-5">
            <Weather />
        </div>
    );
};

export default App;
