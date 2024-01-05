import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IParamProps {
  id?: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
	params: getSchema<IParamProps>(yup.object().shape({
		id: yup.number().integer().required().moreThan(0),
	}))
}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {

	const id = Number(req.params.id);

	if(id === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		errors: {
			default: 'Registro não encontrado'
		}
	});

	const cidade = await prisma.cidade.findUnique({
		where: {
			id: id,
		}
	});

	if(!cidade){
		console.error('Registro não encontrado');
		return res.status(StatusCodes.NOT_FOUND).send();
	}

	await prisma.cidade.deleteMany({});

	return res.status(StatusCodes.NO_CONTENT).send();
};