const films = require("./films.json")
const Film = require('./film');


var functions={};

module.exports = functions;


functions.readAll= function(req,res){
    let result = films.sort(compareNumber);
    res.send(result);
}


functions.read= function(req,res){
   let id = req.query.id;
   let index = films.findIndex(i => i.id == id);
   if(index === -1){
       res.send({message:"Invalid request"});
   }
   else{
       res.send(films[index]);
   }
}

functions.create= function(req,res){
    setPositionToCreate(req.body);
    let film =  Film.create(req.body);
    if(Film.checkValidFullData(film)){
        films.push(film);
        Film.save(films);
        res.send(film);
    }
    else{
        res.send({message:"Invalid request"});
    }
}



functions.update= function(req,res){
    if(!Film.checkValidUpdatedData(req.body)){
        res.send({message:"Invalid request"});
    }
    else
    {
        let id = req.body.id;
        let index = films.findIndex(i => i.id == id);
        if(index === -1){
            res.send({message:"Invalid request"});
        }
        else{
            setPositionToUpdate(req.body,index);
            let updatedFilm=films[index];
            for(let key in req.body){
                if(key != "id"){
                    updatedFilm[key]=req.body[key];
                }
            }
            Film.save(films);
            res.send(updatedFilm);
        }
    }
}



functions.delete= function(req,res){
    let id = req.body.id;
    let index = films.findIndex(i => i.id == id);
    if(index === -1){
        res.send({message:"Invalid request"});
    }
    else{
        setPositionToDelete(req.body,index);
        let deletedFilm = films.splice(index,1);
        Film.save(films);
        res.send(deletedFilm);
    }
}




const compareNumber = (cur, prev) => {
    return cur["position"] - prev["position"];
};

function findLastPosition(){
    let last=0;
    for(var key in films){
        if(last <films[key].position)
            last=films[key].position
    }
    return last;
}

function setPositionToCreate(body){
    let lastPosition = findLastPosition();
    if(body.position>lastPosition){
        body.position = ++lastPosition;
    }
    else{
        for(var key in films){
            if(films[key].position >= body.position)
                films[key].position+=1;
        }
    }
}

function setPositionToDelete(body,index){
    for(var key in films){
        if(films[key].position >= films[index].position && key!=index)
            films[key].position-=1;
    }
}


function setPositionToUpdate(body,index){
    let lastPosition = findLastPosition();
    if(body.position>lastPosition){
        body.position = ++lastPosition;
    }
    else{
        if(films[index].position < body.position){
            for(var key in films){
                if(films[key].position > films[index].position && films[key].position <= body.position)
                    films[key].position-=1;
            }
        }
        else{
            for(var key in films){
                if(films[key].position < films[index].position && films[key].position >= body.position)
                    films[key].position+=1;
            }
        }
    }
}