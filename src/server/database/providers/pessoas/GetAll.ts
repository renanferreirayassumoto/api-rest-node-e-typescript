import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAll = async (page: number, limit: number, filter: string) =>{
	try{

		const result = await prisma.pessoa.findMany({
			where: {
				nomeCompleto: {
					contains: filter,
				},
			},
			skip: (page - 1) * limit,
			take: limit,
		});

		if (result) {
			return result;
		}else{
			throw new Error('Registros não encontrados');
		}
	}catch(error){
		console.error(error);
		return new Error('Erro ao consultar os registros');
	}
};