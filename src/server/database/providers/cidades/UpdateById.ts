import { PrismaClient } from '@prisma/client';
import { UpdateCidadeDto } from '../../dto/update-cidade-dto';

const prisma = new PrismaClient();

export const updateById = async (id: number, updateCidadeDto: UpdateCidadeDto) => {
	try {
		const result = await prisma.cidade.update({
			where: { id: id },
			data: updateCidadeDto,
		});
		return result;
	} catch (error) {
		if (error){
			return error;
		}
	}
};
