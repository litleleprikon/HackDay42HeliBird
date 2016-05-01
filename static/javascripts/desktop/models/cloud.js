/**
 * Created by emilsharifullin on 30/04/16.
 */
function Cloud(position) {
    this.mesh = new THREE.Object3D();

    var geom = new THREE.BoxGeometry(20, 20, 20);
    var nBlocs = 3 + Math.floor(Math.random() * 3);
    for (var i = 0; i < nBlocs; i++) {

        var m = new THREE.Mesh(geom, this.mat);

        m.position.x = i * 15;
        m.position.y = Math.random() * 10;
        m.position.z = Math.random() * 10;
        m.rotation.z = Math.random() * Math.PI * 2;
        m.rotation.y = Math.random() * Math.PI * 2;

        var s = .1 + Math.random() * .9;
        m.scale.set(s, s, s);

        m.castShadow = true;
        m.receiveShadow = true;
        this.mesh.add(m);
    }
    this.mesh.scale.set(.05, .05, .05);
    this.mesh.position.x = position.x;
    this.mesh.position.y = position.y;
    this.mesh.position.z = position.z;
}

Cloud.prototype.mat = new THREE.MeshPhongMaterial({
    color: COLORS.LIGHT_PURPLE,
    shading: THREE.FlatShading
});