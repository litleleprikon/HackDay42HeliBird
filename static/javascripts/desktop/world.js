/**
 * Created by emilsharifullin on 30/04/16.
 */

function World(scene) {
    this.scene = scene;
    this.helicopter = new Helicopter();
    // this.helicopter.movementLoop();
    this.skyParts = [];
    this.addCloudsFrame();
    this.addCloudsFrame();
    this.addCloudsFrame();
    this.addCloudsFrame();
    this.helicopter.addToScene(scene);
    this.DISTANCE_TO_DELETE = -60;
    this.DISTANCE_TO_ALLOCATE = 170;
}

World.prototype.addCloudsFrame = function () {
    var first = this.skyParts.length < 2;
    var lastFrame = first ? null : this.skyParts[this.skyParts.length-1];
    // lastFrame = this.skyParts[this.skyParts.length-1]
    var frame = new Frame(lastFrame, first);
    this.scene.add(frame.mesh);
    this.skyParts.push(frame.mesh);
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

World.prototype.createTube = function () {
    
};

World.prototype.moveClouds = function () {
    var self = this;
    var isDeletion = this.skyParts[0].position.z <= this.DISTANCE_TO_DELETE;
    var isAllocation = this.skyParts[this.skyParts.length - 1].position.z <= this.DISTANCE_TO_ALLOCATE;
    if (isDeletion) {
        setTimeout(function () {
            self.removeFirst();
        }, 25);
    }
    this.skyParts.forEach(function (item) {
        item.translateZ(-0.5)
    });
    if (isAllocation) {
        setTimeout(function () {
            var frame = self.addCloudsFrame();
        }, 25);
    }
};

World.prototype.step = function () {
    this.helicopter.rotateScrews();
    this.moveClouds();
};
