"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var id = 0;
function getAutoIncrementId() {
    return ++id;
}
var Job = /** @class */ (function () {
    function Job(resolver, rejecter, runner, args) {
        this.id = getAutoIncrementId();
        this.runner = runner;
        this.Resolver = resolver;
        this.Rejecter = rejecter;
        this.args = args;
    }
    Job.prototype.run = function () {
        return this.runner.apply(null, this.args);
    };
    return Job;
}());
exports.Job = Job;
//# sourceMappingURL=Job.js.map