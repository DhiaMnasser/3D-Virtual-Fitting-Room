import React, { Suspense, useReducer, useState } from "react";
import { Link, useHistory } from 'react-router-dom';

import ShowMyAvatarThreeJS from "./showMyAvatarThreeJS";
import female from "./models/female1.obj";
import male from "./models/male1.obj";
import chris from "./models/chris.obj";
const style = {
  display: 'flex',
justifyContent : 'center',
margin : '2vh auto'
}

export default function Avatar(props) {
 // const currentUser = JSON.parse(localStorage.getItem('profile'));
 const currentUser =JSON.parse(localStorage.getItem('profile')) ;
 let theAvatar ;
  const [model, setModel] = useState(male);
  const [update, setUpdate] = useState(true);
  const [avatar, setAvatar] = useState(currentUser?.avatar);
  const history = useHistory();
 
  // console.log( "chris" ,chris)
  // console.log( "avatar" ,currentUser?.result.avatar)

  
  /*if(currentUser?.avatar){

    theAvatar = currentUser.avatar; 
  }*/
  if (currentUser?.result.avatar) {
    theAvatar = currentUser?.result.avatar;
    console.log('theAvatar');
    
  } else {
  if (currentUser?.result.gender === "M") 
  {
    theAvatar = male;
  } else {
    theAvatar = female;
  }
  //  theAvatar = currentUser?.result.avatar;
  }
  //  console.log( "this" ,currentUser)
  //  console.log( "avatar" ,currentUser?.result.avatar)
  //  console.log( "male" ,male)
  //  console.log( "chris" ,chris)
  // if(currentUser?.gender==="M"){
  //   setModel(male);
  // }else{
  //   setModel(female);
  // }
  return (
    <>
                
      <div className="container" style={style}>

          
              <ShowMyAvatarThreeJS
                // man={man}
                model={theAvatar}
              />
                 
          </div>
          {!avatar && (
            <button className="site-btn" onClick={()=>{history.push('/createAvatar')}}>Create My Custom Avatar</button>
            )}
    </>
  );
}
