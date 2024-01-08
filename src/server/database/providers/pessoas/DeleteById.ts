import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const deleteById = async (id: number) =>{
	try{

		const result = await prisma.pessoa.delete({
			where: {
				id: id
			}
		});
		return result;
	}catch(error){
		if(error){
			return error;
		}
	}
};