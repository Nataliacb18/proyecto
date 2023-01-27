var express = require('express');
var router = express.Router();
const connection = require("../config/db")

// ruta base: localhost:3000

// localhost:3000
router.get ("/", (req, res) =>{
  let sql = `SELECT * FROM cinephile WHERE cinephile_deleted = 0`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.render("home", { result });
  });
})

module.exports = router;
