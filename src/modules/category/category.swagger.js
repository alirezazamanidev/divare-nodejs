
/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category module and Route
 * 
 */

/**
 * @swagger
 * components:
 *    schemas:
 *        CreateCategory:
 *            type: object
 *            required:
 *                -  name
 *                -  icon
 *            properties:
 *                name:
 *                   type: string
 *                slug:
 *                   type: string
 *                icon: 
 *                   type: string
 *                parent:
 *                   type: string
 */

/**
 * @swagger
 * /category/add:
 *  post:
 *    tags: [Category]
 *    summary: create new category
 *    requestBody:
 *        content:
 *            application/x-www-form-urlencoded:
 *               schema:
 *                   $ref: '#/components/schemas/CreateCategory'
 *    responses:
 *          201:
 *            descreiption: created
 *    
 */

/**
 * @swagger
 * /category/list:
 *  get:
 *   tags: [Category]
 *   summary: Get All categories
 *   responses:
 *       200: 
 *        description: success
 *                    
 */

/**
 * @swagger
 * /category/{cateId}:
 *   delete:
 *    tags: [Category]
 *    summary: Delete one Category
 *    parameters:
 *        -  in: path
 *           name: cateId
 *           type: string
 *           description: Enter category Id 
 *           required: true
 *    responses:
 *        200:
 *         descreiption: success
 */