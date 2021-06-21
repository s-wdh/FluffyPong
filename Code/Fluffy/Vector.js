"use strict";
var FluffyPong;
(function (FluffyPong) {
    class Vector {
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        getDifference(_v0, _v1) {
            let vector = new Vector(_v0.x - _v1.x, _v0.y - _v1.y);
            return vector;
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
        random(_minLength, _maxLength) {
            let length = _minLength + Math.random() * (_maxLength - _minLength);
            let direction = Math.random() * 2 * Math.PI;
            this.set(Math.cos(direction), Math.sin(direction));
            this.scale(length);
        }
    }
    FluffyPong.Vector = Vector;
})(FluffyPong || (FluffyPong = {}));
//# sourceMappingURL=Vector.js.map