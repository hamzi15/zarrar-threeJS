import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { setupModel } from './setupModel.js';

async function loadShips() {
    const loader = new GLTFLoader();
  
    const [passengerData, cruiseData, cargoData] = await Promise.all([
      loader.loadAsync('../Components/assets/passenger/scene.gltf'),
      loader.loadAsync('../Components/assets/cruise/scene.gltf'),
      loader.loadAsync('../Components/assets/cargo/scene.gltf'),
    ]);
  
    console.log('Squaaawk!', passengerData);
  
    const passenger = setupModel(passengerData);
    passenger.position.set(0, 0, 2.5);
    passenger.scale.set(0.15, 0.15, 0.15);
    passenger.fog = false;
    passenger.position.set(0, -450, 0);
  
    const cruise = setupModel(cruiseData);
    cruise.position.set(7.5, 0, -10);
    cruise.scale.set(0.015, 0.015, 0.015);
    cruise.fog = false;
    cruise.position.set(0, -450, 0);

    const cargo = setupModel(cargoData);
    cargo.position.set(0, -2.5, -10);
    cargo.scale.set(0.5, 0.5, 0.5);
    cargo.fog = false;
    cargo.position.set(0, -450, 0);

    return {
      passenger,
      cruise,
      cargo,
    };
  }
export { loadShips };
