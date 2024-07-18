import React, { useState, useEffect } from "react";
import { ShyftSdk, Network } from "@shyft-to/js";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListAll from "./ListAll";
import CreateNFT from "./CreateNFT";

import TestList from "./components/TestList";
import CreateTestPage from "./components/CreateTestPage";


import DetailExam from "./views/DetailExam";
import Exams from "./views/Exams";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<ListAll />} />
          <Route exact path="/create" element={<CreateNFT />} />

          <Route exact path="/showTest" element={<TestList  />} />
          <Route path="/createTest" element={<CreateTestPage />} /> 
                    
          <Route path="/exam/detail/:id" element={<DetailExam />} />
          <Route exact path="/" element={<Exams />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
