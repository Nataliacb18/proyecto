var express = require('express');
var router = express.Router();
const connection = require("../config/db")

// ruta base: localhost:3000

// localhost:3000
router.get ("/", (req, res) =>{
  let sql = `SELECT * FROM cinephile WHERE cinephile_deleted = 0`;
  let sql1 = `SELECT * FROM film WHERE film_deleted = 0`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    
     connection.query(sql1, (err, resultFin) =>{
    if (err) throw err;
    res.render("home", {result, resultFin });
  })
  });
 
})

module.exports = router;
