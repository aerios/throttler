import { Job, UserDefinedRunner } from './Job'
import * as Promise from 'bluebird'

type AnyJob = Job<any>
export class Runner {
    
    private maxActiveJob: number
    private jobList: Array<AnyJob> = new Array()
    private activeJob: number = 0
    constructor(maxActiveJob : number = 10) {
        this.maxActiveJob = maxActiveJob
    }
    private pushJob(job: AnyJob) {
        this.jobList = this.jobList.concat(job)
    }
    private runJob()  {
        if(!this.isAllowedToRun()) {
            return;
        }        
        let job = this.jobList.shift()            
        let self = this        
        if(job != null){
            this.up()
            let jobId = job.id
            job.run()
                .then(function(result) {                    
                    self.down()
                    job.Resolver(result)
                    self.runJob()
                })
                .catch((reason) => {
                    self.down()
                    job.Rejecter(reason)
                    self.runJob()
                })
        }
    }
    private up() {this.activeJob += 1}
    private down() {
        this.activeJob = this.activeJob - 1
        if(this.activeJob < 0) {
            this.activeJob = 0
        }
    }
    private isAllowedToRun() : boolean {
        return this.activeJob < this.maxActiveJob
    }
    Function<R>(f: UserDefinedRunner<R>) : UserDefinedRunner<R> {
        let self = this
        return function(...args: any[]) {
            return new Promise<R>((resolve, reject) => {
                let job = new Job(resolve, reject, f, args)
                self.pushJob(job)
                self.runJob()
            })
        }
    }
}
