import { World } from './World.js';

function main() {
  // Get a reference to the container element
  const container = document.getElementById('container_1');

  // create a new world
  const world = new World(container);
  world.animate();
  // draw the scene
  world.render();
}
main();