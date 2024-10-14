const httpStatus = require('http-status');
const { Cart } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a cart
 * @param {Object} cartBody
 * @returns {Promise<Cart>}
 */
const createCart = async (cartBody) => {
  return Cart.create(cartBody);
};

/**
 * Query for carts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCarts = async (filter, options) => {
  const carts = await Cart.paginate(filter, options);
  return carts;
};

/**
 * Get cart by id
 * @param {ObjectId} id
 * @returns {Promise<Cart>}
 */
const getCartById = async (id) => {
  return Cart.findById(id);
};

/**
 * Get cart by user id
 * @param {ObjectId} userId
 * @returns {Promise<Cart>}
 */
const getCartByUserId = async (userId) => {
  return Cart.findOne({ userId });
};

/**
 * Update cart by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Cart>}
 */
const updateCartById = async (id, updateBody) => {
  const cart = await getCartById(id);
  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
  }
  Object.assign(cart, updateBody);
  await cart.save();
  return cart;
};

/**
 * Delete cart by id
 * @param {ObjectId} id
 * @returns {Promise<Cart>}
 */
const deleteCartById = async (id) => {
  const cart = await getCartById(id);
  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
  }
  await cart.remove();
  return cart;
};

module.exports = {
  createCart,
  queryCarts,
  getCartById,
  getCartByUserId,
  updateCartById,
  deleteCartById,
};
