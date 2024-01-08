import { PrismaClient } from '@prisma/client';
import { IPessoa } from '../../models/Pessoa';

const prisma = new PrismaClient();

export const create = async (pessoa: IPessoa) =>{
	try{

		const result = await prisma.pessoa.create({
			data: pessoa,
		});

		if (result) {
			return result;
		}
	}catch(error){
		console.error(error);
		return new Error('Erro ao criar o registro');
	}
};