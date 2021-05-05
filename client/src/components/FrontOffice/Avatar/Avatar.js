import { json } from "body-parser";
import { current } from "immer";
import React, { Suspense, useReducer, useState } from "react";
import AvatarThreeJS from "./AvatarThreeJS";
// import female from "./models/standard-female-figure.gltf";
import female from "./models/female1.obj";
// import male from "./models/man.obj";
import male from "./models/male1.obj";
import man from "./models/manopen.obj";
import chris from "./models/chris.obj";
// import pants from "./models/pants.gltf";

export default function Avatar(props) {
  const [model, setModel] = useState(true);
  const [update, setUpdate] = useState(true);

  const [clothModel, setPantsa] = useState(true);
  const combination2 = [undefined, props.clothModel];

  console.log("props.clothModel:");
  
  const currentUser =JSON.parse(localStorage.getItem('profile')).result ;
  let theAvatar = male;
  
  /*if(currentUser?.avatar){

    theAvatar = currentUser.avatar; 
  }*/
  if ( currentUser?.name === "clientclient client") 
  {theAvatar = chris;

}
  return (
    <>
      <div className="container">
        {update || (
          <div>
            {model && (
              <AvatarThreeJS
                man={man}
                model={theAvatar}
                productModel={combination2[Number(clothModel)]}
              />
            )}
            {model || (
              <AvatarThreeJS
                model={female}
                productModel={combination2[Number(clothModel)]}
              />
            )}
          </div>
        )}
        {update && (
          <div>
            {model && (
              <AvatarThreeJS
                man={man}
                model={male}
                productModel={combination2[Number(clothModel)]}
              />
            )}
            {model || (
              <AvatarThreeJS
                model={female}
                productModel={combination2[Number(clothModel)]}
              />
            )}
          </div>
        )}

        <button
          onClick={() => {
            setUpdate(!update);
            setPantsa(!clothModel);
          }}
        >
          {" "}
          try on Avatar
        </button>
      </div>
    </>
  );
}
