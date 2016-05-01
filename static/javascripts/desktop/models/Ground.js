/**
 * Created by emilsharifullin on 01/05/16.
 */


function Ground() {
    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.mesh.position.x = 0;
    this.mesh.position.y = -20;
    this.mesh.position.z = 0;
}

Ground.prototype.mat = new THREE.MeshPhongMaterial({color: COLORS.BROWN, shading: THREE.FlatShading});
Ground.prototype.geom = new THREE.BoxGeometry(60, 0.1, 20);