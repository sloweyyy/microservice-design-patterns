const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { cartService } = require('../services');

const createCart = catchAsync(async (req, res) => {
  const cart = await cartService.createCart(req.body);
  res.status(httpStatus.CREATED).send(cart);
});

const getCarts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['userId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await cartService.queryCarts(filter, options);
  res.send(result);
});

const getCart = catchAsync(async (req, res) => {
  const cart = await cartService.getCartById(req.params.cartId);
  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
  }
  res.send(cart);
});

const getCartByUserId = catchAsync(async (req, res) => {
  const cart = await cartService.getCartByUserId(req.user.id);
  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
  }
  res.send(cart);
});

const updateCart = catchAsync(async (req, res) => {
  const cart = await cartService.updateCartById(req.params.cartId, req.body);
  res.send(cart);
});

const deleteCart = catchAsync(async (req, res) => {
  await cartService.deleteCartById(req.params.cartId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCart,
  getCarts,
  getCart,
  getCartByUserId,
  updateCart,
  deleteCart,
};
