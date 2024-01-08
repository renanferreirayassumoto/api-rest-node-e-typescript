import { PrismaClient } from '@prisma/client';
import { ICidade } from '../../models';

const prisma = new PrismaClient();

export const create = async (cidade: Omit<ICidade, 'id'>) =>{
	try{

		const result = await prisma.cidade.create({
			data: cidade,
		});

		if (result) {
			return result;
		}
	}catch(error){
		console.error(error);
		return new Error('Erro ao criar o registro');
	}
};