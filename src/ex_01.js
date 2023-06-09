import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
//////
///scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
	
//camera
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z = 3;
    
//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild( renderer.domElement );

// geometry
const geometry = new THREE.InstancedBufferGeometry();
const vector = new THREE.Vector4();
const instances = 50000;
//rectanglar
const positions = [
	-0.015, -0.015, 0.0,
	0.015, -0.015, 0.0,
 	0.015,  0.015, 0.0,
	-0.015,  0.015, 0.0		
	];
const offsets = [];
const colors = [];
const colorsArray = [
	new THREE.Color(0xff146b), //rose
	new THREE.Color(0xffe010), //yellow
	new THREE.Color(0x65e9d3), //warm cyan
	new THREE.Color(0x2f56c0), //warm navy
	new THREE.Color(0xc9bfa2), //beige
	new THREE.Color(0x4d9659), //green
	new THREE.Color(0x9fe5ff), //sky bleu
	new THREE.Color(0xfcfacf), //cream
	new THREE.Color(0xffc2e2), //light rose
	new THREE.Color(0xbdbdbd), //light gray
	new THREE.Color(0xf266ab), //medium rose
	new THREE.Color(0x503919), //brown
];
const getRandomColor = () => colorsArray[Math.floor(Math.random() * colorsArray.length)];
//
const orientationsStart = [];
const orientationsEnd = [];

positions.push( 0.025, - 0.025, 0 );
positions.push( - 0.025, 0.025, 0 );
positions.push( 0, 0, 0.025 );

// instanced attributes

for ( let i = 0; i < instances; i ++ ) {
		// offsets
	offsets.push( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 );
		// colors
	// colors.push( Math.random(), Math.random(), Math.random(), Math.random() );
	colors.push(getRandomColor().r, getRandomColor().g, getRandomColor().b, 1);
		// orientation start
	vector.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
	vector.normalize();

	orientationsStart.push( vector.x, vector.y, vector.z, vector.w );

		// orientation end
	vector.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
	vector.normalize();

	orientationsEnd.push( vector.x, vector.y, vector.z, vector.w );
};

	// geometry.instanceCount = instances; // set so its initalized for dat.GUI, will be set in first draw otherwise
geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
geometry.setAttribute( 'offset', new THREE.InstancedBufferAttribute( new Float32Array( offsets ), 3 ) );
geometry.setAttribute( 'color', new THREE.InstancedBufferAttribute( new Float32Array( colors ), 4 ) );
geometry.setAttribute( 'orientationStart', new THREE.InstancedBufferAttribute( new Float32Array( orientationsStart ), 4 ) );
geometry.setAttribute( 'orientationEnd', new THREE.InstancedBufferAttribute( new Float32Array( orientationsEnd ), 4 ) );
geometry.setIndex([0, 1, 2, 0, 2, 3]); //rectanglar
	// material
    
const material = new THREE.RawShaderMaterial( {
	uniforms: {
		'time': { value: 1.0 },
		'sineTime': { value: 1.0 }
	},
	vertexShader: document.getElementById( 'vertexShader' ).textContent,
	fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
	side: THREE.DoubleSide,
	forceSinglePass: true,
	transparent: true,
});

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

function render() {
	const time = performance.now();
    const object = scene.children[ 0 ];
	
    object.rotation.y = time * 0.000025;
	object.rotation.x = time * 0.000025;
	object.rotation.z = time * 0.000025;
	
	object.material.uniforms[ 'time' ].value = time * 0.0005;
	object.material.uniforms[ 'sineTime' ].value = Math.sin( object.material.uniforms[ 'time' ].value * 0.05 );

    renderer.render( scene, camera );
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
};

/////add mousemove
let isMoving = false;
let moveTimeout;

function onPointerMove(event) {
    // Update the position of the mesh based on the mouse movement
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    const mouseX = (clientX / innerWidth) * 2 - 1;
    const mouseY = -(clientY / innerHeight) * 2 + 1;
    // Modify the mesh's position based on the mouse movement
	camera.position.x += ( - mouseX - camera.position.x ) * 0.05;
	camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

	camera.lookAt( scene.position );

	isMoving = true;

	// Clear any previous timeout
	clearTimeout(moveTimeout);
}

	window.addEventListener( 'resize', onWindowResize );
	window.addEventListener('mousemove', onPointerMove);

function animate() {
	requestAnimationFrame( animate );
			
	render();
}
	
animate();

} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
