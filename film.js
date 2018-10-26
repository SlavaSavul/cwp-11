const fs = require('fs');
const guid = require("guid");
let path = 'films.json';



var funcrions={};
module.exports= funcrions;


funcrions.create=function(film){
    let obj={
        "id": guid.create().value,
        "title": film.title,
        "rating": film.rating,
        "year": Number(film.year),
        "budget": Number(film.budget),
        "gross": Number(film.gross),
        "poster": film.poster,
        "position": Number(film.position),
    };
    return obj;
}

funcrions.checkValidFullData=function(film){
    for(let elem in funcrions.create({})){
        if(!film[elem] && elem!="id") return false;
    }
    if( film.year < 1895 ||
        film.budget < 0 ||
        film.gross < 0 ||
        film.title == undefined) {
            return false;
    }
    return true;
}


funcrions.checkValidUpdatedData=function(film){
    if( film.year < 1895 ||
        film.budget < 0 ||
        film.gross < 0 ||
        film.title == undefined ||
        film.id == undefined) {
        return false;
    }
    return true;
}

funcrions.save=function(films){
    fs.truncate(path, () => {
        fs.writeFile(path, JSON.stringify(films));
    });
}