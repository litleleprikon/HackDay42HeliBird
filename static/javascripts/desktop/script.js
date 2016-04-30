/**
 * Created by emilsharifullin on 27/04/16.
 */

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    socket = io.connect('http://localhost:8081/desktop');
    socket.on('connect', function () {
        socket.on("movement", function (data) {
            // console.log(data);
            $('#target').animate({'left': data.x < 0 ? '-=' + Math.abs(data.x) * MOTION_MULTIPLIER : '+=' + data.x * MOTION_MULTIPLIER}, MOTION_SPEED);
        });
    });
    createScene();

}

function createLights(scene) {
    // A hemisphere light is a gradient colored light;
    // the first parameter is the sky color, the second parameter is the ground color,
    // the third parameter is the intensity of the light
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);

    // A directional light shines from a specific direction.
    // It acts like the sun, that means that all the rays produced are parallel.
    shadowLight = new THREE.DirectionalLight(0xffffff, .9);

    // Set the direction of the light
    shadowLight.position.set(150, 350, 350);

    // Allow shadow casting
    shadowLight.castShadow = true;

    // define the visible area of the projected shadow
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;

    // define the resolution of the shadow; the higher the better,
    // but also the more expensive and less performant
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    // to activate the lights, just add them to the scene
    scene.add(hemisphereLight);
    scene.add(shadowLight);
}

function createScene() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    var axes = new THREE.AxisHelper(20);
    scene.fog = new THREE.Fog(COLORS.BLUE, 100, 950);
    scene.add(axes);
    createLights(scene);
    camera.position.x = 50;
    camera.position.y = 50;
    camera.position.z = -50;
    camera.lookAt(scene.position);
    // var helicopter = new Helicopter();
    // helicopter.addToScene(scene);
    var world = new World(scene);
    // new Cloud().addToScene(scene, {x: 0, y: 6, z: 0});
    $("#scene").append(renderer.domElement);
    loop(scene, renderer, camera, world)
}

function loop(scene, renderer, camera, world) {
    innerLoop();
    function innerLoop() {
        world.step();
        renderer.render(scene, camera);

        requestAnimationFrame(innerLoop);
    }
}