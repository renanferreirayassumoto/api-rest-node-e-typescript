"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("./../controllers");
const middleware_1 = require("../shared/middleware");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const router = (0, express_1.Router)();
exports.router = router;
const swaggerOptions = {
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
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
router.use('/doc', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
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
router.get('/cidades', middleware_1.ensureAuthenticated, controllers_1.CidadesController.getAllValidation, controllers_1.CidadesController.getAll);
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
router.get('/cidades/:id', middleware_1.ensureAuthenticated, controllers_1.CidadesController.getByIdValidation, controllers_1.CidadesController.getById);
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
router.post('/cidades', middleware_1.ensureAuthenticated, controllers_1.CidadesController.createValidation, controllers_1.CidadesController.create);
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
router.put('/cidades/:id', middleware_1.ensureAuthenticated, controllers_1.CidadesController.updateByIdValidation, controllers_1.CidadesController.updateById);
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
router.delete('/cidades/:id', middleware_1.ensureAuthenticated, controllers_1.CidadesController.deleteByIdValidation, controllers_1.CidadesController.deleteById);
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
router.get('/pessoas', middleware_1.ensureAuthenticated, controllers_1.PessoasController.getAllValidation, controllers_1.PessoasController.getAll);
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
router.get('/pessoas/:id', middleware_1.ensureAuthenticated, controllers_1.PessoasController.getByIdValidation, controllers_1.PessoasController.getById);
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
router.post('/pessoas', middleware_1.ensureAuthenticated, controllers_1.PessoasController.createValidation, controllers_1.PessoasController.create);
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
router.put('/pessoas/:id', middleware_1.ensureAuthenticated, controllers_1.PessoasController.updateByIdValidation, controllers_1.PessoasController.updateById);
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
router.delete('/pessoas/:id', middleware_1.ensureAuthenticated, controllers_1.PessoasController.deleteByIdValidation, controllers_1.PessoasController.deleteById);
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
router.post('/entrar', controllers_1.UsuariosController.signInValidation, controllers_1.UsuariosController.signIn);
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
router.post('/cadastrar', controllers_1.UsuariosController.signUpValidation, controllers_1.UsuariosController.signUp);
router.get('/', (_, res) => {
    return res.send('API Rest Node Typescript JWT!');
});
