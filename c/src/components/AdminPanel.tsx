import React from 'react';
import Navigation from './Navigation'
import NewRichTextEditor from './NewRichTextEditor';
import 'react-quill/dist/quill.snow.css';

const AdminPanel = () => {
  return (
    <>
        <Navigation/>
        <NewRichTextEditor/>
    </>
  );
};

export default AdminPanel;
