/**
 * Created by emilsharifullin on 30/04/16.
 */

function Helicopter() {
    this.mesh = new THREE.Object3D();
    this.createCocpit();
    this.createTail();
    this.createScrew();
    this.createTailScrew();
    this.canMove = true;
    this.movementAccumulator = {x: 0, y: 0};
}

Helicopter.prototype.resetAccumulator = function () {
    this.movementAccumulator.x = 0;
    this.movementAccumulator.y = 0;
};

Helicopter.prototype.rotateScrews = function() {
    this.propeller.rotation.y -= 0.3;
    this.tailPropeller.rotation.x += 0.3;
};

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

Helicopter.prototype.createTailScrew = function () {
    var geomPropeller = new THREE.BoxGeometry(0.5, 0.2, 0.2);
    var matPropeller = new THREE.MeshPhongMaterial({color: COLORS.BROWN, shading: THREE.FlatShading});
    this.tailPropeller = new THREE.Mesh(geomPropeller, matPropeller);
    this.tailPropeller.castShadow = true;
    this.tailPropeller.receiveShadow = true;

    // blades
    var geomBlade = new THREE.BoxGeometry(0.05, 0.3, 3);
    var matBlade = new THREE.MeshPhongMaterial({color: COLORS.BLACK, shading: THREE.FlatShading});

    var blade = new THREE.Mesh(geomBlade, matBlade);
    blade.position.set(-0.25, 0, 0);
    blade.castShadow = true;
    blade.receiveShadow = true;
    this.tailPropeller.add(blade);
    this.tailPropeller.position.set(-0.25, 1.5, -8);
    this.mesh.add(this.tailPropeller);
};

Helicopter.prototype.move = function() {
    this.canMove = false;
    var self = this;
    setTimeout(function () {
        self.canMove = true;
    });
    // this.mesh.rotate.x();
    this.mesh.position.x += this.movementAccumulator.x;
    this.mesh.position.y += this.movementAccumulator.y;
};

Helicopter.prototype.setPosition = function (x, y) {

};

Helicopter.prototype.addToScene = function (scene) {
    this.mesh.scale.set(.5, .5, .5);
    this.mesh.position.x = 0;
    this.mesh.position.y = 0;
    scene.add(this.mesh);
};