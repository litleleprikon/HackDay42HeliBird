/**
 * Created by emilsharifullin on 27/04/16.
 */

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    var renderer = createRenderer();
    var scene = createScene(renderer);
    var world = new World(scene);
    var camera = createCamera(scene);
    loop(scene, renderer, camera, world);
    socket = io.connect('http://localhost:8081/desktop');
    socket.on('connect', function () {
        socket.on("movement", function (data) {
            // console.log(data);
            world.helicopter.setMovement(-data.x, -data.y);
            // $('#target').animate({'left': data.x < 0 ? '-=' + Math.abs(data.x) * MOTION_MULTIPLIER : '+=' + data.x * MOTION_MULTIPLIER}, MOTION_SPEED);
        });
    });
}

function createLights(scene) {
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);
    shadowLight = new THREE.DirectionalLight(0xffffff, .9);
    shadowLight.position.set(150, 350, 350);

    shadowLight.castShadow = true;

    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;

    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    scene.add(hemisphereLight);
    scene.add(shadowLight);
}

function createRenderer() {
    var renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer;
}

function createCamera(scene) {
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0;
    camera.position.y = 10;
    camera.position.z = -30;
    camera.lookAt(scene.position);
    return camera;
}

function createScene(renderer) {
    var scene = new THREE.Scene();
    var axes = new THREE.AxisHelper(20);
    scene.fog = new THREE.Fog(COLORS.BLUE, 100, 950);
    scene.add(axes);
    createLights(scene);
    $("#scene").append(renderer.domElement);
    return scene;
}

function loop(scene, renderer, camera, world) {
    innerLoop();
    function innerLoop() {
        world.step();
        renderer.render(scene, camera);

        requestAnimationFrame(innerLoop);
    }
}