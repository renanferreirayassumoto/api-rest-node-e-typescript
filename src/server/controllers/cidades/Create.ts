import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { CidadesProvider } from '../../database/providers/cidades';
import { ICidade } from '../../database/models';

interface IBodyProps extends Omit<ICidade, 'id'> {}

export const createValidation = validation((getSchema) => ({
	body: getSchema<IBodyProps>(yup.object().shape({
		nome: yup.string().strict(true).required().min(3),
	})),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

	const novaCidade = await CidadesProvider.create(req.body);
  
	if (novaCidade instanceof Error){
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			errors: {
				default: novaCidade.message,
			}
		});
	}

	return res.status(StatusCodes.CREATED).json(novaCidade);
};