import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { PessoasProvider } from '../../database/providers/pessoas';

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

	const result = await PessoasProvider.deleteById(id);

	if (result instanceof Error){
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			errors: {
				default: 'Erro ao apagar o registro'
			}
		});
	}

	return res.status(StatusCodes.OK).send();
};