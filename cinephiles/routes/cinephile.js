var express = require('express');
const multer = require ("../middleware/multer");
var router = express.Router();
const cinephileController = require("../controllers/cinephileController")

// Ruta base: localhost:3000/cinephile

// localhost:3000/cinephile/oneCinephile/:cinephile_id
router.get("/oneCinephile/:cinephile_id", cinephileController.viewOneCinephile);

// localhost:3000/cinephile/register/:cinephile_id
router.get("/register", cinephileController.viewCinephileRegister);

// localhost:3000/cinephile/register/:cinephile_id
router.post("/register",multer("cinephile"), cinephileController.cinephileRegister)

// localhost:3000/cinephile/login
router.get("/login", cinephileController.viewLogin);

// localhost:3000/cinephile/login
router.post("/login", cinephileController.login);

// localhost:3000/cinephile/deleted/:cinephile_id
router.get("/deleted/:cinephile_id", cinephileController.deletedCinephile);

// localhost:3000/cinephile/edit/:cinephile_id
router.get("/edit/:cinephile_id", cinephileController.viewEditCinephile);

// localhost:3000/cinephile/edit/:cinephile_id
router.post("/edit/:cinephile_id", multer("cinephile"), cinephileController.edit);
module.exports = router;


module.exports = router;