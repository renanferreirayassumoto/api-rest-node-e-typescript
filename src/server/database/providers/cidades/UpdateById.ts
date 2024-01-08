import { PrismaClient } from '@prisma/client';
import { ICidade } from '../../models';

const prisma = new PrismaClient();

export const updateById = async (id: number, cidade: Omit<ICidade, 'id'>) => {
	try {
		const result = await prisma.cidade.update({
			where: { id: id },
			data: cidade,
		});
		return result;
	} catch (error) {
		if (error){
			return error;
		}
	}
};
