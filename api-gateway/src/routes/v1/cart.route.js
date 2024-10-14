const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const cartValidation = require('../../validations/cart.validation');
const cartController = require('../../controllers/cart.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: Cart management and retrieval
 */

router
  .route('/')
  .post(auth('manageCarts'), validate(cartValidation.createCart), cartController.createCart)
  .get(auth('manageCarts'), validate(cartValidation.getCarts), cartController.getCarts);

router
  .route('/:cartId')
  .get(auth('manageCarts'), validate(cartValidation.getCart), cartController.getCart)
  .patch(auth('manageCarts'), validate(cartValidation.updateCart), cartController.updateCart)
  .delete(auth('manageCarts'), validate(cartValidation.deleteCart), cartController.deleteCart);

router.route('/').get(auth('manageCarts'), cartController.getCartByUserId);

module.exports = router;

/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Create a new cart
 *     description: Create a new cart with the specified products
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: String
 *                     quantity:
 *                       type: Number
 *             example:
 *               userId: "649876543210987654321"
 *               products:
 *                 - productId: "649876543210987654321"
 *                   quantity: 2
 *                 - productId: "649876543210987654322"
 *                   quantity: 1
 *     responses:
 *       201:
 *         description: Cart created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         $ref: '#/components/responses/DuplicateEmail'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         description: Cart not found
 *         content:
 *           application/json:    
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /carts/{cartId}:
 *   get:
 *     summary: Get a cart by ID
 *     description: Retrieve a cart by its unique identifier
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cart to retrieve
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         description: Cart not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/** 
 * @swagger
 * /carts/{userId}:
 *   get:
 *     summary: Get a cart by user ID
 *     description: Retrieve a cart by the user's unique identifier
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to retrieve the cart for
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404: 
 *         description: Cart not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /carts/{cartId}:
 *   patch:
 *     summary: Update a cart by ID
 *     description: Update a cart by its unique identifier
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cart to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *             example:
 *               userId: "649876543210987654321"
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         description: Cart not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /carts/{cartId}:
 *   delete:
 *     summary: Delete a cart by ID
 *     description: Delete a cart by its unique identifier
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart deleted successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         description: Cart not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Get all carts
 *     description: Retrieve all carts
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

