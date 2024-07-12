import React, { useState, useEffect } from "react";
import { ShyftSdk, Network } from "@shyft-to/js";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListAll from "./ListAll";
import CreateNFT from "./CreateNFT";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<ListAll />} />
          <Route exact path="/create" element={<CreateNFT />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;