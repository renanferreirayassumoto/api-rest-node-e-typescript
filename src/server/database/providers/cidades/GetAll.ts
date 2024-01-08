import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAll = async () =>{
	try{

		const result = await prisma.cidade.findMany();

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