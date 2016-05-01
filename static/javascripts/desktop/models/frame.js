/**
 * Created by emilsharifullin on 01/05/16.
 */


function Frame(lastFrame, first) {
    this.mesh = new THREE.Object3D();
    var ground = new Ground();
    this.mesh.add(ground.mesh);
    for (var i = 0; i < random(5, 10); i++) {
        var cloud = new Cloud({
            x: random(-30, 30),
            y: random(-10, 30),
            z: random(0, 20)
        });
        this.mesh.add(cloud.mesh);
    }
    if (first) {
        this.mesh.position.z = 0;
    } else {
        this.mesh.position.z = lastFrame.position.z+20;
    }
}