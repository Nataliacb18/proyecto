const connection = require("../config/db");
const bcrypt = require("bcrypt");

class FilmController {
  // añadimos películas
  createFilm = (req, res) => {
    let { title, film_description, director, cinephile_id } = req.body;

    let sql = `INSERT INTO film (title, film_description, director,cinephile_id ) 
        VALUES ("${title}", "${film_description}", "${director}", ${cinephile_id})`;

        

    if (req.file != undefined) {
      let film_img = req.file.filename;
 
      sql = `INSERT INTO film (title, film_description, director,cinephile_id, film_img) 
            VALUES ("${title}", "${film_description}", "${director}", ${cinephile_id}, "${film_img}")`;
    }

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/cinephile/oneCinephile/${cinephile_id}`);
    });
  };

  // Muestra el registro para crear película

  viewFilmRegister = (req, res) => {
    let sql = `SELECT * FROM cinephile WHERE cinephile_deleted = 0`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("filmRegister", { result });
    });
  };

  // Eliminar peli de manera 

  deletedFilm = (req, res) =>{
    let {film_id, cinephile_id} = req.params;
    console.log(req.params);

    let sql = `DELETE FROM film WHERE film_id = ${film_id}`;
    
    connection.query(sql, (error, result) =>{
      console.log(result, "vista de borar");
      if (error) throw error;
      res.redirect(`/cinephile/oneCinephile/${cinephile_id}`);
    })
  }

  // vista del formulario de editar pelicula
  viewEdit = (req, res) =>{
    let film_id = req.params.film_id;
   
    let sql = `SELECT * FROM film WHERE film_id = ${film_id}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("editFormFilm", {result});
    });
  };

  // editar pelicula
  edit = (req, res) => {
    console.log(req);
    let {titulo, description, director} = req.body;
    let {film_id, cinephile_id} = req.params;
    

    let sql = `UPDATE film SET title = "${titulo}", film_description = "${description}", director = "${director}" WHERE film_id = ${film_id}`;

    if (req.file != undefined) {
      let film_img = req.file.filename;
      sql = `UPDATE film SET title = "${titulo}", film_description = "${description}",director = "${director}", film_img = "${film_img}" WHERE film_id = ${film_id}`;
    }

    connection.query(sql, (error, result) =>{
      if (error) throw error;
      res.redirect(`/cinephile/oneCinephile/${cinephile_id}`)
    })
  }


}

module.exports = new FilmController();
