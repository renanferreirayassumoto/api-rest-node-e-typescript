import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getById = async (id: number) =>{
	try{

		const result = await prisma.pessoa.findFirst({
			where: {
				id: id,
			}
		});

		if (result) {
			return result;
		}else{
			throw new Error('Registro não encontrado');
		}
	}catch(error){
		console.error(error);
		return new Error('Erro ao criar o registro');
	}
};