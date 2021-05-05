import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link , useHistory} from 'react-router-dom';

import "./createAvatar.css";
import { dimensions } from "./dimensions";


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
const [x, setX] =useState(0);
const [y, setY] =useState(0);
const [inter, setInter] =useState();
const history = useHistory();
// let x=0, y=0;


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

// console.log('fileBase64');
// console.log(fileBase64);
// console.log('inputFile');
// console.log(inputFile);



  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    maxFiles:1,
    accept: 'image/*',
    onDrop
  });


  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    inputFile.forEach(file => URL.revokeObjectURL(file.preview));
    
  }, [inputFile]);



  useEffect(()=>{
    // x = dimensions(fileBase64).width;
    // y = dimensions(fileBase64).height;
    console.log('useEffect fileBase64');
    console.log('x',x);
    console.log('y',y);
    // initInterval();
    const interval = setInterval(() => {
      console.log('This will run every 5 seconds!');
      if( x===0 || y===0){
    console.log('x',x);
    console.log('y',y);
  
      updateDim();
      }
    }, 5000);
    setInter(interval);


    
  },[fileBase64])
  const updateDim =()=>{

      console.log('updateDim x,y');
      if(x===0){

      // let xx = ;
      setX(dimensions(fileBase64).width);
      console.log('x',x);
      }
      else{
        localStorage.setItem('x', x);
      }
      if(y===0){

      // let yy = dimensions(fileBase64).height;
      setY(dimensions(fileBase64).height);
      console.log('y',y);
      }
      else{
        localStorage.setItem('y', y);
      }
      // updateDim();
  }

  // const initInterval = ()=>{

  //   const inter = setInterval(() => {
  //     console.log('This will run every 5 seconds!');
  //     if( x===0 || y===0){
  //   console.log('x',x);
  //   console.log('y',y);
  
  //     updateDim();
  //     }
  //   }, 5000);

  //   setInterval(inter);

  //   // if(x!==0 || y!==0){
  //   //   clearInterval(interval);
  //   // };

  //   // return ()=>{

  //   //     // clearInterval(interval);
      
  //   // }

  // };

  useEffect(()=>{
 if(x!==0 || y!==0){
      clearInterval(inter);
    };
  },[x,y]);
  
  useEffect(()=>{
    return ()=>{
        clearInterval(inter);

    }
  })

  return (
    <Container>
      <Row>
      <Col>
            <Link to="/showMyAvatar">
            <div className="take-picture-content">
            <p className="title">Show My Avatar</p>
            </div>
            </Link>
        </Col>
        <Col>
            <Link to="/createAvatar">
            <div className="take-picture-content">
            <p className="title">Create An Avatar</p>
            </div>
            </Link>
        </Col>
        <Col>
          <div {...getRootProps()} className="dropzone-content">
          <p className="title">Get My Measurements</p>
            <input {...getInputProps()}  />
            {isDragActive ? (
              <p className="title">Drop your image here ...</p>
            ) : (
              <p className="title">Drag 'n' drop your image here, or click to select an image</p>
              )}

              {thumbs}

          </div>
        </Col>
       
      </Row>
      {(inputFile.length!==0 && x!==0) && (
      <Row className="continue-col">
        <button className="site-btn " onClick={()=>{
          localStorage.setItem('x', x);
          localStorage.setItem('y', y);
          history.push({
            pathname: '/terminos',
            image:fileBase64
          });

        }}>Continue</button>
        
      </Row>
      )}
    </Container>
  );
}