/**
 * Created by emilsharifullin on 30/04/16.
 */

var acc = {
    x: 0,
    y: 0,
    z: 0
};

var previous = {
    x: 0,
    y: 0,
    z: 0
};

DELTA = 0.5;

var DEVICE_NOIZE = 5;

var count = 0;

if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', getDeviceRotation, false);
} else {
    $(".accelerometer").html("NOT SUPPORTED")
}

var x_0 = $V([acc.x, acc.y, acc.z]); //vector. Initial accelerometer values

//P prior knowledge of state
var P_0 = $M([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
]); //identity matrix. Initial covariance. Set to 1
var F_k = $M([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
]); //identity matrix. How change to model is applied. Set to 1
var Q_k = $M([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]); //empty matrix. Noise in system is zero

var KM = new KalmanModel(x_0, P_0, F_k, Q_k);

var z_k = $V([acc.x, acc.y, acc.z]); //Updated accelerometer values
var H_k = $M([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
]); //identity matrix. Describes relationship between model and observation
var R_k = $M([
    [DEVICE_NOIZE, 0, 0],
    [0, DEVICE_NOIZE, 0],
    [0, 0, DEVICE_NOIZE]
]); //2x Scalar matrix. Describes noise from sensor. Set to 2 to begin
var KO = new KalmanObservation(z_k, H_k, R_k);

//each 1/10th second take new reading from accelerometer to update
// var getNewPos = window.setInterval(function () {
//
//     KO.z_k = $V([acc.x, acc.y, acc.z]); //vector to be new reading from x, y, z
//     KM.update(KO);
//
//     $(".kalman-result").html(" x:" + KM.x_k.elements[0] + ", y:" + KM.x_k.elements[1] + ", z:" + KM.x_k.elements[2]);
//     $(".difference").html(" x:" + (acc.x - KM.x_k.elements[0]) + ", y:" + (acc.y - KM.x_k.elements[1]) + ", z:" + (acc.z - KM.x_k.elements[2]))
//
//
// }, 100);

//read event data from device
function getDeviceRotation(evt) {

    // gamma is the left-to-right tilt in degrees, where right is positive
    // beta is the front-to-back tilt in degrees, where front is positive
    // alpha is the compass direction the device is facing in degrees
    acc.x = evt.alpha;
    acc.y = evt.beta;
    acc.z = evt.gamma;
    // $(".accelerometer").html(" x:" +acc.x+", y:" +acc.y+", z:" +acc.z);
    KO.z_k = $V([acc.x, acc.y, acc.z]); //vector to be new reading from x, y, z
    KM.update(KO);
    kx = KM.x_k.elements[0];
    ky = KM.x_k.elements[1];
    kz = KM.x_k.elements[2];

    if (
        Math.abs(kx-previous.x) > DELTA ||
        Math.abs(ky-previous.y) > DELTA ||
        Math.abs(kz-previous.z) > DELTA
    ) {
        console.log(" x:" + kx + ", y:" + ky + ", z:" + kz);
        previous.x = kx;
        previous.y = ky;
        previous.z = kz;
    }
}