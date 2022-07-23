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

    const passenger = setupModel(passengerData);
    passenger.scale.set(0.15, 0.15, 0.15);
    passenger.fog = false;
    passenger.position.set(600, -440, -500);
    passenger.rotation.z = Math.PI / 2;
    passenger.name = 'passenger';
  
    const cruise = setupModel(cruiseData);
    cruise.scale.set(0.025, 0.025, 0.025);
    cruise.fog = false;
    cruise.position.set(-100, -450, -800);
    cruise.rotation.z = Math.PI / 2;
    cruise.name = 'cruise';


    const cargo = setupModel(cargoData);
    cargo.scale.set(0.5, 0.5, 0.5);
    cargo.fog = false;
    cargo.position.set(0, -450,-1000);

    return {
      passenger,
      cruise,
      cargo,
    };
  }
export { loadShips };
