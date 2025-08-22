/**
 * @openapi
 * /api/property/property:
 *   get:
 *     summary: Obtiene todas las propiedades
 *     tags:
 *       - Property
 *     responses:
 *       200:
 *         description: Lista de propiedades obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: Casa en Las Vegas
 */


/**
 * @openapi
 * /api/property/property/{id}:
 *   get:
 *     summary: Obtiene una propiedad por ID
 *     tags:
 *       - Property
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la propiedad
 *     responses:
 *       200:
 *         description: Propiedad encontrada
 *       404:
 *         description: Propiedad no encontrada
 */

/**
 * @openapi
 * /api/property/property:
 *   post:
 *     summary: Crea una nueva propiedad
 *     tags:
 *       - Property
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - transaction_type
 *               - status
 *               - currency
 *               - rent_price
 *               - deposit
 *               - commission_rate
 *               - province
 *               - sector
 *               - latitude
 *               - longitude
 *               - property_type
 *             properties:
 *               title:
 *                 type: string
 *                 example: Modern Apartment in Downtown
 *               description:
 *                 type: string
 *                 example: Spacious 2-bedroom apartment with city views and modern amenities.
 *               transaction_type:
 *                 type: string
 *                 enum: [rent, sale]
 *                 example: rent
 *               status:
 *                 type: string
 *                 enum: [available, unavailable]
 *                 example: available
 *               currency:
 *                 type: string
 *                 example: USD
 *               sale_price:
 *                 type: string
 *                 example: "0.00"
 *               rent_price:
 *                 type: string
 *                 example: "1200.00"
 *               deposit:
 *                 type: string
 *                 example: "1200.00"
 *               commission_rate:
 *                 type: string
 *                 example: "5.00"
 *               province:
 *                 type: string
 *                 example: California
 *               sector:
 *                 type: string
 *                 example: Downtown
 *               latitude:
 *                 type: string
 *                 example: "34.052235"
 *               longitude:
 *                 type: string
 *                 example: "-118.243683"
 *               has_parking:
 *                 type: boolean
 *                 example: true
 *               parking_spaces:
 *                 type: integer
 *                 example: 1
 *               is_furnished:
 *                 type: boolean
 *                 example: true
 *               video_url:
 *                 type: string
 *                 format: uri
 *                 example: https://example.com/video.mp4
 *               virtual_tour_url:
 *                 type: string
 *                 format: uri
 *                 example: https://example.com/virtual-tour
 *               agent_id:
 *                 type: integer
 *                 example: 1
 *               broker_id:
 *                 type: integer
 *                 example: 1
 *               created_by:
 *                 type: integer
 *                 example: 1
 *               property_type:
 *                 type: string
 *                 example: apartment
 *     responses:
 *       201:
 *         description: Propiedad creada exitosamente
 */

/**
 * @openapi
 * /api/property/property/{id}:
 *   put:
 *     summary: Modifica una propiedad existente
 *     tags:
 *       - Property
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la propiedad a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Apartment Title
 *               rent_price:
 *                 type: string
 *                 example: "1300.00"
 *               status:
 *                 type: string
 *                 enum: [available, unavailable]
 *                 example: unavailable
 *     responses:
 *       200:
 *         description: Propiedad modificada exitosamente
 *       404:
 *         description: Propiedad no encontrada
 */

/**
 * @openapi
 * /api/property/property/{id}:
 *   delete:
 *     summary: Elimina una propiedad por ID
 *     tags:
 *       - Property
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la propiedad a eliminar
 *     responses:
 *       200:
 *         description: Propiedad eliminada exitosamente
 *       404:
 *         description: Propiedad no encontrada
 */
