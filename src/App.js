import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import ListAll from "./components/ListAll";
import CreateNFT from "./components/CreateNFT";
import CreateCertificateNFT from "./components/CreateCertificateNFT";
import TestList from "./components/TestList";
import CreateTestPage from "./components/CreateTestPage";
import DetailExam from "./views/DetailExam";
import Exams from "./views/Exams";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/listall" element={<ListAll />} />
          <Route exact path="/create" element={<CreateNFT />} />
          <Route exact path="/create-certificate" element={<CreateCertificateNFT />} /> {/* Thêm route cho CreateCertificateNFT */}
          <Route exact path="/showTest" element={<TestList />} />
          <Route path="/createTest" element={<CreateTestPage />} />
          <Route path="/exam/detail/:id" element={<DetailExam />} />
          <Route exact path="/" element={<Exams />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
