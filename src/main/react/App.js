


import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header.js';
import About from './components/about.js'; 
import Help from './components/Help';

import NasaDataComponent from "./components/NasaDataComponent.js";
const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<NasaDataComponent />} />
          <Route path="/about" element={<About />} />
         <Route path="/help" element={<Help />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;