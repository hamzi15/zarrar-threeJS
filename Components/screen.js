import * as THREE from 'three';
import MouseMeshInteraction from '../node_modules/@danielblagy/three-mmi';
import { createRenderer } from './Systems/renderer.js'

export function createScreen(scene, camera) {
    const texture = new THREE.VideoTexture( video );
	texture.minFilter = THREE.NearestFilter;

	const width = 1920, height = 1080;


	const geometry = new THREE.BoxBufferGeometry( width, height, 1 );
	const material = new THREE.MeshBasicMaterial( { map: texture } );
	const mesh = new THREE.Mesh( geometry, material );
	mesh.position.set(0,200,-1500)

    const geometry1 = new THREE.BoxBufferGeometry( 500, 100, 1);
    const material1 = new THREE.MeshBasicMaterial({ color: 'black', opacity: 0.5, transparent: true });
    const mesh1 = new THREE.Mesh( geometry1, material1 );

    mesh.name = 'fire';
    mesh1.position.set(0, -600, 10);
    // mesh.add(mesh1);

    console.log(mesh.name);
    const mmi = new MouseMeshInteraction(scene, camera);
    mmi.addHandler('fire', 'click', function(){
        console.log('Works!');
    });
    // createRenderer(mmi);
    mmi.update();
    return { mesh, mmi};
}