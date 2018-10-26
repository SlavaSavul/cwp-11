const actors = require("./actors.json")
const Actor = require('./actor');


var functions={};

module.exports = functions;


functions.readAll= function(req,res){
    let result = actors.sort(compareNumber);
    res.send(result);
}



functions.read= function(req,res){
    let id = req.query.id;
    let index = actors.findIndex(i => i.id == id);
    if(index === -1){
        res.send({message:"Invalid request"});
    }
    else{
        res.send(actors[index]);
    }
}



functions.create= function(req,res){
    if(Actor.checkValidFullData(req.body)){
        let actor =  Actor.create(req.body);
        actors.push(actor);
        Actor.save(actors);
        res.send(actor);
    }
    else{
        res.send({message:"Invalid request"});
    }
}


functions.update= function(req,res){
    if(!Actor.checkValidUpdatedData(req.body)){
        res.send({message:"Invalid request"});
    }
    else
    {
        let id = req.body.id;
        let index = actors.findIndex(i => i.id == id);
        if(index === -1){
            res.send({message:"Invalid request"});
        }
        else{
            let updatedActor=actors[index];
            for(let key in req.body){
                if(key != "id"){
                    updatedActor[key]=req.body[key];
                }
            }
            Actor.save(actors);
            res.send(updatedActor);
        }
    }
}





functions.delete= function(req,res){
    let id = req.body.id;
    let index = actors.findIndex(i => i.id == id);
    if(index === -1){
        res.send({message:"Invalid request"});
    }
    else{
        let deletedActor = actors.splice(index,1);
        Actor.save(actors);
        res.send(deletedActor);
    }
}




const compareNumber = (cur, prev) => {
    return -(cur["liked"] - prev["liked"]);
};