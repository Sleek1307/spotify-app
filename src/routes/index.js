import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Login from "../views/Login";
import Home from "../views/Home";
import Layout from "../views/layout";
import PrivateRoute from "../component/PrivateRoute";

export default function RoutesList() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout page={<Login />} />} />
                <Route path="/home" element={<PrivateRoute  component={<Layout page={<Home />} />} />} />
            </Routes>
        </Router>)
}