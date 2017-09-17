import { Runner, TimedRunner } from '../src/'
import { expect } from 'chai'
import * as Promise from 'bluebird'
import * as mocha from 'mocha'

describe("Runner", () => {
    let runnerInstance = new Runner(10)
    let timeoutNum = 200
    let asyncFunc1 = () => new Promise<string>((resolve) => {
        setTimeout(resolve, timeoutNum, "hai")
    })
    let wrappedFunc = runnerInstance.Function(asyncFunc1)
    it("should able to run async function", (done) => {        
        wrappedFunc().then((result) => {
            expect(result).to.be.equal("hai")
            done()
        }).catch(done)
    })
    it("should able to run multipe wrapped function", (done) => {
        Promise.all([wrappedFunc(), wrappedFunc()])
        .then((list) =>{
            expect(list).to.has.length(2)
            done()
        })
        .catch(done)
    })
    it("should run function maximum equal to maxActiveJob", (done) => {
        let listPr = Array.from({length: 12}).map (key => wrappedFunc())
        let start = new Date()
        Promise.all(listPr).then(function(list){
            let end = new Date()
            let delta = (end.getTime() - start.getTime())
            expect(delta).to.be.greaterThan(timeoutNum * 2)
            done()
        })
    })
})

