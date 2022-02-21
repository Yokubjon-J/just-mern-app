import React, {useEffect} from 'react';
import Navigation from './Navigation'
import NewRichTextEditor from './NewRichTextEditorWithUseReducer';
import 'react-quill/dist/quill.snow.css';
import '../App.css';
import { Outlet, Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const AdminPanel = () => {
  let params = useParams();
  useEffect(() => {
    console.log("Rendering AdminPanel", params.new);
  })
  return (
    <div className='App'>
        <Navigation/>
        <Outlet/>
    </div>
  );
};

export default AdminPanel;
