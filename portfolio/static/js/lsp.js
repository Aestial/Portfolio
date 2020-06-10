// CONSTANTS
var CANVAS_WIDTH = 280, CANVAS_HEIGHT = 280;

var container, renderer, scene, camera, mesh, fov = 45;
var mouseX = 0;
var mouseY = 0;
var mouseUse = 0;
var exceded = false;
//Invert X
var camDistX = -2.0, camDistY = 0.7;
var noiseScale = 0.3;
var mouseUseMax = 66;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var material, outlineMaterial;
var start = Date.now();

var svg, svgData, canvas, svgSize, ctx, img;
var face = true;
var leftEye = Snap.select('#lefteye');
var rightEye = Snap.select('#righteye');
var leftEyeS = Snap.select('#lefteyeshine');
var rightEyeS = Snap.select('#righteyeshine');
var faceTexture;
var eyesAnim_D = 750;

window.addEventListener( 'load', init );
window.addEventListener( 'resize', onWindowResize, false );
document.addEventListener( 'mousemove', onMouseMove, false );


function init() {
    container = document.createElement('div');
    var domElements = document.getElementsByClassName('canvas-container');
    var domParent = domElements[0];
    domParent.appendChild(container);
    // container = document.getElementById( 'container' );

    scene = new THREE.Scene();
    outScene  = new THREE.Scene();

    // instantiate a loader
    var loader = new THREE.JSONLoader();

    camera = new THREE.PerspectiveCamera( fov, CANVAS_WIDTH/CANVAS_HEIGHT, 1, 10000 );
    camera.position.z = 4;
    camera.target = new THREE.Vector3( 0, 0, 0 );

    scene.add( camera );
    var diffTexture = new THREE.TextureLoader().load( diffTexture_path );
    var displacementTexture = new THREE.TextureLoader().load( displacementTexture_path );

    renderer = new THREE.WebGLRenderer( { alpha:true, antialias:true });
    renderer.setPixelRatio( window.devicePixelRatio );
    // renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
    renderer.autoClear = false;
    renderer.setClearColor (0x000000, 0);
    
    container.appendChild( renderer.domElement );

    svg = document.getElementById("svgContainer").querySelector("svg");
    svgData = (new XMLSerializer()).serializeToString(svg);
    canvas = document.createElement("canvas");
    svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;
    ctx = canvas.getContext("2d");
    img = document.createElement("img");
    img.setAttribute("src", "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svgData))) );
    img.setAttribute("class", "svg-img");
    img.onload = function() {
    
    ctx.drawImage(img, 0, 0);
    //document.body.appendChild(img);
    document.body.insertBefore(img, document.body.firstChild);

    faceTexture = new THREE.Texture(canvas);
    faceTexture.needsUpdate = true;

    material = new THREE.ShaderMaterial( {
        uniforms: {
        tDiff: { type: "t", value: diffTexture },
        tFace: { type: "t", value: faceTexture },
        tDisp: { type: "t", value: displacementTexture },
        time: { type: "f", value: 0 },
        weight: { type: "f", value: 0 },
        offset: {type: "f", value: 0.0 }
        },
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent
    } );

    outlineMaterial = new THREE.ShaderMaterial( {
        uniforms: {
        tDisp: { type: "t", value: displacementTexture },
        time: { type: "f", value: 0 },
        weight: { type: "f", value: 0 },
        offset: {type: "f", value: 0.035 }
        },
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent
    } );
    
    mesh = new THREE.Mesh( new THREE.IcosahedronGeometry( 1, 5 ), material );
    outlineMesh = new THREE.Mesh( new THREE.IcosahedronGeometry( 1, 5 ), outlineMaterial );
    outlineMesh.material.depthWrite = false;
    outlineMesh.quaternion = mesh.quaternion;
    //mesh.rotation.y = 2* Math.PI / 3;
    //outlineMesh.rotation.y = 2* Math.PI / 3;
    mesh.rotation.y = Math.PI / 2;
    outlineMesh.rotation.y = Math.PI / 2;
    outScene.add( outlineMesh );
    scene.add( mesh );

    /*
    // load a resource
    loader.load(

        // resource URL
        'models/lsp_arm.json',

        // Function when resource is loaded
        function ( geometry, materials ) {
        armMaterial = new THREE.MeshBasicMaterial( {
            map : diffTexture
        } );
        
        /*
        armOutlineMaterial = new THREE.ShaderMaterial( {
            uniforms: {
            offset: {type: "f", value: 0.035 }
            },
            vertexShader: document.getElementById( 'Outline_vertexShader' ).textContent,
            fragmentShader: document.getElementById( 'Outline_fragmentShader' ).textContent
        } );
        * /

        armOutlineMaterial = new THREE.MeshBasicMaterial( {
            color : new THREE.Color( 0x000000 )
        } );

        var arm = new THREE.Mesh( geometry, armMaterial );
        arm.scale.set(1.35,1.35,1.35);
        arm.position.set(-1,-0.05,-0.35);
        scene.add( arm );
        var outlineArm = new THREE.Mesh( geometry, armOutlineMaterial );
        outlineArm.material.depthWrite = false;
        //outlineArm.scale.set(1.35,1.35,1.35);
        outlineArm.scale.set(1.4,1.4,1.4);
        outlineArm.position.set(-1,-0.05,-0.35);
        outScene.add( outlineArm );

        var arm2 = new THREE.Mesh( geometry, armMaterial );
        arm2.rotation.y = Math.PI;
        arm2.scale.set(1.35,1.35,1.35);
        arm2.position.set(1.05,-0.05,1.0);
        scene.add( arm2 );
        var outlineArm2 = new THREE.Mesh( geometry, armOutlineMaterial );
        outlineArm2.material.depthWrite = false;
        //outlineArm.scale.set(1.35,1.35,1.35);
        outlineArm2.rotation.y = Math.PI;
        outlineArm2.scale.set(1.4,1.4,1.4);
        outlineArm2.position.set(1.05,-0.05,1.0);
        outScene.add( outlineArm2 );

        }
        */
        
    };
        

    render();

}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    //renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function onMouseMove(event) {
    event.preventDefault();
    mouseX = (event.clientX - windowHalfX)/windowHalfX;
    mouseY = (event.clientY - windowHalfY)/windowHalfY;
    camera.position.x = mouseX * camDistX;
    camera.position.y = mouseY * camDistY;
    camera.lookAt( scene.position );
    mouseUse++;
    exceded = mouseUse > mouseUseMax;
    console.log(exceded);
}

