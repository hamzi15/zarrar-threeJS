import * as THREE from 'three';

import Stats from 'three/examples/jsm/libs/stats.module.js';

import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

import { createRenderer } from './Components/Systems/renderer.js'
import { createScene } from './Components/scene.js'
import { createCamera } from './Components/camera.js'
import { createScreen } from './Components/screen.js';
import { createWater } from './Components/water.js';
import { createLights } from './Components/lights.js';
import { createCube } from './Components/cube.js';


let container, stats;
let camera, scene, renderer;
let controls, water, sun, mesh,geometry;


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
	
	let screen = createScreen();
	let light = createLights();
	

	let cube = createCube();
	var texture = new THREE.TextureLoader().load( 'icons8-instagram.svg' );
	cube.material.map= texture
	let cube2= createCube();
	cube2.position.y += 100;
	var texture = new THREE.TextureLoader().load( 'icons8-instagram.svg' );
	cube2.material.map= texture
	let cube3= createCube();
	cube3.position.y += 200;
	var texture = new THREE.TextureLoader().load( 'icons8-instagram.svg' );
	cube3.material.map= texture
	let cube4= createCube();
	cube4.position.x=400;
	var texture = new THREE.TextureLoader().load( 'email-svgrepo-com.svg' );
	cube4.material.map= texture
	let cube5= createCube();
	cube5.position.x=400;
	cube5.position.y+=100;
	var texture = new THREE.TextureLoader().load( 'icons8-facebook.svg' );
	cube5.material.map= texture
	let cube6= createCube();
	cube6.position.x=400;
	cube6.position.y += 200;
	var texture = new THREE.TextureLoader().load( 'icons8-instagram.svg' );
	cube6.material.map= texture
	scene.add( water , light ,cube,cube2,cube3,cube4,cube5,cube6);
	scene.add( screen );
	mouse = new THREE.Vector3( 0, 0, 1 );
	center = new THREE.Vector3();
	center.z = -1000;
	scene.background = new THREE.Color( 0x5e0000 );
    scene.fog = new THREE.FogExp2( 0x5e0000, 0.0004 );

	video.play();
    
	

	window.addEventListener( 'resize', onWindowResize );
	document.addEventListener( 'mousemove', onDocumentMouseMove );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}
function onDocumentMouseMove( event ) {

	mouse.x = ( event.clientX - window.innerWidth / 2 );
	mouse.y = ( event.clientY - window.innerHeight / 2 );
	
}


function animate() {
	requestAnimationFrame( animate );
	render();

}

function render() {

	const time = performance.now() * 0.001;

	camera.position.x += ( mouse.x - camera.position.x ) * 0.005;
	camera.position.y += ( - mouse.y - camera.position.y ) * 0.005;
	camera.lookAt( center );

	water.material.uniforms[ 'time' ].value += 1.0 / 60.0;

	renderer.render( scene, camera );

}