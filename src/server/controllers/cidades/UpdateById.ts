import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { CidadesProvider } from '../../database/providers/cidades';
import { UpdateCidadeDto } from '../../database/dto/update-cidade-dto';


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
	const data: UpdateCidadeDto = req.body;

	const result = await CidadesProvider.updateById(id, data);

	if (result instanceof Error){
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			erros: {
				default: 'Erro na atualização do registro'
			}
		});
	}

	return res.status(StatusCodes.OK).send(result);


};