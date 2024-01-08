import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IParamProps {
  id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
	params: getSchema<IParamProps>(yup.object().shape({
		id: yup.number().integer().required().moreThan(0),
	})),
}));

export const getById = async (req: Request<IParamProps> ,res: Response) => {

	const id = Number(req.params.id);

	if(Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		errors: {
			default: 'Registro não encontrado'
		}
	});

	const cidade = await prisma.cidade.findFirst({
		where: {
			id: id,
		}
	});

	if(!cidade){
		return res.status(StatusCodes.BAD_REQUEST).send();
	}

	return res.status(StatusCodes.OK).send(cidade);

};