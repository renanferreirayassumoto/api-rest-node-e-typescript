import { PrismaClient } from '@prisma/client';
import { UpdatePessoaDto } from '../../dto/update-pessoa-dto';

const prisma = new PrismaClient();

export const updateById = async (id: number, updatePessoaDto: UpdatePessoaDto) => {
	try {
		const result = await prisma.pessoa.update({
			where: { id: id },
			data: updatePessoaDto,
		});
		return result;
	} catch (error) {
		if (error){
			return error;
		}
	}
};
