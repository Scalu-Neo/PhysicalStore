import { Router } from "express";
import storeController from '../controller/storeController';

const router = Router();

router.get('/storeNearby', storeController.GetAllStoreNearby);

/**
 * @swagger
 * /storeNearby:
 *   get:
 *     summary: Exibe as lojas mais próximas com relação ao CEP informado
 *     parameters:
 *       - in: query
 *         name: cep
 *         required: true
 *         description: O CEP para encontrar lojas próximas
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de lojas próximas
 *       500:
 *         description: Erro no servidor
 */

router.get('/allStore', storeController.GetAllStore);

/**
 * @swagger
 * /allStore:
 *   get:
 *     summary: Exibe todas as lojas registradas
 *     responses:
 *       200:
 *         description: Lista de todas as lojas
 *       500:
 *         description: Erro no servidor
 */

router.get('/getStore/:id', storeController.GetStoreById);

/**
 * @swagger
 * /getStore/{id}:
 *   get:
 *     summary: Exibe uma determinada loja selecionada pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID da loja a ser exibida
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes da loja
 *       404:
 *         description: Loja não encontrada
 */

router.post('/createStore', storeController.PostStore);

/**
 * @swagger
 * /createStore:
 *   post:
 *     summary: Cria uma nova loja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cep:
 *                 type: string
 *     responses:
 *       201:
 *         description: Loja criada com sucesso
 *       400:
 *         description: Dados inválidos
 */

router.delete('/deleteStore/:id', storeController.DeleteStoreById);

/**
 * @swagger
 * /deleteStore/{id}:
 *   delete:
 *     summary: Exclui uma loja
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID da loja a ser excluída
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Loja excluída com sucesso
 *       404:
 *         description: Loja não encontrada
 */


router.put('/updateStore/:id', storeController.UpdateStoreById);

/**
 * @swagger
 * /updateStore/{id}:
 *   put:
 *     summary: Atualiza uma loja
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID da loja a ser atualizada
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
 *                 type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   cep:
 *                     type: string
 *                   bairro:
 *                     type: string
 *                   localidade:
 *                     type: string
 *                   logradouro:
 *                     type: string
 *                   estado:
 *                     type: string
 *                   latitude:
 *                     type: number
 *                   longitude:
 *                     type: number
 *     responses:
 *       200:
 *         description: Loja atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Loja não encontrada
 */

export default router;