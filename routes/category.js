const categoryController = require('../controllers/categoryController');

const router = require('express').Router();

// add category
router.post('/', categoryController.addCategory);
// get all categories
router.get('/', categoryController.getAllCategories);
// find one category
router.get('/find', categoryController.getACategory);
router.get('/count', categoryController.getRows);
router.get('/:id',categoryController.getACategoryById);
// update category
router.put('/update/:id', categoryController.updateACategory);
// delete category
router.delete('/delete/:id', categoryController.deleteACategory);
// delete all category
router.delete('/drop', categoryController.deleteAllCategories);

module.exports = router;