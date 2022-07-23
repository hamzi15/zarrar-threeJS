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
import { loadShips } from './Components/ships.js';
import MouseMeshInteraction from './node_modules/@danielblagy/three-mmi';

let container, stats;
let camera, scene, renderer;
let controls, water, sun, mesh,geometry;

let material;
let mouse, center;
let lightTrial;
let boats;
// let mmi;
await init();

async function init() {

	container = document.getElementById( 'container_1' );
	renderer = createRenderer();
	container.appendChild( renderer.domElement );
	
	scene = createScene();
	camera = createCamera();
	water = createWater();
	let screen = createScreen();
	let light = createLights();
	let cube = createCube();

	// lightTrial = new THREE.PointLight('white', 1.7);
	// lightTrial.position.set(0, 0, 10000);

	// scene.add(lightTrial);

	boats = await loadShips();
	scene.add(boats.passenger, boats.cruise);

	scene.add( water , light );
	scene.add( screen );
	console.log(boats.passenger)
	// const mmi = new MouseMeshInteraction(scene, camera);
    // mmi.addHandler('fire1', 'click', function(){
    //     console.log('Works!');
    // });

	mouse = new THREE.Vector3( 0, 0, 1 );
	center = new THREE.Vector3();
	center.z = -1000;

	video.play();

	window.addEventListener( 'resize', onWindowResize );
	document.addEventListener( 'mousemove', onDocumentMouseMove );
	document.addEventListener( 'keydown', onDocumentKeyPress );
	document.addEventListener( 'keyup', onDocumentKeyPress );
	document.addEventListener( 'keyleft', onDocumentKeyPress );
	document.addEventListener( 'keyright', onDocumentKeyPress );



	animate()
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

function onDocumentKeyPress( event ) {
	if (event.keyCode == 38) {
		moveBoat(boats.passenger, 2);
	}
	else if (event.keyCode == 40) {
		moveBoat(boats.passenger, -2);
	}
	else if (event.keyCode == 37) {
		moveBoat(boats.passenger, 0.114, true);
	}
	else if (event.keyCode == 39) {
		moveBoat(boats.passenger, -0.114, true);
	}
}

function animate() {
	requestAnimationFrame( animate );
	// mmi.update();
	render();

}

function moveBoat(boat, i, r = false) {
	if (boat.position.x < 2300) {
		boat.position.x += i;
	}
	if (r) {
		boat.rotation.z += i;
	}
	// else if (boat.name == 'cruise' && boat.position.x > -2300) {
	// 	boat.position.x -= 1;
	// }
}

function render() {

	const time = performance.now() * 0.001;

	camera.position.x += ( mouse.x - camera.position.x ) * 0.005;
	camera.position.y += ( - mouse.y - camera.position.y ) * 0.005;
	camera.lookAt( center );

	water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
	// moveBoat(boats.passenger);
	// moveBoat(boats.cruise);
	renderer.render( scene, camera );
}