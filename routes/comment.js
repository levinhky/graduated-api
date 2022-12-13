const commentController = require('../controllers/commentController');

const router = require('express').Router();

// add comment
router.post('/', commentController.addComment);
// get all comment
router.get('/', commentController.getComments);
// find comment by id
router.get('/:id', commentController.getSpecificComment);
// get comment by product
router.get('/find/:id', commentController.getCommentByProduct);
// update comment
router.put('/update/:id', commentController.updateAComment);
// delete comment
router.delete('/delete/:id', commentController.deleteAComment);
// delete all comment
router.delete('/drop', commentController.dropComments);

module.exports = router;