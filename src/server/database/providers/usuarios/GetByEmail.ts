import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getByEmail = async (email: string) =>{
	try{

		const result = await prisma.usuario.findFirst({
			where: {
				email: email
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