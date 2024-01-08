import { PrismaClient } from '@prisma/client';
import { CreateCidadeDto } from '../../dto/create-cidade-dto';

const prisma = new PrismaClient();

export const create = async (createCidadeDto: CreateCidadeDto) =>{
	try{

		const result = await prisma.cidade.create({
			data: createCidadeDto,
		});

		if (result) {
			return result;
		}
	}catch(error){
		console.error(error);
		return new Error('Erro ao criar o registro');
	}
};