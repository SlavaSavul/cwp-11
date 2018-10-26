const fs = require('fs');
const guid = require("guid");
let path = 'actors.json';



var functions={};
module.exports= functions;


functions.create=function(actor){
    let obj={
        "id": guid.create().value,
        "name": actor.name,
        "birth": actor.birth,
        "films": actor.films,
        "liked": actor.liked ,
        "photo": actor.photo
    };
    return obj;
}


functions.checkValidFullData = function(actor){
    for(let key in functions.create({})){
        if(!actor[key] && key!="id") return false;
    }

    if( actor.liked < 0 ||
        actor.films < 0)
        return false;

    return true;
}

functions.checkValidUpdatedData = function(actor){

    if( actor.liked < 0 ||
        actor.films < 0 ||
        !actor.id )
        return false;
    return true;
}

functions.save=function(films){
    fs.truncate(path, () => {
        fs.writeFile(path, JSON.stringify(films));
    });
}