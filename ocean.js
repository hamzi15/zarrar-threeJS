
			import * as THREE from 'three';

			import Stats from 'three/examples/jsm/libs/stats.module.js';

			import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
			import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
			import { Water } from 'three/examples/jsm/objects/Water.js';
			import { Sky } from 'three/examples/jsm/objects/Sky.js';

			let container, stats;
			let camera, scene, renderer;
			let controls, water, sun, mesh,geometry;

		
			let material;
			let mouse, center;
			init();
			animate();

			function init() {

				container = document.getElementById( 'container_1' );

				//

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				container.appendChild( renderer.domElement );
				


				mouse = new THREE.Vector3( 0, 0, 1 );

				//

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.set( 0, 0, 500 );

				//

				sun = new THREE.Vector3();

				// Water

				const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

				water = new Water(
					waterGeometry,
					{
						textureWidth: 1080,
						textureHeight: 1080,
						waterNormals: new THREE.TextureLoader().load( './img/water.jpg', function ( texture ) {

							texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

						} ),
						sunDirection: new THREE.Vector3(),
						sunColor: 0xffffff,
						waterColor: 0x001e0f,
						distortionScale: 3.7,
						fog: scene.fog !== undefined
					}
				);
				

				water.rotation.x = - Math.PI / 2;
				water.position.set(0,-370,-0)
				scene.add( water );

				// Skybox

				const sky = new Sky();
				sky.scale.setScalar( 10000 );
				scene.add( sky );

				const skyUniforms = sky.material.uniforms;

				skyUniforms[ 'turbidity' ].value = 10;
				skyUniforms[ 'rayleigh' ].value = 2;
				skyUniforms[ 'mieCoefficient' ].value = 0.005;
				skyUniforms[ 'mieDirectionalG' ].value = 0.8;
			const parameters = {
					elevation:0,
					azimuth: 100
				};

	/*			const pmremGenerator = new THREE.PMREMGenerator( renderer );

				function updateSun() {

					const phi = THREE.MathUtils.degToRad( 90 - parameters.elevation );
					const theta = THREE.MathUtils.degToRad( parameters.azimuth );

					sun.setFromSphericalCoords( 1, phi, theta );

					sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
					water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

					scene.environment = pmremGenerator.fromScene( sky ).texture;

				}

				updateSun();
*/
				//

				
				
				center = new THREE.Vector3();
				center.z = - 1000;

				const video = document.getElementById( 'video' );

				const texture = new THREE.VideoTexture( video );
				texture.minFilter = THREE.NearestFilter;

				const width = 640, height = 480;
				const nearClipping = 850, farClipping = 3000;

				geometry = new THREE.BufferGeometry();

				const vertices = new Float32Array( width * height * 3 );

				for ( let i = 0, j = 0, l = vertices.length; i < l; i += 3, j ++ ) {

					vertices[ i ] = j % width;
					vertices[ i + 1 ] = Math.floor( j / width );

				}

				geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

				material = new THREE.ShaderMaterial( {

					uniforms: {

						'map': { value: texture },
						'width': { value: width },
						'height': { value: height },
						'nearClipping': {value:850 },
						'farClipping': { value: 3000 },

						'pointSize': { value: 2 },
						'zOffset': { value: 1000 }

					},
					vertexShader: document.getElementById( 'vs' ).textContent,
					fragmentShader: document.getElementById( 'fs' ).textContent,
					blending: THREE.AdditiveBlending,
					depthTest: false, depthWrite: false,
					transparent: true

				} );

				mesh = new THREE.Points( geometry, material );
				mesh.position.copy( center );
				mesh
				scene.add( mesh );
				

				video.play();

				//

				
/*				

				controls = new OrbitControls( camera, renderer.domElement );
				controls.maxPolarAngle = Math.PI * 0.495;
				controls.target.set( 0, 10, 0 );
				controls.minDistance = 40.0;
				controls.maxDistance = 200.0;
				controls.update();

				//

				

				// GUI

				const gui = new GUI();

				const folderSky = gui.addFolder( 'Sky' );
				folderSky.add( parameters, 'elevation', 0, 90, 0.1 ).onChange( updateSun );
				folderSky.add( parameters, 'azimuth', - 180, 180, 0.1 ).onChange( updateSun );
				folderSky.open();

				const waterUniforms = water.material.uniforms;

				const folderWater = gui.addFolder( 'Water' );
				folderWater.add( waterUniforms.distortionScale, 'value', 0, 8, 0.1 ).name( 'distortionScale' );
				folderWater.add( waterUniforms.size, 'value', 0.1, 10, 0.1 ).name( 'size' );
				folderWater.open();
*/
				//

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

				camera.position.x += ( mouse.x - camera.position.x ) * 0.05;
				camera.position.y += ( - mouse.y - camera.position.y ) * 0.05;
				camera.lookAt( center );

				water.material.uniforms[ 'time' ].value += 1.0 / 60.0;

				renderer.render( scene, camera );

			}