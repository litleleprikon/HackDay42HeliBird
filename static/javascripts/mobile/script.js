// /**
//  * Created by emilsharifullin on 27/04/16.
//  */
//
var DELTA = 1.5;
//
var SOCKET;

var previous = {
    x: 0,
    y: 0,
    z: 0
};

$(document).ready(ready);

function ready() {
    var link = 'http://{}:8081/mobile'.replace('{}', location.hostname);
    SOCKET = io.connect(link);
    SOCKET.on('end', end);
    window.ondevicemotion = movement;
}

function end(data) {

}

function movement(event) {
    ax = event.accelerationIncludingGravity.x;
    ay = event.accelerationIncludingGravity.y;
    az = event.accelerationIncludingGravity.z;
    dx = ax - previous.x;
    dy = ay - previous.y;
    dz = az - previous.z;
    // $(".accelerometer").html(" x:" + ax + ", y:" + ay + ", z:" + az);
    previous.x = ax;
    previous.y = ay;
    previous.z = az;
    if(
        Math.abs(dx) > DELTA ||
        Math.abs(dy) > DELTA ||
        Math.abs(dz) > DELTA
    ) {
        SOCKET.emit('movement', {x: dx, y: dy, z: dz});
    }


    // rotation = event.rotationRate;
    // if (rotation != null) {
    //     arAlpha = Math.round(rotation.alpha);
    //     arBeta = Math.round(rotation.beta);
    //     arGamma = Math.round(rotation.gamma);
    // }
}