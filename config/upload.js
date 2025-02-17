const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "p_image") {
            cb(null, './uploads/product');  
        } else if (file.fieldname === "admin_profile") {  
            cb(null, './uploads/profile');
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 10 }, // 10 MB limit
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
});

function checkFileType(file, cb) {
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg+xml']; // Corrected file types
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

module.exports = upload;
