import * as THREE from 'three';

import Stats from 'three/examples/jsm/libs/stats.module.js';

import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';

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

	scene.add( water , light, cube );
	scene.add( screen );

	mouse = new THREE.Vector3( 0, 0, 1 );
	center = new THREE.Vector3();
	center.z = -1000;

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