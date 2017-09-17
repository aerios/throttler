"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Runner_1 = require("./Runner");
var Promise = require("bluebird");
var TimedRunner = /** @class */ (function () {
    function TimedRunner() {
        this.timerMap = new Map();
    }
    TimedRunner.prototype.Debounce = function (f, timeout) {
        var funcStr = f.toString();
        var optFunc = this.timerMap.get(funcStr);
        if (optFunc == null) {
            var timerF = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                console.log("OIOI");
                return new Promise(function (resolve, reject) {
                    f.apply(void 0, args).then(function (result) {
                        setTimeout(function () {
                            resolve(result);
                        }, timeout);
                    })
                        .catch(function (reason) { return setTimeout(function () { return reject(reason); }, timeout); });
                });
            };
            var definedFunc = (new Runner_1.Runner(1)).Function(timerF);
            this.timerMap = this.timerMap.set(funcStr, definedFunc);
            return definedFunc;
        }
        else {
            return optFunc;
        }
    };
    return TimedRunner;
}());
exports.TimedRunner = TimedRunner;
//# sourceMappingURL=TimedRunner.js.map