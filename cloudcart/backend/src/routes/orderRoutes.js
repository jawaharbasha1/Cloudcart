const express = require('express');
const {
  getOrders,
  getMyOrders,
  getOrder,
  createOrder,
  updateOrderStatus
} = require('../controllers/orderController');

const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router
  .route('/')
  .get(protect, authorize('admin'), getOrders)
  .post(protect, createOrder);

router.route('/myorders').get(protect, getMyOrders);

router.route('/:id').get(protect, getOrder);

router.route('/:id/status').put(protect, authorize('admin'), updateOrderStatus);

module.exports = router;
