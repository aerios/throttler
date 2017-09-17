"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Runner_1 = require("./libs/Runner");
exports.Runner = Runner_1.Runner;
var TimedRunner_1 = require("./libs/TimedRunner");
exports.TimedRunner = TimedRunner_1.TimedRunner;
var defaultRunner = new Runner_1.Runner();
var defaultTimedRunner = new TimedRunner_1.TimedRunner();
var Function = function (f) { return defaultRunner.Function(f); };
exports.Function = Function;
var Debounce = function (f, timeout) { return defaultTimedRunner.Debounce(f, timeout); };
exports.Debounce = Debounce;
//# sourceMappingURL=index.js.map