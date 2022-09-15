const multer = require('multer');
const path = require('path');

function uploadImageFile() {


    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, path.join(__dirname, '../uploadsImages'))

        },
        filename: function(req, file, cb) {
            const ext = file.originalname.split('.').pop()
            cb(null, `uimg-${Date.now()}.${ext}`)
        }
    })

    const upload = multer({ storage: storage }).single('profileImage');
    return upload;
}

module.exports = uploadImageFile;