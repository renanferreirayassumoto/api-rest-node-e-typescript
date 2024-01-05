import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IParamProps {
  id?: number;
}

interface IBodyProps {
  nome: string;
}

export const updateByIdValidation = validation((getSchema) => ({
	body: getSchema<IBodyProps>(yup.object().shape({
		nome: yup.string().strict(true).required().min(3),
	})),
	params: getSchema<IParamProps>(yup.object().shape({
		id: yup.number().integer().required().moreThan(0),
	}))
}));

export const updateById = async (req: Request<IParamProps , {}, IBodyProps>, res: Response) => {

	const id = Number(req.params.id);
	const data = req.body.nome;

	if(id === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		errors: {
			default: 'Registro não encontrado'
		}
	});

	const cidadeExistente = await prisma.cidade.findFirst({
		where: {
			id: id,
		}
	});


	if(!cidadeExistente){
		return res.status(StatusCodes.NOT_FOUND).json({
			errros: {
				default: 'Registro não encontrado',
			}
		});
	}

	const cidadeAtualizada = await prisma.cidade.update({
		where: {
			id: id,
		},
		data: {
			nome: data,
		},
	});

	return res.status(StatusCodes.OK).send(cidadeAtualizada);
};