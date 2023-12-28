/**
 * @swagger
 * tags:
 *  name: Option
 *  description: Option Module and Rpoutes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateOption: 
 *              type: object
 *              required:
 *                  -   title
 *                  -   key
 *                  -   type
 *                  -   category
 *              properties:
 *                  title:
 *                      type: string
 *                  key:
 *                      type: string
 *                  category:
 *                      type: string
 *                  guid:
 *                      type: string
 *                  required:
 *                      type: boolean
 *                  type:
 *                      type: string
 *                      enum:
 *                          -   number
 *                          -   string
 *                          -   boolean
 *                          -   array
 *                  enum:
 *                      type: array
 *                      items:
 *                          type: string
 */

/**
 * @swagger
 * /option/add:
 *  post:
 *   summary: create new option for category
 *   tags:
 *     -  Option
 *   requestBody:
 *         content:
 *           application/x-www-form-urlencoded:
 *                schema:
 *                   $ref: '#/components/schemas/CreateOption'
 *   responses:
 *         201:
 *           description: created!
 *                     
 */