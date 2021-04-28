import React, { Suspense, useReducer, useState } from "react";
import Three from "./Three";
// import female from "./models/standard-female-figure.gltf";
import female from "./models/standard-female-figure.gltf";
// import male from "./models/man.obj";
import male from "./models/male.gltf";
import man from "./models/manopen.obj";

// import pants from "./models/pants.gltf";

export default function Avatar(props) {
  const [model, setModel] = useState(true);
  const [update, setUpdate] = useState(true);

  const [clothModel, setPantsa] = useState(true);
  const combination2 = [undefined, props.clothModel];

  console.log("props.clothModel:");

  return (
    <>
      <div className="container">
        {update || (
          <div>
            {model && (
              <Three
                man={man}
                model={male}
                productModel={combination2[Number(clothModel)]}
              />
            )}
            {model || (
              <Three
                model={female}
                productModel={combination2[Number(clothModel)]}
              />
            )}
          </div>
        )}
        {update && (
          <div>
            {model && (
              <Three
                man={man}
                model={male}
                productModel={combination2[Number(clothModel)]}
              />
            )}
            {model || (
              <Three
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
