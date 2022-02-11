import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="App"><Outlet/></div>}> {/*w/o <Outlet/>, nesting wouldn't be possible*/}
          <Route path="admin" element={<AdminPanel/>} />
          <Route path="home" element={<p>Home</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
