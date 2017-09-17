import { Runner } from './libs/Runner'
import { TimedRunner } from './libs/TimedRunner'
import { UserDefinedRunner } from './libs/Job'
let defaultRunner = new Runner()
let defaultTimedRunner = new TimedRunner()
let Function = <T>(f: UserDefinedRunner<T>) => defaultRunner.Function(f)
let Debounce = <T>(f: UserDefinedRunner<T>, timeout: number) => defaultTimedRunner.Debounce(f, timeout)
export {
    Runner, TimedRunner, Function, Debounce    
}