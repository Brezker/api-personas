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
