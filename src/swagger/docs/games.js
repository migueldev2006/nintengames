/**
 * @swagger
 * tags:
 *   name: Juegos
 *   description: Gestión de videojuegos
 */

/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Obtener todos los videojuegos
 *     tags: [Juegos]
 *     responses:
 *       200:
 *         description: Lista de videojuegos

 *   post:
 *     summary: Crear un nuevo videojuego
 *     tags: [Juegos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               platform:
 *                 type: integer
 *               category:
 *                 type: integer
 *               year:
 *                 type: integer
 *               cover:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Videojuego creado
 */

/**
 * @swagger
 * /api/games/{id}:
 *   get:
 *     summary: Obtener videojuego por ID
 *     tags: [Juegos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Videojuego encontrado
 *       404:
 *         description: No encontrado

 *   patch:
 *     summary: Actualizar videojuego
 *     tags: [Juegos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               platform:
 *                 type: integer
 *               category:
 *                 type: integer
 *               year:
 *                 type: integer
 *               cover:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Actualizado correctamente

 *   delete:
 *     summary: Eliminar videojuego
 *     tags: [Juegos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Eliminado correctamente
 */
