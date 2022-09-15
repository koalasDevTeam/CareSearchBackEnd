const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploadsImages')
    },
    filename: function(req, file, cb) {
        const ext = file.originalname.split('.').pop()
        cb(null, `uimg-${Date.now()}.${ext}`)
    }
})

const uploads = multer({ storage: storage });


exports.uploads = uploads.single('dataForm');

/*exports.uploadFile = (req, res) => {
    res.send({ data: 'Enviar un archivo' });
}*/