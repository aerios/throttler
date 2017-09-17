import * as Promise from 'bluebird'


type Resolver<T> = (thenableOrResult?: T | PromiseLike<T>) => void
type Rejecter = (error?: any) => void
let id = 0
function getAutoIncrementId() {
    return ++id
}

export type UserDefinedRunner<T> = (...args: any[]) => Promise<T>
export class Job<T> {
    private runner: UserDefinedRunner<T>;
    private args: Array<any>
    Resolver: Resolver<T>
    Rejecter: (error?: any) => void
    id: number = getAutoIncrementId()
    constructor(resolver: Resolver<T>, rejecter: Rejecter  ,runner: UserDefinedRunner<T>, args: any[]) {
        this.runner = runner
        this.Resolver = resolver
        this.Rejecter = rejecter
        this.args = args
    }
    run() : Promise<T> {        
        return this.runner.apply(null, this.args)  
    }
}


