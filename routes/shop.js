const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');
const auth = require('../middleware/auth');

router.post('/create', auth, shopController.newProduct);
router.post('/edit', auth, shopController.editProduct);
router.post('/delete', auth, shopController.deleteProduct);
router.get('/getone', shopController.getOneProduct);
router.get('/list', shopController.listAll);
router.post('/addcat', auth, shopController.newCategorie);
router.get('/listcat', shopController.listCategories);
module.exports = router;