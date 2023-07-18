const path = require("path");

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./src/uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + extension);
        
        const filename = `${file.fieldname}-${uniqueSuffix}${extension}`
        req.body.image = `${req.protocol}://${req.get('host')}/${filename}`
    },

   
});

// Set up the multer middleware
const upload = multer({ storage: storage });

const uploadSingleImage = upload.single("image")

module.exports = {
    uploadSingleImage
}