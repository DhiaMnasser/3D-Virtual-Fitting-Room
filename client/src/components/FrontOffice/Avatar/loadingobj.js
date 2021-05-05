import * as THREE from "three";
import React, { Component } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
//import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
//import {MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { MTLLoader} from "three-obj-mtl-loader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import man from "./models/pifuhd_final/recon/result_.obj";
//import shirt from "./models/3d-model.obj";
import { Button } from "@material-ui/core";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import shirt from "./models/pull.obj";
import pants from "./models/pantss.obj";
import male from "./models/male1.obj";
import { green } from "@material-ui/core/colors";
import materl from "./models/shir.mtl"
class loaderr extends Component {
   
    componentDidMount() {
        var scene = new THREE.Scene();
        scene.background = new THREE.Color("#E0E0E0");
        const canvas = document.querySelector("canvas.webgl");
        const renderer = new THREE.WebGLRenderer({
          canvas: canvas
        });
        
        renderer.setSize(400, 400);
        // document.body.appendChild( renderer.domElement );
        // use ref as a mount point of the Three.js scene instead of the document.body
    
        //Scene
      
       const objLoader = new OBJLoader();
         objLoader.load(man, root => {
           root.position.y = -1;
          console.log(root);
          
          root.scale.set(10,10,10);
         const material = new THREE.MeshStandardMaterial({
           color: 0xffdbac,
           emissive: 0x0,
            roughness: 1,
             metalness: 0.2
        
         });
    
           root.children.forEach(c => {
           c.children.forEach(child => {
              child.material = material;
          });
         });
         
         
    
          scene.add(root);
          
         });
        
        /* const gltfLoader = new GLTFLoader();
    gltfLoader.load(male, gltf => {
      gltf.scene.position.y = -10;
      const material = new THREE.MeshStandardMaterial({
        color: 0xffdbac,
        emissive: 0x0,
        roughness: 1,
        metalness: 0.2
      });

      gltf.scene.children.forEach(c => {
        c.children.forEach(child => {
          child.material = material;
        });
      });
      // gltf.scene.children[1].children[1].material = material;
      console.log(gltf);
      scene.add(gltf.scene);
    });*/
    const objLoaderr = new OBJLoader();
    var mtlLoader = new MTLLoader();
    mtlLoader.setBaseUrl("./models/");
    mtlLoader.load("shir.mtl", materials => {
    materials.preload();
    console.log("Material loaded");
    objLoaderr.setMaterials(materials);

         objLoaderr.load(shirt, rot => {
           rot.position.y = -11;
           
           
          console.log(rot);
          
          rot.scale.set(10,10,10);
          
         const materiall = new THREE.MeshStandardMaterial({
          color: 0xC10505,
          emissive: 0,
          roughness: 2,
          metalness: 1
        
         });
    
           rot.children.forEach(c => {
           c.children.forEach(child => {
              child.material = materiall;
          });
         });
         scene.add(rot);
          
         });
        });

       /* const objLoaderrr = new OBJLoader();
  

         objLoaderrr.load(pants, rot => {
           rot.position.y = -11;
           
           
          console.log(rot);
          
          rot.scale.set(10,10,10);
          
         const materiall = new THREE.MeshStandardMaterial({
          color: 0xC10505,
          emissive: 0,
          roughness: 2,
          metalness: 1
        
         });
    
           rot.children.forEach(c => {
           c.children.forEach(child => {
              child.material = materiall;
          });
         });
         scene.add(rot);
          
         });*/
       
        /*const objLoaderr = new OBJLoader();
        objLoaderr.load(shirt, gltf => {
          gltf.scene.position.y = -10;
          const materiall = new THREE.MeshStandardMaterial({
            color: 0xe0ac69,
            roughness: 0,
            metalness: 0
          });
  
          gltf.scene.children[1].children[0].material = materiall;
          console.log(gltf);
          scene.add(gltf);
        })
        /**
         * Floor
         */
       /* const floor = new THREE.Mesh(
          new THREE.PlaneBufferGeometry(10, 10),
          new THREE.MeshStandardMaterial({
             color: 0x0000ff ,
            metalness: 0,
            roughness: 0.5
          })*/
          
          var geometry = new THREE.PlaneGeometry( 13, 13);
	var material = new THREE.MeshBasicMaterial( { color: 0x99FF99 } );
          const floor = new THREE.Mesh( geometry, material );
	floor.material.side = THREE.DoubleSide;
	floor.rotation.x = 90;
    floor.color= 0x0000ff ;

        
        floor.receiveShadow = true;
        floor.rotation.x = -Math.PI * 0.5;
        floor.position.y = -10;
        scene.add(floor);
    
        /**
         * Lights
         */
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);
    
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.set(1024, 1024);
        directionalLight.shadow.camera.far = 15;
        directionalLight.shadow.camera.left = -7;
        directionalLight.shadow.camera.top = 7;
        directionalLight.shadow.camera.right = 7;
        directionalLight.shadow.camera.bottom = -7;
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
    
        /**
         * Sizes
         */
        const sizes = {
          width: 350,
          height: 350
        };
    
        window.addEventListener("resize", () => {
          // Update sizes
          sizes.width = 350;
          sizes.height = 350;
    
          // Update camera
          camera.aspect = sizes.width / sizes.height;
          camera.updateProjectionMatrix();
    
          // Update renderer
          renderer.setSize(sizes.width, sizes.height);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });
    
        /**
         * Camera
         */
        // Base camera
        const camera = new THREE.PerspectiveCamera(
          75,
          sizes.width / sizes.height,
          0.1,
          100
        );
        camera.position.set(0, 10, 20);
        scene.add(camera);
    
        // Controls
        const controls = new OrbitControls(camera, canvas);
        controls.target.set(0, 0.75, 0);
        controls.enableDamping = true;
    
        /**
         * Renderer
         */
    
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
        /**
         * Animate
         */
        const clock = new THREE.Clock();
        let previousTime = 0;
    
        const tick = () => {
          const elapsedTime = clock.getElapsedTime();
          const deltaTime = elapsedTime - previousTime;
          previousTime = elapsedTime;
    
          // Update controls
          controls.update();
    
          // Render
          renderer.render(scene, camera);
    
          // Call tick again on the next frame
          window.requestAnimationFrame(tick);
        };
    
        tick();
      }
      render() {
        return <canvas className="webgl"></canvas>;
        
    

       
      }

      
      

    }

export default loaderr ;