
var points = 0;

var renderer, scene, camera, snakeMesh, pommeMesh;
var pomme, snake, material;

var beta;
var gamma;

var posX = 0;
var posY = 0;

var posXPomme = 0;
var posYPomme = 0;

window.addEventListener('deviceorientation', function(event) {

    console.log(event);

    alpha = Math.round(event.alpha);
    beta = Math.round(event.beta);
    gamma = Math.round(event.gamma);

});


var initPomme = function() {
    posXPomme = Math.round(Math.random() * 10) % 10 - 5;
    posYPomme = Math.round(Math.random() * 10) % 10 - 5;
};



var display = function () {

    if (Math.abs(beta) > Math.abs(gamma)) {
	if (Math.abs(beta) > 15) {
	    posY -= Math.abs(beta) / beta;
	    snakeMesh.position.y = posY * 50;
	}
    }
    else {
	if (Math.abs(gamma) > 15) {
	    posX += Math.abs(gamma) / gamma;
	    snakeMesh.position.x = posX * 50;
	}
    }

    if (posXPomme == posX && posYPomme == posY) {
	points++;
	initPomme();
    }

    pommeMesh.position.x = posXPomme * 50;
    pommeMesh.position.y = posYPomme * 50;

    document.getElementById("points").innerHTML = points;

    renderer.render( scene, camera );
    console.log(posXPomme, posYPomme, posX, posY);
};







var init = function() {

    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight - 50);
    document.getElementById('viewContainer').appendChild(renderer.domElement);


    scene = new THREE.Scene();


    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set(0, 0, 1000);
    scene.add(camera);


    pomme = new THREE.CubeGeometry( 50, 50, 50 );
    material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: false } );
    pommeMesh = new THREE.Mesh( pomme, material );
    pommeMesh.rotation.x += 0.5;
    pommeMesh.rotation.y += 0.5;
    pommeMesh.position.x = posXPomme * 50;
    pommeMesh.position.y = posYPomme * 50;


    snake = new THREE.CubeGeometry( 70, 70, 70 );
    material = new THREE.MeshBasicMaterial( { color: 0x0000FF, wireframe: false } );
    snakeMesh = new THREE.Mesh( snake, material );
    snakeMesh.rotation.x += 0.5;
    snakeMesh.rotation.y += 0.5;
    renderer.render( scene, camera );

    scene.add( pommeMesh );
    scene.add( snakeMesh );
}



initPomme();
init();
setInterval(display, 400);
