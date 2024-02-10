import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Profile from "../components/Profile";
import Layout from "../components/Layout";
import Items from "../components/Items";

export default (
  <Router>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  </Router>
);
