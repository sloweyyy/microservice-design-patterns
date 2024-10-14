const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/index');
const productController = require('../../controllers/index');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management and retrieval
 */
router
  .route('/')
  .post(auth('manageProducts'), validate(productValidation.createProduct), productController.createProduct)
  .get(auth('getProducts'), validate(productValidation.getProducts), productController.getProducts);

router
  .route('/:productId')
  .get(auth('getProducts'), validate(productValidation.getProduct), productController.getProduct)
  .patch(auth('manageProducts'), validate(productValidation.updateProduct), productController.updateProduct)
  .delete(auth('manageProducts'), validate(productValidation.deleteProduct), productController.deleteProduct);

module.exports = router;

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with the provided details
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: String
 *                 description: The name of the product
 *               description:
 *                 type: String
 *                 description: The description of the product
 *               price:
 *                 type: Number
 *                 description: The price of the product
 *               imageUrl:
 *                 type: String
 *                 description: The URL of the product image
 *             required:
 *               - name
 *               - price
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         description: Product not found
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve a product by its unique identifier
 *     tags: [Products]
 *     parameters:
 *       - name: productId
 *         in: path
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         description: Product not found
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /products/{productId}:
 *   patch:
 *     summary: Update a product by ID
 *     description: Update a product by its unique identifier
 *     tags: [Products]
 *     parameters:
 *       - name: productId
 *         in: path
 *         description: The ID of the product to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: String
 *                 description: The name of the product
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         description: Product not found
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /products/{productId}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Delete a product by its unique identifier
 *     tags: [Products]
 *     parameters:
 *       - name: productId
 *         in: path
 *         description: The ID of the product to Delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         description: Product not found
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */ 



