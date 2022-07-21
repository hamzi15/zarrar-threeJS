import * as THREE from 'three';

export function createScreen() {
    const texture = new THREE.VideoTexture( video );
	texture.minFilter = THREE.NearestFilter;

	const width = 160, height = 90;


	const geometry = new THREE.BoxBufferGeometry( width, height, 1 );
	const material = new THREE.MeshBasicMaterial( { map: texture } );
	const mesh = new THREE.Mesh( geometry, material );
	mesh.position.set(0, 0, 370)
    return mesh;
}
