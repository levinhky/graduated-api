const categoryController = require('../controllers/categoryController');

const router = require('express').Router();

// add category
router.post('/', categoryController.addCategory);
// get all categories
router.get('/', categoryController.getAllCategories);
// find one category
router.get('/find', categoryController.getACategory);
// update category
router.put('/update/:id', categoryController.updateACategory);
// delete category
router.delete('/delete/:id', categoryController.deleteACategory);

module.exports = router;