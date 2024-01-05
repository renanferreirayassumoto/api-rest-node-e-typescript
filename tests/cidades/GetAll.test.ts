import { testServer} from '../jest.setup';
import { StatusCodes } from 'http-status-codes';

describe('Cidades - Get All',() => {
	it('Buscar todos os registros', async () => {
    
		const res = await testServer
			.post('/cidades')
			.send({nome: 'Campo Grande'});

		expect(res.statusCode).toEqual(StatusCodes.CREATED);

		const resBuscada = await testServer
			.get('/cidades')
			.send();

		expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
		expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
		expect(resBuscada.body.length).toBeGreaterThan(0);
	});

	it('Buscar todos os registros com todos os filtros da query corretos', async () => {
		const res = await testServer
			.post('/cidades')
			.send({nome: 'Campo Grande'});

		expect(res.statusCode).toEqual(StatusCodes.CREATED);

		const resBuscada1 = await testServer
			.get('/cidades?page=10&limit=2&filter=Ca')
			.send();

		expect(resBuscada1.statusCode).toEqual(StatusCodes.OK);
		expect(resBuscada1.body[0]).toHaveProperty('nome');
	} );

	it('Tentando filtar uma page que não é do tipo number', async () => {
		const res = await testServer
			.post('/cidades')
			.send({nome: 'Campo Grande'});

		expect(res.statusCode).toEqual(StatusCodes.CREATED);

		const resBuscada = await testServer
			.get('/cidades?page=k')
			.send();

		expect(resBuscada.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(resBuscada.body).toHaveProperty('errors.query.page');

	});

	it('Tentando filtrar uma page menor que 0', async () => {
		const res = await testServer
			.post('/cidades')
			.send({nome: 'Campo Grande'});

		expect(res.statusCode).toEqual(StatusCodes.CREATED);

		const resBuscada = await testServer
			.get('/cidades?page=-2')
			.send();

		expect(resBuscada.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(resBuscada.body).toHaveProperty('errors.query.page');
	});

	it('Tentando filtar um limit que não é do tipo number', async () => {
		const res = await testServer
			.post('/cidades')
			.send({nome: 'Campo Grande'});

		expect(res.statusCode).toEqual(StatusCodes.CREATED);

		const resBuscada = await testServer
			.get('/cidades?limit=k')
			.send();

		expect(resBuscada.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(resBuscada.body).toHaveProperty('errors.query.limit');

	});

	it('Tentando filtrar um limit menor que 0', async () => {
		const res = await testServer
			.post('/cidades')
			.send({nome: 'Campo Grande'});

		expect(res.statusCode).toEqual(StatusCodes.CREATED);

		const resBuscada = await testServer
			.get('/cidades?limit=-2')
			.send();

		expect(resBuscada.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(resBuscada.body).toHaveProperty('errors.query.limit');
	});
});