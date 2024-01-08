import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { PessoasProvider } from '../../database/providers/pessoas';
import { IPessoa } from '../../database/models';

interface IBodyProps extends Omit<IPessoa, 'id'> {}

export const createValidation = validation((getSchema) => ({
	body: getSchema<IBodyProps>(yup.object().shape({
		email: yup.string().required().email(),
		cidadeId: yup.number().integer().required().min(1),
		nomeCompleto: yup.string().required().min(3)
	})),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

	const novaPessoa = await PessoasProvider.create(req.body);
  
	if (novaPessoa instanceof Error){
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			errors: {
				default: novaPessoa.message,
			}
		});
	}

	return res.status(StatusCodes.CREATED).json(novaPessoa);
};