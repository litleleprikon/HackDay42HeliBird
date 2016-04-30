/**
 * Created by emilsharifullin on 30/04/16.
 */

function World(scene) {
    this.scene = scene;
    this.helicopter = new Helicopter();
    this.skyParts = [this.createCloudsFrame(0), this.createCloudsFrame(1), this.createCloudsFrame(2), this.createCloudsFrame(3)];
    this.helicopter.addToScene(scene);
    this.DISTANCE_TO_DELETE = -60;
    this.DISTANCE_TO_ALLOCATE = 70;
}

World.prototype.createCloudsFrame = function (sequenceNum) {
    var frame = new THREE.Object3D();
    for (var i = 0; i < random(5, 10); i++) {
        var cloud = new Cloud({
            x: random(-30, 30),
            y: random(-30, 30),
            z: random(0, 20)
        });
        frame.add(cloud.mesh);
    }
    frame.position.z = 20 * sequenceNum;
    this.scene.add(frame);
    return frame;
};

World.prototype.removeFirst = function () {
    var first = this.skyParts.shift();
    first.children.forEach(function (item) {
        item.children.forEach(function (secItem) {
            // console.log(secItem);
            secItem.geometry.dispose();
            secItem.material.dispose();
        })

    });
    this.scene.remove(first);
};

World.prototype.moveClouds = function () {
    var self = this;
    var isDeletion = this.skyParts[0].position.z <= this.DISTANCE_TO_DELETE;
    var isAllocation = this.skyParts[this.skyParts.length-1].position.z <= this.DISTANCE_TO_ALLOCATE;
    if (isDeletion) {
        setTimeout(function () {
            self.removeFirst();
        }, 25);
    }
    this.skyParts.forEach(function (item) {
        item.translateZ(-0.1)
    });
    if (isAllocation) {
        setTimeout(function () {
            var frame = self.createCloudsFrame(self.skyParts.length);
            self.skyParts.push(frame);
        }, 25);
    }
};

World.prototype.step = function () {
    this.helicopter.rotateScrews();
    this.moveClouds();
};
