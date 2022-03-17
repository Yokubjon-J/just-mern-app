import React, { useState, useReducer, useRef, useEffect, useMemo } from "react";
import axios from 'axios';
import LinearColor from './LinearColor';
import ReactQuill, {Quill} from 'react-quill';
import {ImageResize} from 'quill-image-resize-module-ts';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import SCPButton from "./SuperComplexPublishButton";
import reducer from './reducer';

Quill.register('modules/imageResize', ImageResize);

export default function NewRichTextEditor() {
  useEffect(() => {
    console.log("Rendering newRichTEuseRed");
  })

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  const [value, setValue] = useState('');
  const initialState = {
      waiting: false,
      title: "",
      open:false,
      status:0,
  }
  let inputRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClose = (event?: React.SyntheticEvent | any, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({type: "CLOSE_SNACKBAR",});
  };

  const setvalueOfInput = (e:React.ChangeEvent<HTMLInputElement>) => dispatch({type:"UPDATE_INPUT_VALUE", payload: e.target.value})
  const whenSubmit = (e:any) =>{
    e.preventDefault();
    const unprivilegedEditor = inputRef.current.makeUnprivilegedEditor(inputRef.current.getEditor());
    if (unprivilegedEditor.getLength() - 1 < 50) return "body length is too small"
    dispatch({type:"LOADING"})
    axios.post("/post", { //You either do async/await or a Promise chain. Not both.
      title:state.title, //in server, it will be referred to as "req.body.title"
      content: value //in server, it will be referred to as "req.body.body"
    }, {
      headers: {'Content-Type': 'application/json'},
    }).then(function(res) {
      dispatch({type:"SUCCESS", payload:Number(res.status)});
      setValue("");
      console.log(res);
    }).catch(e => {
      dispatch({type: "ERROR", payload:Number(e.response.status)})
    });
  }

  const BlockEmbed = Quill.import('blots/block/embed');

  const quillImageCallback = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      let formData = new FormData();
      const file = input.files[0]; console.log("input.files[0]: ", input.files);
      formData.append('image', file); console.log("file: ", file.name) 
      let fileName = file.name;
      axios.post("/imageupload", {
        image: file,
        filename: file.name,
      }, {
        headers: {'Content-Type': 'image/*'},
      }).then(function(res) {
        console.log("response after uploading image: ",res);
      }).catch(e => {
        console.log("error after uploading image: ", e);
      });
    }
  };

  const modules = useMemo(()=>( //w/o bug will arise, refer https://stackoverflow.com/questions/59825450/react-quill-custom-image-handler-module-causing-typing-issues-with-the-editor
    {
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
          'handlers': {
            image: quillImageCallback
          }
      },
      clipboard: {
        matchVisual: false,
      },
      imageResize: {
        parchment: Quill.import('parchment'),
        modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
      }
  }
  ), []);

  return (
    <>
      {state.waiting ? (
        <LinearColor/>
      ) : (
        <div style={{
          padding:"20px 20px 0"
        }}>
        <form onSubmit={(e) => whenSubmit(e)}>
          <input type="text" placeholder="Title"
            minLength={7}
            value={state.title}
            onChange={setvalueOfInput}
            style={{
              width: "100%",
              height:"32px",
              // border:"none",
              boxSizing:"border-box",
            }}
          />
          <ReactQuill theme="snow" value={value} onChange={setValue}
            placeholder="New blog"
            ref={inputRef}
            modules={modules}
          />
          {/* <input type="submit"></input> */}
          <IconButton type="submit">
            <SCPButton/>
          </IconButton>
        </form>
        <Snackbar open={state.open} autoHideDuration={2000} onClose={handleClose}>
        {state.status === 200 ? (
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                Success!
            </Alert>
        ) : state.status >= 500 ? (
            <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                Server error. Please try again later.
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
