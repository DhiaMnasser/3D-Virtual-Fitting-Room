import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import * as api from "../../../api/index";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./createAvatar.css";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: 200,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};

export default function MyDropzone() {
  const [fileBase64, setFileBase64] = useState();
  const [inputFile, setInputFile] = useState([]);
  const history = useHistory();

  const currentUser = JSON.parse(localStorage.getItem("profile")).result;
  const profile = JSON.parse(localStorage.getItem("profile"));

  const thumbs = inputFile.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  const onDrop = useCallback(async acceptedFiles => {
    // Do something with the files
    setFileBase64(await toBase64(acceptedFiles[0]));
    setInputFile(
      acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    );
    // let fileBase64 = await toBase64(acceptedFiles[0]);
    // console.log(await toBase64(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: "image/*",
    onDrop
  });

  // const createAvatar = () =>{

  //   console.log(inputFile[0]);
  //   api.uploadFileavatar(inputFile[0]).then(result=>{
  //     console.log(result);
  //     let formData = new FormData();
  //     let fileUrl;
  //     // formData.append("caption", this.state.caption);
  //     formData.append("file", inputFile[0]);

  //     return api.uploadFile(formData);

  //     // currentUser.avatar = result;
  //     // return api.updateUser(currentUser._id, currentUser);
  //   })
  //   .then(response => {
  //     response.data.success
  //       ? alert(
  //           "File successfully uploaded" +
  //             JSON.stringify(response.data.message, null, 4)
  //         )
  //       : alert("File already exists");
        
  //     // this.fetchRecent();
  //   })
  //   .catch(err => alert("Error useEffect: " + err));
  //   // .then(updatedUser =>{
  //   //   localStorage.setItem('profile', updatedUser);
  //   //   history.push('/showMyAvatar');
  //   // });
  // }

  /*function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});

        
    };*/
    function dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      var byteString = atob(dataURI.split(',')[1]);
      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length);
      var dw = new DataView(ab);
      for(var i = 0; i < byteString.length; i++) {
          dw.setUint8(i, byteString.charCodeAt(i));
      }
      // write the ArrayBuffer to a blob, and you're done
      return new Blob([ab], {type: mimeString});
  };

//   function srcToFile(src, fileName, mimeType){
//     return (fetch(src)
//         .then(function(res){return res.arrayBuffer();})
//         .then(function(buf){return new File([buf], fileName, {type:mimeType});})
//     );
// }
  
  const createAvatar = () => {
    api.uploadFileavatar(inputFile[0])
      /*.then(res => {
        // const Avatar= res.data;
        console.log(JSON.stringify(res.data));

        let formData = new FormData();
        let fileUrl;
        formData.append("caption", this.state.caption);
        formData.append("file", file);

        return api.uploadFile(formData);
      })
      .then(response => {
        let fileUrl;

        response.data.success
          ? fileUrl = response.data.message.filename
          : fileUrl = null;

        return fileUrl;

      })*/
      .then(result =>{
        // const a = JSON.stringify(result.data);
        // console.log(a);
        console.log(JSON.stringify(result));

        if(result){
          
          console.log("currentUser",currentUser);
          currentUser.avatar = result.data;
          console.log("currentUser",currentUser);
          //api.setAvatar(currentUser._id , currentUser);
          return api.setAvatar(currentUser._id, currentUser);
        }else {
          throw 'Error2' ;
        }

      })
      .then(result => {
        //  localStorage.setItem('profile', updatedUser);
        console.log(result);
        currentUser.avatar = result.data.avatar;
        profile.result = currentUser
        localStorage.setItem("profile", JSON.stringify(profile));
      })

      .catch(error =>{
        console.log("error",error);
        
      });
  };



  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      inputFile.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [inputFile]
  );

  return (
    <Container>
      <Row>
        <h1>Create My Avatar</h1>
      </Row>
      <Row>
        <Col>
          <div {...getRootProps()} className="dropzone-content">
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="title">Drop your image here ...</p>
            ) : (
              <p className="title">
                Drag 'n' drop your image here, or click to select an image
              </p>
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
      {inputFile.length !== 0 && (
        <Row className="continue-col">
          {/* <Link to="/avatar"> */}
          {/* <div className="take-picture-content"> */}
          <button
            className="site-btn "
            onClick={() => {
              createAvatar();
            }}
          >
            Continue
          </button>
          {/* </div> */}
          {/* </Link> */}
        </Row>
      )}
    </Container>
  );
}
