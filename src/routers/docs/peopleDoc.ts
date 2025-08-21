/**
 * @openapi
 * /api/people/personas:
 *   get:
 *     summary: Obtiene todas las personas
 *     tags:
 *       - Personas
 *     responses:
 *       200:
 *         description: Lista de personas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                     example: Juan
 */


/**
 * @openapi
 * /api/people/personas/{id}:
 *   get:
 *     summary: Obtiene una persona por ID
 *     tags:
 *       - Personas
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la persona
 *     responses:
 *       200:
 *         description: Persona encontrada
 *       404:
 *         description: Persona no encontrada
 */

/**
 * @openapi
 * /api/people/personas:
 *   post:
 *     summary: Crea una nueva persona
 *     tags:
 *       - Personas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - edad
 *               - correo
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Julian
 *               edad:
 *                 type: integer
 *                 example: 25
 *               correo:
 *                 type: string
 *                 format: email
 *                 example: juli@example.com
 *     responses:
 *       201:
 *         description: Persona creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   example: Ana López
 *                 edad:
 *                   type: integer
 *                   example: 28
 *                 correo:
 *                   type: string
 *                   format: email
 *                   example: ana@example.com
 */

/**
 * @openapi
 * /api/people/personas/{id}:
 *   put:
 *     summary: Modifica una persona existente
 *     tags:
 *       - Personas
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la persona a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Carlos
 *               edad:
 *                 type: integer
 *                 example: 22
 *               correo:
 *                 type: string
 *                 format: email
 *                 example: carlos@example.com
 *     responses:
 *       200:
 *         description: Persona modificada exitosamente
 *       404:
 *         description: Persona no encontrada
 */

/**
 * @openapi
 * /api/people/personas/{id}:
 *   delete:
 *     summary: Elimina una persona por ID
 *     tags:
 *       - Personas
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la persona a eliminar
 *     responses:
 *       200:
 *         description: Persona eliminada exitosamente
 *       404:
 *         description: Persona no encontrada
 */
