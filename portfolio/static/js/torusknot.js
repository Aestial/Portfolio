function init() {
    // DOM ELEMENTS
    var container = document.createElement('div');
    var domElements = document.getElementsByClassName('canvas-container');
    var domParent = domElements[0];
    domParent.appendChild(container);
    // RENDERER
    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(160, 160);
    renderer.setClearColor(0x000000, 0);
    // APPEND RENDERER TO DOM ELEMENT
    container.appendChild(renderer.domElement);
    // SCENE
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    var geometry = new THREE.TorusKnotGeometry( 1, 0.3, 100, 16 );
    var material = new THREE.MeshNormalMaterial();
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    // CAMERA POSITION
    camera.position.z = 4.85;
}

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

init();
animate();