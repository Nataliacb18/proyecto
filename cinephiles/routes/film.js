var express = require('express');
const multer = require ("../middleware/multer");
var router = express.Router();
const filmController = require("../controllers/filmController")

// Ruta base: localhost:3000/film

// localhost:3000/film/addFilm
router.get("/addFilm", filmController.viewFilmRegister);


//localhost:3000/film/addFilm
router.post("/addFilm", multer("film"), filmController.createFilm);

// localhost:3000/film/deleted/:film_id/:cinephile_id
router.get("/deleted/:film_id/:cinephile_id", filmController.deletedFilm);

// localhost:3000/film/edit/:film_id/:cinephile_id
router.get("/edit/:film_id/:cinephile_id", filmController.viewEdit);

// localhost:3000/film/edit/:film_id/:cinephile_id
router.post("/edit/:film_id/:cinephile_id", multer("film"), filmController.edit);


module.exports = router;