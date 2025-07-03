const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), (req, res) => {
  const filePath = path.join(__dirname, '../uploads/faqs.txt');
  fs.rename(req.file.path, filePath, (err) => {
    if (err) return res.status(500).send("Upload failed");
    res.send("File uploaded successfully");
  });
});

module.exports = router;
