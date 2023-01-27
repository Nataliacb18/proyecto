//requerimos la libreria
const multer = require("multer");

//lo metemos en una funcion para poder usarla
let uploadImage = (carpeta) => {
    const storage = multer.diskStorage({
    // dónde queremos guardar los archivos
    destination:`public/images/${carpeta}`,
    // creamos un nombre único para los archivos cargados
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

        //Sacamos la extension del archivo del nombre original
        let prueba1 = file.originalname.split(".");
        let extension = prueba1[prueba1.length - 1];


        //concatenamos todas las partes del nuevo nombre
      cb(null, uniqueSuffix + "." + extension);
    }
  });

  const upload = multer({ storage: storage }).single("img");
  return upload;
}

module.exports = uploadImage;