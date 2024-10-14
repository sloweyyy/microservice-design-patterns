const httpStatus = require('http-status');
const { Order, Cart } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create an order
 * @param {Object} orderBody
 * @returns {Promise<Order>}
 */
const createOrder = async (orderBody) => {
  const cart = await Cart.findById(orderBody.cartId);
  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
  }
  const newOrder = await Order.create({
    userId: orderBody.userId,
    products: cart.products,
    paymentDetails: orderBody.paymentDetails,
    status: 'pending',
  });
  await cart.remove();
  return newOrder;
};

/**
 * Query for orders
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryOrders = async (filter, options) => {
  const orders = await Order.paginate(filter, options);
  return orders;
};

/**
 * Get order by id
 * @param {ObjectId} id
 * @returns {Promise<Order>}
 */
const getOrderById = async (id) => {
  return Order.findById(id);
};

/**
 * Update order by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Order>}
 */
const updateOrderById = async (id, updateBody) => {
  const order = await getOrderById(id);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  Object.assign(order, updateBody);
  await order.save();
  return order;
};

/**
 * Delete order by id
 * @param {ObjectId} id
 * @returns {Promise<Order>}
 */
const deleteOrderById = async (id) => {
  const order = await getOrderById(id);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  await order.remove();
  return order;
};

module.exports = {
  createOrder,
  queryOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
};

