import React, { Suspense, useReducer, useState } from "react";
import { Link, useHistory } from 'react-router-dom';

import ShowMyAvatarThreeJS from "./showMyAvatarThreeJS";
import female from "./models/standard-female-figure.gltf";
import male from "./models/male.gltf";
const style = {
  display: 'flex',
justifyContent : 'center',
margin : '2vh auto'
};
const style2 = {
  display: 'flex',
  flexDirection: 'column',
}

export default function Avatar(props) {
  const currentUser = JSON.parse(localStorage.getItem('profile'));
  
  const [model, setModel] = useState(male);
  const [update, setUpdate] = useState(true);
  const [avatar, setAvatar] = useState(currentUser?.avatar);
  const history = useHistory();

  if(currentUser?.gender==="M"){
    setModel(male);
  }else{
    setModel(female);
  }
  return (
    <>
             <div style={style2}>   
      <div className="container" style={style}>

          
              <ShowMyAvatarThreeJS
                model={model}
              />
                 
          </div>
          {!avatar && (
            <button className="site-btn" onClick={()=>{history.push('/avatar')}}>Create My Custom Avatar</button>
            )}
            </div>
    </>
  );
}
