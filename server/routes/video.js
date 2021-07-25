const express = require('express');
const router = express.Router();
// const { Video } = require("../models/Video");
const multer = require("multer");
const { auth } = require("../middleware/auth");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Data.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

const upload = multer({ storage: storage }).single("file");

//=================================
//             Video
//=================================
// index.js를 거쳐서 오기때문에 /api/video는 index.js에서 읽혔다 이미.
// => /uploadfiles만 해주면 된다.
router.post('/uploadfiles', (req, res) => { 
    // 비디오를 서버에 저장한다.
    upload(req, res, err => {
        if(err) {
            return res.json({ success: false, err})
        }
        return res.json({ success: rue, url: res.req.file.path, fileName: res.req.file.fileName })
    })
})


module.exports = router;
