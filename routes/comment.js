const categoryController = require('../controllers/categoryController');
const commentController = require('../controllers/commentController');

const router = require('express').Router();

// add comment
router.post('/', commentController.addComment);
// get all categories
router.get('/', commentController.getComments);
// find one category
router.get('/find', commentController.getSpecificComment);
// update category
router.put('/update/:id', categoryController.updateACategory);
// delete category
router.delete('/delete/:id', categoryController.deleteACategory);
// delete all category
router.delete('/drop', commentController.dropComments);

module.exports = router;