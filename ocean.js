import * as THREE from 'three';

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import {GLTFLoader}from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createRenderer } from './Components/Systems/renderer.js';
import { createScene } from './Components/scene.js'
import { createCamera } from './Components/camera.js'
import { createScreen } from './Components/screen.js';
import { createWater } from './Components/water.js';
import { createLights } from './Components/lights.js';
import { createCube } from './Components/cube.js';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js';

let container, stats;
let camera, scene, renderer;
let controls, water, sun, textMesh1,mesh,geometry,cube4,cube5,cube6,screen;


let material;
let mouse, center;
init();
animate();

function init() {

	container = document.getElementById( 'container_1' );
	renderer = createRenderer();
	container.appendChild( renderer.domElement );
	
	scene = createScene();
	camera = createCamera();
	water = createWater();
	
	
	let light = createLights();
	
		 
	
	scene.add( water , light );
	
	mouse = new THREE.Vector3( 0, 0, 1 );
	center = new THREE.Vector3();
	center.z = -1000;
	scene.background = new THREE.Color( 0x00000 );
    
	const loader = new FontLoader();
	loader.load('node_modules/three/examples/fonts/Headliner No. 45_Regular.json', function (font) {
        const geometry = new TextGeometry('ZARRAR', {
            font: font,
            size: 90,
            height: 3,
            curveSegments: 10,
            bevelEnabled: true,
            bevelOffset: -.2,
            bevelSegments: 2,
            bevelSize: .2,
            bevelThickness: 8
        });
        const materials = [
            new THREE.MeshBasicMaterial({ color:"#5e0000" }), // front
            new THREE.MeshBasicMaterial({ color: '#fc1c3d' }) // side
        ];
         textMesh1 = new THREE.Mesh(geometry, materials);
        textMesh1.castShadow = true
        
        textMesh1.position.x -= 120
		
        scene.add(textMesh1)
		
    })
	
	
	
    
	

	window.addEventListener( 'resize', onWindowResize );
	document.addEventListener( 'mousemove', onDocumentMouseMove );
	document.addEventListener( 'click', playScreen );

}
function playScreen(){
	screen = createScreen();
	scene.add( screen );
	scene.fog = new THREE.FogExp2( 0x5e0000, 0.001 );
	scene.background = new THREE.Color( 0x5e0000 );
	video.play();
	scene.remove(textMesh1);
    textMesh1.geometry.dispose();
    
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}
function onDocumentMouseMove( event ) {

	mouse.x = ( event.clientX - window.innerWidth/2  );
	mouse.y = ( event.clientY - window.innerHeight/2  );
	
	
}


function animate() {
	requestAnimationFrame( animate );
	render();

}

function render() {

	const time = performance.now() *8000;

	camera.position.x = ( mouse.x-camera.position.x )*.08;
	camera.position.y = ( - mouse.y -camera.position.y )*.08;
	
	camera.lookAt( center );
	
	
	water.material.uniforms[ 'time' ].value += 1.0 / 60.0;

	renderer.render( scene, camera );

}