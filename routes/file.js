const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file');
const auth = require('../middleware/auth');

router.post('/uploadfile', auth, fileController.upload);
router.get('/getfile', fileController.getFile);
router.get('/listfile', auth, fileController.listFiles);
router.post('/delete', auth, fileController.delete);

module.exports = router;