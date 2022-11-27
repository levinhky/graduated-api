const orderController = require('../controllers/orderController');

const router = require('express').Router();

// add order
router.post('/', orderController.createOrder);
//get all order
router.get('/', orderController.getAllOrder);
// get order by id
router.get('/:id', orderController.getAnOrder);
// update an order
router.put('/update/:id', orderController.updateAnOrder);
// delete an order
router.delete('/delete/:id', orderController.deleteAnOrder);

module.exports = router;