/**
 * Created by emilsharifullin on 30/04/16.
 */
var MOTION_MULTIPLIER = -30;
var MOTION_SPEED = 50;
var COLORS = {
    BLUE: 0x3581b8,
    BROWN: 0xfcb07e,
    DARK_PURPLE: 0x4d5382,
    LIGHT_PURPLE: 0xf5e1f7,
    PURPLE: 0xdc98d9,
    BLACK: 0x111111
};

function random(from, to) {
    return from + Math.random()*(to-from);
}

var MOVEMENT_WINDOW = {
    LEFT: -20,
    RIGHT: 20,
    TOP: 20,
    BOTTOM: -20
};