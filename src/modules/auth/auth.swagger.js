/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth Module and Routes
 */

/**
 * @swagger
 * components:
 *    schemas:
 *       SendOTP:
 *          type: object
 *          required:
 *              -  mobile
 *          properties:
 *              mobile:
 *                 type: string
 *
 */

/**
 * @swagger
 * /auth/send-otp:
 *  post:
 *    summary: Login with otp
 *    tags: [Auth]
 *    requestBody:
 *       content:
 *          application/x-www-form-urlencoded:
 *           schema:
 *               $ref: '#/components/schemas/SendOTP'
 *    responses:
 *       200:
 *         description: success
 *       400:
 *         description: bad request
 *
 *
 */
