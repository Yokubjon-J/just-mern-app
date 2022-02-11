import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import LinearColor from './LinearColor';
import ReactQuill, {Quill} from 'react-quill';
import {ImageResize} from 'quill-image-resize-module-ts';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import SCPButton from "./SuperComplexPublishButton";

Quill.register('modules/imageResize', ImageResize);

export default function NewRichTextEditor() {
  useEffect(() => {
    console.log("Rendering newRichTE");
  })

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  const [waiting, setWaiting] = useState<Boolean>(false);
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | any, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const whenSubmit = (e:any) =>{
    e.preventDefault();
    setWaiting(true);
    axios.post("/post", { //You either do async/await or a Promise chain. Not both.
      title, //in server, it will be referred to as "req.body.title"
      content: value //in server, it will be referred to as "req.body.body"
    }, {
      headers: {'Content-Type': 'application/json'},
    }).then(function(res) {
      // inputRef.current = null //even if setValue updates the state, inputRef value won't be rendered on the screen, so I had to use "title" state
      setTitle("");
      setValue(""); //clearing quill contents
      setWaiting(false);
      setStatus(Number(res.status));
      handleClick();
      console.log(res);
    });
  }

  return (
    <>
      {waiting ? (
        <LinearColor/>
      ) : (
        <div style={{
          padding:"20px 20px 0"
        }}>
        <form onSubmit={(e) => whenSubmit(e)}>
          <input type="text" placeholder="Title"
            value={title} 
            onChange={(e:any) => setTitle(e.target.value)}
            ref={inputRef}
            style={{
              width: "100%",
              height:"32px",
              // border:"none",
              boxSizing:"border-box",
            }}
          />
          <ReactQuill theme="snow" value={value} onChange={setValue}
            placeholder="New blog"
            modules={{
              toolbar: {
                  container: [
                      [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
                      [{ size: [] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['link', 'image', 'video'],
                      ['clean'],
                      ['code-block']
                  ],
              },
              imageResize: {
                modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
              }
          }}
          />
          {/* <input type="submit"></input> */}
          <IconButton type="submit">
            <SCPButton/>
          </IconButton>
        </form>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        {status === 200 ? (
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                Success!
            </Alert>
        ) : (
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Error. Please try again.
            </Alert>
        )}
      </Snackbar>
      </div>
      )}
    </>
  );
}
