import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const count = async (filter = '') =>{
	try{

		const count = await prisma.pessoa.count({
			where: {
				nomeCompleto: {
					contains: filter
				}
			}
		});

		if (Number.isInteger(Number(count))) return Number(count);

		return new Error('Erro ao consultar a quantidade total de registros');
	} catch (error) {
		console.log(error);
		return new Error('Erro ao consultar a quantidade total de registros');
	}
};