import React, {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPanel from './components/AdminPanel';
import NewRichTextEditor from './components/NewRichTextEditorWithUseReducer';

function App() {
  useEffect(() => {
    console.log("Rendering App.tsx");
  })
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<p>Home</p>}/>
        <Route path="admin" element={<AdminPanel/>}>
          <Route path="new" element={<NewRichTextEditor/>}/>
          <Route path="all" element={<p>All your posts:</p>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
