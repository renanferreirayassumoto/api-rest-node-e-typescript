import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - Update By Id ', () => {

	it('Atualiza registro', async () => {
		const res = await testServer
			.post('/cidades')
			.send({nome: 'Campo Grande'});

		expect(res.statusCode).toEqual(StatusCodes.CREATED);

		const resAtualizada = await testServer
			.put(`/cidades/${res.body}`)
			.send({nome: 'Campo'});

		expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
	});

	it('Tenta atualizar registro que não existe', async () => {
		const res = await testServer
			.put('/cidades/99999')
			.send({nome: 'Campo'});

		expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
		expect(res.body).toHaveProperty('errors.default');
	});

	it('Tenta atualizar registro com id igual a 0', async () => {
		const res = await testServer
			.put('/cidades/0')
			.send({nome: 'Campo'});

		expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(res.body).toHaveProperty('errors.params.id');
	});

	it('Tenta atualizar um id que não é do tipo integer', async () => {
		const res = await testServer
			.put('/cidades/1.2')
			.send({nome: 'Campo Grande'});

		expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(res.body).toHaveProperty('errors.params.id');
	});

	it('Tenta atualizar um registro com um nome muito curto', async() => {
		const res = await testServer
			.post('/cidades')
			.send({nome: 'Campo Grande'});

		expect(res.statusCode).toEqual(StatusCodes.CREATED);

		const resAtualizada = await testServer
			.put(`/cidades/${res.body}`)
			.send({nome: 'Ca'});

		expect(resAtualizada.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(resAtualizada.body).toHaveProperty('errors.body.nome');
	});

	it('Tenta atualizar registro com nome que não é uma string', async() => {
		const res = await testServer
			.post('/cidades')
			.send({nome: 'Campo Grande'});

		expect(res.statusCode).toEqual(StatusCodes.CREATED);

		const resAtualizada = await testServer
			.put(`/cidades/${res.body}`)
			.send({nome: 1});

		expect(resAtualizada.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(resAtualizada.body).toHaveProperty('errors.body.nome');
	});

});