import React, { Suspense, useReducer, useState } from "react";
import Three from "./Three";
// import female from "./models/standard-female-figure.gltf";
import female from "./models/standard-female-figure.gltf";
import male from "./models/male.gltf";
// import man from "./models/man.obj";
import robe from "./models/robe.gltf";
import shirt from "./models/shirt.gltf";
// import pants from "./models/pants.gltf";
import vest from "./models/vest.gltf";
export default function Avatar(props) {
  const [model, setModel] = useState(true);
  const [update, setUpdate] = useState(true);

  const [roba, setRoba] = useState(false);
  const [vesta, setVesta] = useState(false);
  const [shirta, setShirta] = useState(false);
  const [pantsa, setPantsa] = useState(true);
  const combination = [undefined, robe];
  const combination1 = [undefined, shirt];
  const combination2 = [undefined, props.man];
  // const combination2 = [undefined, pants];
  const combination3 = [undefined, vest];

  console.log("props.man:");
  console.log(props.man);
  // console.log("pant:");

  
  return (
    <>
      <div className="container">
        {update || (
          <div>
            {model && (
              <Three
                man={props.man}
                model={male}
                pants={combination2[Number(pantsa)]}
                shirt={combination1[Number(shirta)]}
                vest={combination3[Number(vesta)]}
              />
            )}
            {model || <Three model={female} robe={combination[Number(roba)]} />}
          </div>
        )}
        {update && (
          <div>
            {model && (
              <Three
              man={props.man}

                model={male}
                pants={combination2[Number(pantsa)]}
                shirt={combination1[Number(shirta)]}
                vest={combination3[Number(vesta)]}
              />
            )}
            {model || <Three model={female} robe={combination[Number(roba)]} />}
          </div>
        )}

        {/* <div className="control">
          <button
            onClick={() => {
              setModel(!model);
            }}
          >
            male/female
          </button>
          <button
            onClick={() => {
              setUpdate(!update);
              setRoba(!roba);
            }}
          >
            {" "}
            robe
          </button>
          <button
            onClick={() => {
              setUpdate(!update);
              setVesta(!vesta);
            }}
          >
            {" "}
            vest
          </button>
          <button
            onClick={() => {
              setUpdate(!update);
              setShirta(!shirta);
            }}
          >
            {" "}
            shirt
          </button> */}
          <button
            onClick={() => {
              setUpdate(!update);
              setPantsa(!pantsa);
            }}
          >
            {" "}
            try on Avatar
          </button>
        {/* </div> */}
      </div>
    </>
  );
}