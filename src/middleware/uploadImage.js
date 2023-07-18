const multer = require('multer')

const APIError = require("../utils/APIError")

const storage = multer.diskStorage({
    filename(req, file, callback) {
        callback(null, file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) cb(null, true);
    else cb(new APIError("Add Only image ", 400), null);
}

const upload = multer({ fileFilter, storage });

const uploadSingleImage = (fileName) => upload.single(fileName);

// image processing
const resizeImage = asyncHandler(async (req, res, next) => {
    if (req.file) {
        const filename = `category--${uuidv4()}--${Date.now()}.jpeg`;
        await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat('jpeg')
            .jpeg({ quality: 95 })
            .toFile(`src/uploads/categories/${filename}`);

        // Save image into our db
        const api = process.env.API
        const basePath = `${req.protocol}://${req.get('host')}${api}/categories/${filename}`
        req.body.image = basePath;
    }
    next();
});

export default uploadSingleImage