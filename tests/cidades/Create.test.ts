import { StatusCodes } from 'http-status-codes';
import {testServer} from '../jest.setup';

describe('Cidades - Create', () => {

	it('Cria registro', async () => {
		const res = await testServer
			.post('/cidades')
			.send({nome: 'Campo Grande'});

		expect(res.statusCode).toEqual(StatusCodes.CREATED);
		expect(typeof res.body).toEqual('number');

	});

	it('Não pode criar um registro com nome muito curto', async () => {
		const res = await testServer
			.post('/cidades')
			.send({nome: 'Ca'});

		expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(res.body).toHaveProperty('errors.body.nome');

	});

	it('Não pode criar registro sem nome', async () => {
		const res = await testServer
			.post('/cidades')
			.send({});

		expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(res.body).toHaveProperty('errors.body.nome');
	});

	it('Não pode criar registro com nome que não é uma string', async () => {
		const res = await testServer
			.post('/cidades')
			.send({nome: 123});

		expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(res.body).toHaveProperty('errors.body.nome');
	});
});
