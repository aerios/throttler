"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Job_1 = require("./Job");
var Promise = require("bluebird");
var Runner = /** @class */ (function () {
    function Runner(maxActiveJob) {
        if (maxActiveJob === void 0) { maxActiveJob = 10; }
        this.jobList = new Array();
        this.activeJob = 0;
        this.maxActiveJob = maxActiveJob;
    }
    Runner.prototype.pushJob = function (job) {
        this.jobList = this.jobList.concat(job);
    };
    Runner.prototype.runJob = function () {
        if (!this.isAllowedToRun()) {
            return;
        }
        this.up();
        var job = this.jobList.shift();
        var self = this;
        if (job != null) {
            var jobId_1 = job.id;
            job.run()
                .then(function (result) {
                console.log("Job id", jobId_1);
                self.down();
                job.Resolver(result);
                self.runJob();
            })
                .catch(function (reason) {
                self.down();
                job.Rejecter(reason);
                self.runJob();
            });
        }
    };
    Runner.prototype.up = function () { this.activeJob += 1; };
    Runner.prototype.down = function () {
        console.log("Down before");
        console.log(this.activeJob);
        this.activeJob = this.activeJob - 1;
        console.log(this.activeJob);
        console.log("Down after");
        if (this.activeJob < 0) {
            this.activeJob = 0;
        }
    };
    Runner.prototype.isAllowedToRun = function () {
        return this.activeJob < this.maxActiveJob;
    };
    Runner.prototype.Function = function (f) {
        var self = this;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new Promise(function (resolve, reject) {
                var job = new Job_1.Job(resolve, reject, f, args);
                self.pushJob(job);
                self.runJob();
            });
        };
    };
    return Runner;
}());
exports.Runner = Runner;
//# sourceMappingURL=Runner.js.map