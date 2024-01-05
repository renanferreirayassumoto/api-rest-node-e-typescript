import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - Get By Id ', () => {

	it('Busca um registro por id', async () => {
		const res = await testServer
			.post('/cidades')
			.send({nome: 'Campo Grande'});

		expect(res.statusCode).toEqual(StatusCodes.CREATED);

		const resBuscada = await testServer
			.get(`/cidades/${res.body}`)
			.send();

		expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
		expect(resBuscada.body).toHaveProperty('nome');
	});

	it('Tenta buscar registro que não existe', async () => {
		const res = await testServer
			.get('/cidades/99999')
			.send();

		expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
		expect(res.body).toHaveProperty('errors.default');
	});

	it('Tenta buscar registro por um formato que não seja number', async() => {
		const res = await testServer
			.get('/cidades/teste')
			.send();

		expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(res.body).toHaveProperty('errors.params.id');
	});

	it('Tenta buscar id do tipo float', async () => {
		const res = await testServer
			.get('/cidades/1.2')
			.send();

		expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(res.body).toHaveProperty('errors.params.id');
	});

	it('Tenta buscar id com valor 0', async () => {
		const res = await testServer
			.get('/cidades/0')
			.send();

		expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(res.body).toHaveProperty('errors.params.id');
	});
});