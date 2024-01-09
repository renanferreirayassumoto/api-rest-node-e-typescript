import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getById = async (id: number) =>{
	try{

		const result = await prisma.cidade.findFirst({
			where: {
				id: id
			}
		});

		if (result) {
			return result;
		}else{
			throw new Error('Registro não encontrado');
		}
	}catch(error){
		return new Error('Erro ao consultar o registro');
	}
};