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
  const currentUser = JSON.parse(localStorage.getItem("profile"));
  let theAvatar;
  const [model, setModel] = useState(male);
  const [update, setUpdate] = useState(true);
  const [clothModel, setPantsa] = useState(true);
  const combination2 = [undefined, props.clothModel];

  console.log("props.clothModel:", props.clothModel);

  if (currentUser?.result.avatar) {
    theAvatar = currentUser?.result.avatar;
  } else {
    if (currentUser?.result.gender === "M") 
    {
      theAvatar = male;
    } else {
      theAvatar = female;
    }
  }

  return (
    <>
      <div className="container">
        {update || (
          <div>
            {clothModel && (
              <AvatarThreeJS
                // man={man}
                model={theAvatar}
                productModel={combination2[Number(clothModel)]}
              />
            )}
            {clothModel || (
              <AvatarThreeJS
                model={theAvatar}
                productModel={combination2[Number(clothModel)]}
              />
            )}
          </div>
        )}
        {update && (
          <div>
            {clothModel && (
              <AvatarThreeJS
                // man={man}
                model={theAvatar}
                productModel={combination2[Number(clothModel)]}
              />
            )}
            {clothModel || (
              <AvatarThreeJS
                model={theAvatar}
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
