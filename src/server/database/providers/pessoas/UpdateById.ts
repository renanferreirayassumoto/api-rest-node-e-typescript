import { PrismaClient } from '@prisma/client';
import { IPessoa } from '../../models';

const prisma = new PrismaClient();

export const updateById = async (id: number, pessoa: Omit<IPessoa, 'id'>) => {
	try {
		const result = await prisma.pessoa.update({
			where: { id: id },
			data: pessoa,
		});
		return result;
	} catch (error) {
		if (error){
			return error;
		}
	}
};
