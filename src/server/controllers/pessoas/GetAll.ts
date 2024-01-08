import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { PessoasProvider } from '../../database/providers/pessoas';

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
	query: getSchema<IQueryProps>(yup.object().shape({
		page: yup.number().optional().moreThan(0),
		limit: yup.number().optional().moreThan(0),
		filter: yup.string().strict(true).optional(),
	})),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {

	const cidades = await PessoasProvider.getAll(req.query.page || 1, req.query.limit || 7, req.query.filter || '');
	const count = await PessoasProvider.count(req.query.filter);

	if (cidades instanceof Error){
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			errors: {
				default: cidades.message,
			}
		});
	}else if(count instanceof Error){
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			errors: {
				default: count.message,
			}
		});
	}
	res.setHeader('access-control-expose-headers', 'x-total-count');
	res.setHeader('x-total-count', 1);

	return res.status(StatusCodes.OK).json(cidades);
};