import { Router } from 'express';
import {CidadesController, PessoasController, UsuariosController} from './../controllers';
import { ensureAuthenticated } from '../shared/middleware';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const router = Router();

const options = {
	swaggerDefinition: {
		info: {
			title: 'Api JWT',
			description: 'Api Node e JWT',
			version: '1',
			contact: {
				name: 'Renan Ferreira'
			},
			servers: ['http://localhost:3333']
		},
		securityDefinitions: {
			jwt: {
				type: 'apiKey',
				name: 'Authorization',
				in: 'header',
				description: 'Bearer token'
			}
		}
	},
	apis: ['build/server/routes/*.js'],
	security: [
		{
			jwt: []
		}
	]
};

const specs = swaggerJsDoc(options);
router.use('/doc', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * tags:
 *   - name: Cidades
 *     description: Operações relacionadas a cidades
 *   - name: Pessoas
 *     description: Operações relacionadas a pessoas
 *   - name: Autenticação
 *     description: Operações relacionadas a autenticação
 */

/**
 * @swagger
 * /cidades:
 *   get:
 *     security:
 *       - jwt: []
 *     summary: Obter todas as cidades
 *     tags: [Cidades]
 *     responses:
 *       '200':
 *         description: Sucesso
 *         content:
 *           application/json:
 *             example: { message: 'Lista de cidades obtida com sucesso.' }
 */
router.get('/cidades', ensureAuthenticated, CidadesController.getAllValidation, CidadesController.getAll);

/**
 * @swagger
 * /cidades/{id}:
 *   get:
 *     security:
 *       - jwt: []
 *     summary: Obter uma cidade por ID
 *     tags: [Cidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da cidade a ser obtida
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Sucesso
 *         content:
 *           application/json:
 *             example: { id: '123', nome: 'Cidade A' }
 *       '404':
 *         description: Cidade não encontrada
 *         content:
 *           application/json:
 *             example: { message: 'Cidade não encontrada.' }
 */
router.get('/cidades/:id' ,ensureAuthenticated,CidadesController.getByIdValidation, CidadesController.getById);

/**
 * @swagger
 * /cidades:
 *   post:
 *     security:
 *       - jwt: []
 *     summary: Criar nova cidade
 *     tags: [Cidades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *           example: 
 *             nome: "Inserir nome aqui"
 *     responses:
 *       '201':
 *         description: Cidade criada com sucesso
 *       '400':
 *         description: Dados inválidos ou ausentes
 *         content:
 *           application/json:
 *             example: { message: 'Dados inválidos ou ausentes.' }
 *       '500':
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             example: { message: 'Erro interno no servidor.' }
 */

router.post('/cidades' ,ensureAuthenticated,CidadesController.createValidation, CidadesController.create);

/**
 * @swagger
 * /cidades/{id}:
 *   put:
 *     security:
 *       - jwt: []
 *     summary: Atualizar uma cidade por ID
 *     tags: [Cidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da cidade a ser atualizada
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *           example:
 *             nome: "Nome novo da cidade irá ser atualizada"
 *     responses:
 *       '200':
 *         description: Cidade atualizada com sucesso
 */


router.put('/cidades/:id' ,ensureAuthenticated,CidadesController.updateByIdValidation, CidadesController.updateById);

/**
 * @swagger
 * /cidades/{id}:
 *   delete:
 *     security:
 *       - jwt: []
 *     summary: Deletar uma cidade por ID
 *     tags: [Cidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da cidade a ser excluída
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Cidade apagada com sucesso
 *       '401':
 *         description: Sem token de acesso
 *       '500':
 *         description: Erro ao apagar do registro
 */

router.delete('/cidades/:id' ,ensureAuthenticated,CidadesController.deleteByIdValidation, CidadesController.deleteById);


/**
 * @swagger
 * /pessoas:
 *   get:
 *     security:
 *       - jwt: []
 *     summary: Obter todas as pessoas
 *     tags: [Pessoas]
 *     responses:
 *       '200':
 *         description: Sucesso
 *         content:
 *           application/json:
 *             example: { message: 'Lista de pessoas obtida com sucesso.' }
 */
router.get('/pessoas' ,ensureAuthenticated,PessoasController.getAllValidation, PessoasController.getAll);

/**
 * @swagger
 * /pessoas/{id}:
 *   get:
 *     security:
 *       - jwt: []
 *     summary: Obter uma pessoa por ID
 *     tags: [Pessoas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da pessoa a ser obtida
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Sucesso
 *         content:
 *           application/json:
 *             example: { id: '123', nomeCompleto: 'Pessoa A', email: 'pessoa@email.com.br', cidadeId: '1' }
 *       '404':
 *         description: Cidade não encontrada
 *         content:
 *           application/json:
 *             example: { message: 'Pessoa não encontrada.' }
 */
router.get('/pessoas/:id' ,ensureAuthenticated,PessoasController.getByIdValidation, PessoasController.getById);

/**
 * @swagger
 * /pessoas:
 *   post:
 *     security:
 *       - jwt: []
 *     summary: Criar nova pessoa
 *     tags: [Pessoas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomeCompleto:
 *                 type: string
 *               email:
 *                 type: string
 *               cidadeId:
 *                 type: integer
 *           example: 
 *             nomeCompleto: "Inserir nome completo aqui"
 *             email: "Inserir email aqui"
 *             cidadeId: "Inserir ID da cidade vinculada a pessoa"
 *     responses:
 *       '201':
 *         description: Pessoa criada com sucesso
 *       '400':
 *         description: Dados inválidos ou ausentes
 *         content:
 *           application/json:
 *             example: { message: 'Dados inválidos ou ausentes.' }
 *       '500':
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             example: { message: 'Erro interno no servidor.' }
 */
router.post('/pessoas' ,ensureAuthenticated,PessoasController.createValidation, PessoasController.create);

/**
 * @swagger
 * /pessoas/{id}:
 *   put:
 *     security:
 *       - jwt: []
 *     summary: Atualizar uma pessoa por ID
 *     tags: [Pessoas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da pessoa a ser atualizada
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomeCompleto:
 *                 type: string
 *               email:
 *                 type: string
 *               cidadeId:
 *                 type: integer
 *           example:
 *             nomeCompleto: "Nome novo da pessoa que irá ser atualizada"
 *             email: "Email novo da pessoa que irá ser atualizada"
 *             cidadeId: "ID novo da cidade da pessoa que irá ser atualizada"
 *     responses:
 *       '200':
 *         description: Cidade atualizada com sucesso
 *       '400':
 *         description: Ausência de campos obrigatórios para update
 */
router.put('/pessoas/:id' ,ensureAuthenticated,PessoasController.updateByIdValidation, PessoasController.updateById);

/**
 * @swagger
 * /pessoas/{id}:
 *   delete:
 *     security:
 *       - jwt: []
 *     summary: Deletar uma pessoa por ID
 *     tags: [Pessoas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da pessoa a ser excluída
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Pessoa apagada com sucesso
 *       '401':
 *         description: Sem token de acesso
 *       '500':
 *         description: Erro ao apagar do registro
 */

router.delete('/pessoas/:id' ,ensureAuthenticated,PessoasController.deleteByIdValidation, PessoasController.deleteById);

/**
 * @swagger
 * /entrar:
 *   post:
 *     summary: Entrar na aplicação
 *     tags: 
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               senha:
 *                 type: string
 *           example:
 *             email: "usuario@example.com"
 *             senha: "senha123"
 *     responses:
 *       '200':
 *         description: Autenticação bem-sucedida
 *       '401':
 *         description: Credenciais inválidas
 *       '500':
 *         description: Erro interno no servidor
 */
router.post('/entrar' ,UsuariosController.signInValidation, UsuariosController.signIn);

/**
 * @swagger
 * /cadastrar:
 *   post:
 *     summary: Cadastrar na aplicação
 *     tags: 
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               senha:
 *                 type: string
 *               nome:
 *                 type: string
 *           example:
 *             email: "usuario@example.com"
 *             senha: "senha123"
 *             nome: "Teste Teste"
 *     responses:
 *       '200':
 *         description: Criação bem-sucedida
 *       '401':
 *         description: Credenciais inválidas
 *       '500':
 *         description: Erro interno no servidor
 */
router.post('/cadastrar' ,UsuariosController.signUpValidation, UsuariosController.signUp);

router.get('/', (_, res) => {
	return res.send('API Rest Node Typescript JWT!');
});

export { router };
