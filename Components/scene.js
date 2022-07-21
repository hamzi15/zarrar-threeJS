import * as THREE from 'three';

export function createScene() {
	let water;
    let scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x3d3d3d );
    scene.fog = new THREE.FogExp2( 0x3d3d3d, 0.00041 );

    return scene;
}
