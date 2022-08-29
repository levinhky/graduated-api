const productController = require('../controllers/productController');

const router = require('express').Router();

// ADD PRODUCT
router.post('/', productController.addProduct);
// GET ALL PRODUCT
router.get('/', productController.getAllProducts);
//GET A PRODUCT
router.get('/find', productController.getAProduct);
// UPDATE A PRODUCT
router.put('/update/:id', productController.updateAProduct);
// DELETE A PRODUCT
router.delete('/delete/:id', productController.deleteAProduct);
// DELETE ALL PRODUCT
router.delete('/drop',productController.deleteAllProducts);

module.exports = router;