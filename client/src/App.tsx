import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Components/Home/home"
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;