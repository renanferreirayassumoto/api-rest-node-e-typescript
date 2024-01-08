import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { CidadesProvider } from '../../database/providers/cidades';

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

	const result = await CidadesProvider.deleteById(id);

	if (result instanceof Error){
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			erros: {
				default: 'Erro na atualização do registro'
			}
		});
	}

	return res.status(StatusCodes.OK).send();
};