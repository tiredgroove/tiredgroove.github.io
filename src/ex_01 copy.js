import * as THREE from 'three'
import { WEBGL } from './webgl'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

if (WEBGL.isWebGLAvailable()) {
//////
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
scene.fog = new THREE.Fog( 0xffffff, 2000, 3500 );

const camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 3500 );
camera.position.z = 250;

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild( renderer.domElement );

const ambientLight = new THREE.AmbientLight( 0x000000, 1);
scene.add( ambientLight );

const light1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
light1.position.set( 1, 1, 1 );
scene.add( light1 );

const light2 = new THREE.DirectionalLight( 0xffffff, 1.5 );
light2.position.set( 0, - 1, 0 );
scene.add( light2 );

const triangles = 100000;
///
const geometry = new THREE.BufferGeometry();

const positions = [];
const normals = [];
const colors = [];

const color = new THREE.Color();

const n = 800, n2 = n / 2;	// triangles spread in the cube
const d = 12, d2 = d / 2;	// individual triangle size

const pA = new THREE.Vector3();
const pB = new THREE.Vector3();
const pC = new THREE.Vector3();

const cb = new THREE.Vector3();
const ab = new THREE.Vector3();

for ( let i = 0; i < triangles; i ++ ) {

// positions

const x = Math.random() * n - n2;
const y = Math.random() * n - n2;
const z = Math.random() * n - n2;

const ax = x + Math.random() * d - d2;
const ay = y + Math.random() * d - d2;
const az = z + Math.random() * d - d2;

const bx = x + Math.random() * d - d2;
const by = y + Math.random() * d - d2;
const bz = z + Math.random() * d - d2;

const cx = x + Math.random() * d - d2;
const cy = y + Math.random() * d - d2;
const cz = z + Math.random() * d - d2;

positions.push( ax, ay, az );
positions.push( bx, by, bz );
positions.push( cx, cy, cz );

// flat face normals

pA.set( ax, ay, az );
pB.set( bx, by, bz );
pC.set( cx, cy, cz );

cb.subVectors( pC, pB );
ab.subVectors( pA, pB );
cb.cross( ab );

cb.normalize();

const nx = cb.x;
const ny = cb.y;
const nz = cb.z;

normals.push( nx * 32767, ny * 32767, nz * 32767 );
normals.push( nx * 32767, ny * 32767, nz * 32767 );
normals.push( nx * 32767, ny * 32767, nz * 32767 );

// colors

const vx = ( x / n ) + 0.5;
const vy = ( y / n ) + 0.5;
const vz = ( z / n ) + 0.5;

color.setRGB( vx, vy, vz );

colors.push( color.r * 255, color.g * 255, color.b * 255 );
colors.push( color.r * 255, color.g * 255, color.b * 255 );
colors.push( color.r * 255, color.g * 255, color.b * 255 );

}

const positionAttribute = new THREE.Float32BufferAttribute( positions, 3 );
const normalAttribute = new THREE.Int16BufferAttribute( normals, 3 );
const colorAttribute = new THREE.Uint8BufferAttribute( colors, 3 );

normalAttribute.normalized = true; // this will map the buffer values to 0.0f - +1.0f in the shader
colorAttribute.normalized = true;

geometry.setAttribute( 'position', positionAttribute );
geometry.setAttribute( 'normal', normalAttribute );
geometry.setAttribute( 'color', colorAttribute );

geometry.computeBoundingSphere();
////////
const material = new THREE.MeshPhongMaterial( {
  color: 0xaaaaaa, 
  specular: 0xffffff, 
  shininess: 250,
	side: THREE.DoubleSide, 
  vertexColors: true,
} );

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
////////

	function animate() {
  requestAnimationFrame( animate );
  
  // function render() {
  const time = Date.now() * 0.001;
  
  mesh.rotation.x = time * 0.025;
	mesh.rotation.y = time * 0.005;

	renderer.render( scene, camera );
  }

  animate();

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }
  window.addEventListener( 'resize', onWindowResize );

  //orbitcontrols
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 20;
  controls.maxDistance = 100;
  controls.minPolarAngle = 1;
  controls.maxPolarAngle = Math.PI / 1.5;
  controls.update();

} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
