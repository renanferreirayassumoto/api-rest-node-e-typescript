import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { CidadesProvider } from '../../database/providers/cidades';
import { ICidade } from '../../database/models';

interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<ICidade, 'id'> {}

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
	const data: IBodyProps = req.body;

	const result = await CidadesProvider.updateById(id, data);

	if (result instanceof Error){
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			errors: {
				default: 'Erro na atualização do registro'
			}
		});
	}

	return res.status(StatusCodes.OK).send(result);


};