var start = Date.now();

function updateImage() {
    console.log("Left eye anim. Finished");
    svgData = (new XMLSerializer()).serializeToString(svg);
    img.setAttribute("src", "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svgData))) );
    img.onload = function() {		 
    ctx.drawImage(img, 0, 0);
    //document.body.appendChild(img);
    //document.body.insertBefore(img, document.body.firstChild);
    }
}

function render() {
    var dateNow = Date.now();
    var time = .00015 * ( dateNow - start );
    //var weight =  0.5 * ( .5 + .5 * Math.sin( .00025 * ( dateNow - start ) ) );
    var weight = Math.min(mouseUse,mouseUseMax)/mouseUseMax*noiseScale;

    if (outlineMaterial) {		 
    outlineMaterial.uniforms[ 'time' ].value = material.uniforms[ 'time' ].value = time;
    outlineMaterial.uniforms[ 'weight' ].value = material.uniforms[ 'weight' ].value = weight;
    }
    
    if ( face && exceded ) {
    console.log("Left eye anim. Triggered");
    leftEye.animate({
        rx: "3.5",
        ry: "6.25",		     
        cy: "150.26266",
        cx: "123.5"
    }, eyesAnim_D);
    rightEye.animate({
        rx: "3.5",
        ry: "6.25",		     
        cy: "150.26266",
        cx: "146.5"
    }, eyesAnim_D);
    face = false;
    setTimeout(function() {
        leftEyeS.animate({
        "fill-opacity": 1.0,
        rx: "1.5",
        ry: "2.68"
        }, eyesAnim_D*0.2);
    }, 350);
    setTimeout(function() {
        rightEyeS.animate({
        "fill-opacity": 1.0,
        rx: "1.5",
        ry: "2.68",
        }, eyesAnim_D*0.2);
    }, 350);
    }
    if (!face){
    svgData = (new XMLSerializer()).serializeToString(svg);
    img.setAttribute("src", "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svgData))) );
    img.onload = function() {		 
        ctx.drawImage(img, 0, 0);
    }
    faceTexture.needsUpdate = true;
    }
    
    renderer.render( outScene, camera );
    renderer.render( scene, camera );
    requestAnimationFrame( render );

}
