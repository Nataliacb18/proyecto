const connection = require("../config/db");
const bcrypt = require("bcrypt");

class CinephileController {
  //   Muestra una vista con un cinéfilo y sus películas
  viewOneCinephile = (req, res) => {
    let cinephile_id = req.params.cinephile_id;
    let sql1 = `SELECT * FROM cinephile WHERE cinephile_id = ${cinephile_id} AND cinephile_deleted = 0;`;
    let sql2 = `SELECT * FROM film WHERE cinephile_id = ${cinephile_id} AND film_deleted = 0;`;
    connection.query(sql1, (error1, resultCinephile) => {
      if (error1) throw error1;
      connection.query(sql2, (error2, resultFilm) => {
        if (error2) throw error2;
        res.render("oneCinephile", { resultCinephile, resultFilm });
      });
    });
  };

  // muestra la vista del registro para crear un cinefilo
  viewCinephileRegister = (req, res) => {
    res.render("register", { mensaje: "" });
  };

  // Registro de cinefilo
  cinephileRegister = (req, res) => {
    let {
      name,
      last_name,
      cinephile_description,
      phone_number,
      email,
      password,
    } = req.body;

    // encriptamos contraseña
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) throw err;

      let sql = `INSERT INTO cinephile (name, last_name, cinephile_description,phone_number,email, password) VALUES ("${name}", "${last_name}", "${cinephile_description}","${phone_number}", "${email}", "${hash}")`;

      if (req.file != undefined) {
        let img = req.file.filename;
        sql = `INSERT INTO cinephile (name, last_name, cinephile_description, phone_number, cinephile_img, email, password) VALUES ("${name}", "${last_name}", "${cinephile_description}", "${phone_number}", "${img}", "${email}", "${hash}")`;
      }

      connection.query(sql, (error, result) => {
        if (error) {
          if (error.code == "ER_DUP_ENTRY") {
            res.render("register", { mensaje: "Este e-mail ya existe" });
          } else {
            throw error;
          }
        } else {
          res.redirect("/");
        }
      });
    });
  };

  // muestra el login
  viewLogin = (req, res) => {
    res.render("login", { mensaje: "" });
  };

  //   entramos en el login

  login = (req, res) => {
    let { email, password } = req.body;
    let sql = `SELECT * FROM cinephile WHERE email = "${email}"`;
    connection.query(sql, (error, resultEmail) => {
      if (error) throw error;
      if (resultEmail.length == 1) {
        let hash = resultEmail[0].password;

        bcrypt.compare(password, hash, function (err, result) {
          if (err) throw err;

          if (result) {
            res.redirect(`/`);
          } else {
            res.render("login", {
              mensaje: "El e-mail y/o la contraseña son incorrectos",
            });
          }
        });
      } else {
        res.render("login", {
          mensaje: "El e-mail y/o la contraseña son incorrectos",
        });
      }
    });
  };

  // elimina de manera logica un cinéfilo y sus pelis
  deletedCinephile = (req, res) => {
    let cinephile_id = req.params.cinephile_id;
    let sql = `UPDATE cinephile LEFT JOIN film ON cinephile.cinephile_id = film.cinephile_id SET cinephile.cinephile_deleted = 1 , film.film_deleted = 1 WHERE cinephile.cinephile_id = ${cinephile_id};`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect("/");
    });
  };

  // vista de formulario para editar
  viewEditCinephile = (req, res) => {
    let cinephile_id = req.params.cinephile_id;
    let sql = `SELECT * FROM cinephile WHERE cinephile_id = ${cinephile_id} AND cinephile_deleted = 0`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("editFomCinephile", {result, mensaje: "" });
    });
  };

  // Editamos cinefilo
  edit = (req, res) => {
    let cinephile_id = req.params.cinephile_id;
    let {
      name,
      last_name,
      cinephile_description,
      phone_number,
      email,
      old_pass,
      new_password,
    } = req.body;

    let sqlUpdate = `UPDATE cinephile SET name = "${name}", last_name = "${last_name}", cinephile_description = "${cinephile_description}", phone_number = "${phone_number}", email = "${email}" WHERE cinephile_id = ${cinephile_id}`;

    if (req.file != undefined) {
      let cinephile_img = req.file.filename;
      sqlUpdate = `UPDATE cinephile SET name = "${name}", last_name = "${last_name}", cinephile_description = "${cinephile_description}", phone_number = "${phone_number}", email = "${email}", cinephile_img = "${cinephile_img}" WHERE cinephile_id = ${cinephile_id}`;
    }
    connection.query(sqlUpdate, (error, result1) => {
      if (error) throw error;
      console.log(result1);
    });

    if (old_pass != "" && new_password != "") {
      let sql = `SELECT * FROM cinephile WHERE cinephile_id = ${cinephile_id} AND cinephile_deleted = 0`;

      connection.query(sql, (error, result) => {
        if (error) throw error;
        let hash = result[0].password;

        bcrypt.compare(old_pass, hash, (err, resultCompare) => {
          if (resultCompare) {
            bcrypt.hash(new_password, 10, (err, new_hash) => {
              let sqlFinal = `UPDATE cinephile SET password = "${new_hash}" WHERE cinephile_id = ${cinephile_id}`;

              connection.query(sqlFinal, (finalError, finalResult) => {
                if (finalError) throw finalError;
                res.redirect(`/cinephile/oneCinephile/${cinephile_id}`);
              });
            });
          } else {
            res.render("editFomCinephile", {
              result,
              mensaje: "contraseña incorrecta",
            });
          }
        });
      });
      // return;
    } else {
      res.redirect(`/cinephile/oneCinephile/${cinephile_id}`);
    }
  };
}

module.exports = new CinephileController();
