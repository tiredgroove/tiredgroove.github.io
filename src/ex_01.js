import * as THREE from 'three'
import { WEBGL } from './webgl'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

if (WEBGL.isWebGLAvailable()) {

  //scene
  const scene = new THREE.Scene();
  // scene.background = textureCube;
  scene.background = new THREE.Color(0xffffff);
  // scene fog
  scene.fog = new THREE.FogExp2(0xffffff, 0.0025);


  //camera
  const camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 60;
  camera.position.x = 30;
  camera.position.y = 30;

  //renderer
	const renderer = new THREE.WebGLRenderer({ antialias: true });
	// renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setSize( window.innerWidth, window.innerHeight );
	//import
  renderer.outputEncoding = THREE.sRGBEncoding;
  document.body.appendChild( renderer.domElement );

  //orbitcontrols
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 20;
  controls.maxDistance = 100;
  controls.minPolarAngle = 1;
  controls.maxPolarAngle = Math.PI / 1.5;
  controls.update();
  
  //skybox
  const skyMatArray = []
  const skyTexture_px = new THREE.TextureLoader().load('3dimg/skyboxex/px.png');
  const skyTexture_nx = new THREE.TextureLoader().load('3dimg/skyboxex/nx.png');
  const skyTexture_py = new THREE.TextureLoader().load('3dimg/skyboxex/py.png');
  const skyTexture_ny = new THREE.TextureLoader().load('3dimg/skyboxex/ny.png');
  const skyTexture_pz = new THREE.TextureLoader().load('3dimg/skyboxex/pz.png');
  const skyTexture_nz = new THREE.TextureLoader().load('3dimg/skyboxex/nz.png');
  skyMatArray.push(
    new THREE.MeshStandardMaterial({
      map: skyTexture_px,
    })
  )
  skyMatArray.push(
    new THREE.MeshStandardMaterial({
      map: skyTexture_nx,
    })
  )
  skyMatArray.push(
    new THREE.MeshStandardMaterial({
      map: skyTexture_py,
    })
  )
  skyMatArray.push(
    new THREE.MeshStandardMaterial({
      map: skyTexture_ny,
    })
  )
  skyMatArray.push(
    new THREE.MeshStandardMaterial({
      map: skyTexture_pz,
    })
  )
  skyMatArray.push(
    new THREE.MeshStandardMaterial({
      map: skyTexture_nz,
    })
  )

  for (let i = 0; i < 6; i++){
    skyMatArray[i].side = THREE.BackSide
  }

  const skyGeo = new THREE.BoxGeometry(500,500,500);
  const sky = new THREE.Mesh(skyGeo, skyMatArray);
  scene.add(sky);



  //import light
  const lightsky = new THREE.PointLight(0xffffff, 1, 0);
  lightsky.position.set(0, 0, 0);
  scene.add(lightsky);

  const ambientLight = new THREE.AmbientLight( 0x000000, 5);
	scene.add( ambientLight );

/////////////////////////////////////////////
  //GLTF
  const loader = new GLTFLoader();
  loader.load('3dimg/feuilles.gltf',
  function( gltf ){
  gltf.scene.scale.set(2, 2, 2);
  gltf.scene.position.set(-5, -40, -10);
  const mesh = gltf.scene.children[0];
  const material = new THREE.MeshPhongMaterial({
    color: 0xcc7a85,
    refractionRatio: 0.985,
    reflectivity: 0.5,
    emissive: 0xcc7a85,
    clearcoat: 0.3,
    roughness: 0.5,
    metalness: 0.5,
    transparent: true,
    opacity: 0.7,
  });
  mesh.material = material;
  scene.add( gltf.scene );

  function animate(){
  requestAnimationFrame(animate)
  //GLTF회전
  gltf.scene.rotation.y += 0.001;
  renderer.render(scene,camera);  
  }
  animate();
  });

  //GLTF01
  const loader01 = new GLTFLoader();
  loader01.load('3dimg/feuilles.gltf',
  function( gltf01 ){
  gltf01.scene.scale.set(2, 2, 2);
  gltf01.scene.position.set(5, -30, -20);
  const mesh01 = gltf01.scene.children[0];
  const material01 = new THREE.MeshPhongMaterial({
    color: 0xe73773,
    refractionRatio: 0.985,
    reflectivity: 0.5,
    emissive: 0xe73773,
    clearcoat: 0.3,
    roughness: 0.5,
    metalness: 0.5,
    transparent: true,
    opacity: 0.7,
  });
  mesh01.material = material01;
  scene.add( gltf01.scene );

  function animate(){
  requestAnimationFrame(animate)
  //GLTF회전
  gltf01.scene.rotation.y += 0.001;
  renderer.render(scene,camera);  
  }
  animate();
  });

  //GLTF02
  const loader02 = new GLTFLoader();
  loader02.load('3dimg/feuilles.gltf',
  function( gltf02 ){
  gltf02.scene.scale.set(2, 2, 2);
  gltf02.scene.position.set(10, -20, 0);
  const mesh02 = gltf02.scene.children[0];
  const material02 = new THREE.MeshPhongMaterial({
    color: 0x5aacbe,
    refractionRatio: 0.985,
    reflectivity: 0.5,
    emissive: 0x5aacbe,
    clearcoat: 0.3,
    roughness: 0.5,
    metalness: 0.5,
    transparent: true,
    opacity: 0.7,    
  });
  mesh02.material = material02;
  scene.add( gltf02.scene );

  function animate(){
  requestAnimationFrame(animate)
  //GLTF회전
  gltf02.scene.rotation.y -= 0.001;
  renderer.render(scene,camera);  
  }
  animate();
  });

  //GLTF03
  const loader03 = new GLTFLoader();
  loader03.load('3dimg/feuilles.gltf',
  function( gltf03 ){
  gltf03.scene.scale.set(2.2, 2.2, 2.2);
  gltf03.scene.position.set(-15, -25, 5);
  const mesh03 = gltf03.scene.children[0];
  const material03 = new THREE.MeshPhongMaterial({
    color: 0x576c52,
    refractionRatio: 0.985,
    reflectivity: 0.5,
    emissive: 0x576c52,
    clearcoat: 0.3,
    roughness: 0.5,
    metalness: 0.5,
    transparent: true,
    opacity: 0.7,    
  });
  mesh03.material = material03;
  scene.add( gltf03.scene );

  function animate(){
  requestAnimationFrame(animate)
  //GLTF회전
  gltf03.scene.rotation.y -= 0.001;
  renderer.render(scene,camera);  
  }
  animate();
  });
///////////////////////////////////////
  //animation
	function animate() {
	requestAnimationFrame( animate );

  controls.update();

  renderer.render( scene, camera );
	}

	animate();

  //반응형
  function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onWindowResize);


} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
