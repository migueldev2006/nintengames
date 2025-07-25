/**
 * @swagger
 * tags:
 *   name: Plataformas
 *   description: Gestión de consolas o plataformas
 */

/**
 * @swagger
 * /api/platforms:
 *   get:
 *     summary: Obtener todas las plataformas
 *     tags: [Plataformas]
 *     responses:
 *       200:
 *         description: Lista de plataformas

 *   post:
 *     summary: Crear una nueva plataforma
 *     tags: [Plataformas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nintendo Switch
 *     responses:
 *       201:
 *         description: Plataforma creada
 */

/**
 * @swagger
 * /api/platforms/{id}:
 *   get:
 *     summary: Obtener plataforma por ID
 *     tags: [Plataformas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Plataforma encontrada
 *       404:
 *         description: No encontrada

 *   patch:
 *     summary: Actualizar una plataforma
 *     tags: [Plataformas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: PlayStation 5
 *     responses:
 *       200:
 *         description: Plataforma actualizada

 *   delete:
 *     summary: Eliminar una plataforma
 *     tags: [Plataformas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Plataforma eliminada
 */
