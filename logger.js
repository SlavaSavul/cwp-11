const fs = require('fs');
let logArray = require('./log.json');;

const path = "log.json";

var functions ={};
module.exports= functions;

functions.writeLog = (req, res, next) => {
    let logData={
        "date": new Date(),
        "path": req.baseUrl,
        "params": req.method === 'GET' ? req.query : req.body,
    };
    logArray.push(logData);
    save(logArray);
    next();
}


save=function(array){
    fs.truncate(path, () => {
        fs.writeFile(path, JSON.stringify(array));
    });
}




