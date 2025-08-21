/**
 * @openapi
 * /api/user/login:
 *   post:
 *     summary: Inicia sesión con email y contraseña
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: julian@example.com
 *               password:
 *                 type: string
 *                 example: contraseñaSegura123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     role:
 *                       type: array
 *                       items:
 *                         type: string
 *       400:
 *         description: Email y contraseña son requeridos
 *       401:
 *         description: Credenciales inválidas
 */

/**
 * @openapi
 * /api/user/user:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name_s:
 *                     type: string
 *                     example: Julian
 *                   last_name:
 *                     type: string
 *                     example: Rodriguez
 *                   m_sur_name:
 *                     type: string
 *                     example: Lopez
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: julian@example.com
 *                   role:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["admin", "editor"]
 */

/**
 * @openapi
 * /api/user/user/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @openapi
 * /api/user/user:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name_s
 *               - last_name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name_s:
 *                 type: string
 *                 example: Julian
 *               last_name:
 *                 type: string
 *                 example: Rodriguez
 *               m_sur_name:
 *                 type: string
 *                 example: Lopez
 *               email:
 *                 type: string
 *                 format: email
 *                 example: julian@example.com
 *               password:
 *                 type: string
 *                 example: contraseñaSegura123
 *               role:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [admin, agent, client]
 *                 example: ["admin"]
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name_s:
 *                   type: string
 *                   example: Julian
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: julian@example.com
 */

/**
 * @openapi
 * /api/user/user/{id}:
 *   put:
 *     summary: Modifica un usuario existente
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name_s:
 *                 type: string
 *                 example: Carlos
 *               last_name:
 *                 type: string
 *                 example: Pérez
 *               m_sur_name:
 *                 type: string
 *                 example: Gómez
 *               email:
 *                 type: string
 *                 format: email
 *                 example: carlos@example.com
 *               password:
 *                 type: string
 *                 example: nuevaContraseña456
 *               role:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["editor"]
 *     responses:
 *       200:
 *         description: Usuario modificado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @openapi
 * /api/user/user/{id}:
 *   patch:
 *     summary: Cambia la contraseña de un usuario
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 example: nuevaContraseñaSegura123
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 *       400:
 *         description: La contraseña es requerida
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @openapi
 * /api/user/user/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
