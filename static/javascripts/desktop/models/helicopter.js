/**
 * Created by emilsharifullin on 30/04/16.
 */

function Helicopter() {
    this.mesh = new THREE.Object3D();
    this.createCocpit();
    this.createTail();
    this.createScrew();
}

Helicopter.prototype.createCocpit = function () {
    var geomCockpit = new THREE.BoxGeometry(3, 3, 6);
    var matCockpit = new THREE.MeshPhongMaterial({color: COLORS.DARK_PURPLE, shading: THREE.FlatShading});
    var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.mesh.add(cockpit)
};

Helicopter.prototype.createTail = function () {
    var geomTailPlane = new THREE.BoxGeometry(0.5, 1.5, 9);
    var matTailPlane = new THREE.MeshPhongMaterial({color: COLORS.BROWN, shading: THREE.FlatShading});
    var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
    tailPlane.position.set(0, 1.5, -4, 5);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    this.mesh.add(tailPlane);
};

Helicopter.prototype.createScrew = function () {
    var geomPropeller = new THREE.BoxGeometry(1, 2, 1);
    var matPropeller = new THREE.MeshPhongMaterial({color: COLORS.BROWN, shading: THREE.FlatShading});
    this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;

    // blades
    var geomBlade = new THREE.BoxGeometry(15, 0.1, 0.6);
    var matBlade = new THREE.MeshPhongMaterial({color: COLORS.BLACK, shading: THREE.FlatShading});

    var blade = new THREE.Mesh(geomBlade, matBlade);
    blade.position.set(0, 1, 0);
    blade.castShadow = true;
    blade.receiveShadow = true;
    this.propeller.add(blade);
    this.propeller.position.set(0, 2, 0);
    this.mesh.add(this.propeller);
};

Helicopter.prototype.setPosition = function (x, y, z) {

};

Helicopter.prototype.addToScene = function (scene) {
    this.mesh.scale.set(.5, .5, .5);
    this.mesh.position.x = 0;
    this.mesh.position.y = 0;
    scene.add(this.mesh);
};