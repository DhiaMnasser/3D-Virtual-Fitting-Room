import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import * as api from "../../../api/index";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import "./createAvatar.css";


const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 200,
    height: 200,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };

export default function MyDropzone() {


const [fileBase64, setFileBase64] =useState();
const [inputFile, setInputFile] =useState([]);
const history = useHistory();

const currentUser = JSON.parse(localStorage.getItem('profile'));



const thumbs = inputFile.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    
  const onDrop = useCallback(async acceptedFiles => {
    // Do something with the files
    setFileBase64(await toBase64(acceptedFiles[0]));
    setInputFile(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    // let fileBase64 = await toBase64(acceptedFiles[0]);
    // console.log(await toBase64(acceptedFiles[0]));
    
    
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    maxFiles:1,
    accept: 'image/*',
    onDrop
  });
const createAvatar = () =>{

  console.log(inputFile[0]);
  api.uploadFileavatar(inputFile[0]).then(result=>{
    console.log(result);
    
    // currentUser.avatar = result;
    // return api.updateUser(currentUser._id, currentUser);
  });
  // .then(updatedUser =>{
  //   localStorage.setItem('profile', updatedUser);
  //   history.push('/showMyAvatar');
  // });
}



  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    inputFile.forEach(file => URL.revokeObjectURL(file.preview));
  }, [inputFile]);

  return (
    <Container>
      <Row >
        <h1 >Create My Avatar</h1>
      </Row>
      <Row>
        <Col>
          <div {...getRootProps()} className="dropzone-content">
            <input {...getInputProps()}  />
            {isDragActive ? (
              <p className="title">Drop your image here ...</p>
            ) : (
              <p className="title">Drag 'n' drop your image here, or click to select an image</p>
              )}

              {thumbs}

          </div>
        </Col>
        <Col>
            <Link to="/TakePicture">
            <div className="take-picture-content">
            <p className="title">Take A Picture</p>
            </div>
            </Link>
        </Col>
      </Row>
      {inputFile.length!==0 && (
      <Row className="continue-col">

          {/* <Link to="/avatar"> */}
            {/* <div className="take-picture-content"> */}
            <button className="site-btn " onClick={()=>{createAvatar()}}>Continue</button>
            {/* </div> */}
            {/* </Link> */}
      </Row>
      )}
    </Container>
  );
}
