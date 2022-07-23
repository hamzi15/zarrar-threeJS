import * as THREE from 'three';

export function createScene() {
	let water;
    let scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x5e0000 );
    scene.fog = new THREE.FogExp2( 0x5e0000, 0.00051 );

    return scene;
}
