import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { CreateCidadeDto } from '../../database/dto/create-cidade-dto';
import { CidadesProvider } from '../../database/providers/cidades';


export const createValidation = validation((getSchema) => ({
	body: getSchema<CreateCidadeDto>(yup.object().shape({
		nome: yup.string().strict(true).required().min(3),
	})),
}));

export const create = async (req: Request<{}, {}, CreateCidadeDto>, res: Response) => {

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