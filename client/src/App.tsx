import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Components/Home/home"
import Loggin from "./Components/admin/loggin"
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/loggin' element ={<Loggin/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
