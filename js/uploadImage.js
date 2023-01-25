const multer = require("multer")
const path = require('path');
const fs = require('fs');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "../../imgs/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${req.query.driverId}-${file.fieldname}.${file.originalname.split(".").pop()}`);
    }
})

let uploadFile = multer({ storage: storage });

let multipleUpload = uploadFile.fields([{ name: "file1" }, { name: "file2" }, { name: "file3" }])

const uploading = (req, res, next) => {
    const directoryPath = path.join(__dirname, '../imgs/uploads');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach((file) => {
            if (file.includes(req.query.driverId)) {
                fs.unlink(`${__dirname}../../imgs/uploads/${file}`, (err) => {})
            }
        });
        multipleUpload(req, res, next)
    });
}

module.exports = uploading;