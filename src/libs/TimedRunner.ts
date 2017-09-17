import { Runner } from './Runner'
import { UserDefinedRunner } from './Job'
import * as Promise from 'bluebird'

export class TimedRunner  {

    private timerMap : Map<String, UserDefinedRunner<any>> = new Map()
    constructor() {}

    Debounce<R>(f: UserDefinedRunner<R>, timeout: number) : UserDefinedRunner<R> {
        let funcStr = f.toString()
        let optFunc = this.timerMap.get(funcStr)
        if(optFunc == null) {
            let timerF = (...args: any[]) => {
                return new Promise<R>((resolve, reject) => {
                    f(...args)
                    .then(result => setTimeout(() => resolve(result), timeout)
                    )
                    .catch(reason => setTimeout(() => reject(reason), timeout))
                })
            }
            let definedFunc = (new Runner(1)).Function(timerF)
            this.timerMap = this.timerMap.set(funcStr, definedFunc)
            return definedFunc
        } else {
            return optFunc
        }        
    }

}