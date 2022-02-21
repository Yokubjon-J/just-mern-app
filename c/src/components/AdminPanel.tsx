import React, {useEffect} from 'react';
import Navigation from './Navigation'
// import NewRichTextEditor from './NewRichTextEditorWithUseState';
import NewRTEuseRed from './NewRichTextEditorWithUseReducer';
import 'react-quill/dist/quill.snow.css';

const AdminPanel = () => {
  useEffect(() => {
    console.log("Rendering AdminPanel");
  })
  return (
    <>
        <Navigation/>
        {/* <NewRichTextEditor/>
        <p>Qozitarnow</p> */}
        <NewRTEuseRed/>
    </>
  );
};

export default AdminPanel;
