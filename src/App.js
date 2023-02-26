import React, { useEffect, useState } from "react";
import Header from "./Component/Header";
import Trading from "./Component/Trading";
import UserProfile from "./Component/UserProfile";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<UserProfile />} />
        <Route path="/trading/:id" element={<Trading />} />
      </Routes>
    </div>
  );
};

export default App;
