import {
    BoxBufferGeometry,
    MathUtils,
    Mesh,
    MeshStandardMaterial,
    MeshBasicMaterial,
    TextureLoader,
  } from 'three';
  
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
function createCube() {
    const geometry = new BoxBufferGeometry(100, 50, 1);
    const material = new MeshBasicMaterial({ color: 0xfffffff, opacity: 0.1, transparent: true });
    const cube = new Mesh(geometry, material);
    cube.position.set(0, -100, -100);
    const text = createText();
    // cube.rotation.set(-0.5, -0.1, 0.8);

    // cube.add(text)
    return cube;
}

export { createCube };

function createText(){
    const loader = new FontLoader();

    loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

        const geometry = new TextGeometry( 'Hello three.js!', {
            font: font,
            size: 80,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        } );
    } );

    return loader
}