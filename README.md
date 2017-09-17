# Throttler

## Simple backpressure wrapper for asynchronous function

This module achieve backpressure-like behaviour by wrapping the method / function into a job, and push the job into a queue, waiting to be executed. 

## Installation
```
npm install throttler --save
```

### How to use
```
/*Preparation*/

let Throttler = require('throttler')
let throttleInstance = new Throttler(10)
let readFromFile = throttleInstance.Function((filePath) => {
    return new Promise((resolve, reject) => {
        //do async function here
        fs.readFile((err, data) => {
            if(err) {reject(err)}
            else {resolve(data)}
        })
    })
})

/*Usage*/

readFromFile(somePath).then((result) => {
    console.log("File result", result.toString())
}).catch((reason) =>{
    console.log("Something wrong", reason)
})

```