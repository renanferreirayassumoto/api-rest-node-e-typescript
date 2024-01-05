import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - Delete By Id ', () => {

	it('Deleta registro', async () => {
		const res = await testServer
			.post('/cidades')
			.send({nome: 'Campo Grande'});

		expect(res.statusCode).toEqual(StatusCodes.CREATED);

		const resApagada = await testServer
			.delete(`/cidades/${res.body}`)
			.send();

		expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
	});

	it('Tenta apagar registro que não existe', async () => {
		const res = await testServer
			.delete('/cidades/99999')
			.send();

		expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
		expect(res.body).toHaveProperty('errors.default');
	});

	it('Tenta fornecer um formato diferente de number', async () => {
		const res = await testServer
			.delete('/cidades/teste')
			.send();

		expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(res.body).toHaveProperty('errors.params.id');
	});

	it('Tenta fornecer um id com número float', async () => {
		const res = await testServer
			.delete('/cidades/1.2')
			.send();

		expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(res.body).toHaveProperty('errors.params.id');
	});
  
	it('Tenta fornecer um id nulo', async () => {
		const res = await testServer
			.delete('/cidades/0')
			.send();

		expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(res.body).toHaveProperty('errors.params.id');
	});
});