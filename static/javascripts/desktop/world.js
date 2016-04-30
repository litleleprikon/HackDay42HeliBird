/**
 * Created by emilsharifullin on 30/04/16.
 */

function World(scene) {
    this.scene = scene;
    this.helicopter = new Helicopter();
    this.skyParts = this.createClouds(scene);
    this.helicopter.addToScene(scene);
    this.DISTANCE_TO_DELETE = 30;
    this.newClouds = true;
}

World.prototype.createClouds = function (scene) {
    clouds = [];
    for (var i = 0; i < random(40, 45); i++) {
        var cloud = new Cloud();
        clouds.push(cloud);
        cloud.addToScene(scene, {
            x: random(-30, 30),
            y: random(-30, 30),
            z: random(0, 70)
        });
    }
    return clouds;
};

World.prototype.step = function () {
    this.helicopter.propeller.rotation.y -= 0.3;
    this.moveClouds();
    this.genereteNewClouds();
};

World.prototype.genereteNewClouds = function () {
    var self = this;
    if (this.newClouds) {
        for (var i = 0; i < random(5, 15); i++) {
            var cloud = new Cloud();
            this.skyParts.push(cloud);
            cloud.addToScene(this.scene, {
                x: random(-30, 30),
                y: random(-30, 30),
                z: random(70, 90)
            });
        }
        this.newClouds = false;
        setTimeout(function () {
            self.newClouds = true;
        }, 750)
    }
};

World.prototype.moveClouds = function () {
    var self = this;
    for (var i = 0, len = this.skyParts.length; i < len; i++) {
        this.skyParts[i].mesh.translateZ(-0.3);
        this.skyParts.filter(function (e) {
            if (e.mesh.position.z <= -self.DISTANCE_TO_DELETE) {
                self.scene.remove(e.mesh);
                e.mesh.children.forEach(function (item) {
                    self.scene.remove(item);
                    item.material.dispose();
                    item.geometry.dispose();
                });
                // console.break();
                // if (e.geometry) e.geometry.dispose();
                // if (e.material) e.material.dispose();
                // if (e.texture) e.texture.dispose();
                // if (e.mesh) e.mesh.dispose();
                return false;
            }
            return true;
        });
    }
};