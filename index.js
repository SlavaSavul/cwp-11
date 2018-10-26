const express = require('express');
var bodyParser = require("body-parser");
const filmsRoutes = require('./filmsRoutes');
const actorsRoutes = require('./actorsRoutes');
const logger = require('./logger');




const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/*", logger.writeLog);

var jsonParser = bodyParser.json();

try{
    app.use("/images/actors/", express.static("images/actors"));
    app.use("/images/actors/*", express.static("images/actors/404.jpg"));

    app.get('/api/films/readall', filmsRoutes.readAll);
    app.get('/api/films/read', filmsRoutes.read);
    app.post('/api/films/create',jsonParser, filmsRoutes.create);
    app.post('/api/films/update',jsonParser, filmsRoutes.update);
    app.post('/api/films/delete',jsonParser, filmsRoutes.delete);

    app.get('/api/actors/readall', actorsRoutes.readAll);
    app.get('/api/actors/read', actorsRoutes.read);
    app.post('/api/actors/create', actorsRoutes.create);
    app.post('/api/actors/update', actorsRoutes.update);
    app.post('/api/actors/delete', actorsRoutes.delete);

    app.listen(3000, () => {
        console.log('Example app listening on port 3000!');
      })
}
catch(error){
    console.log(error);
}

