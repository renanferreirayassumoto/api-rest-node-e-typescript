import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { IUsuario } from '../../database/models';
import { UsuariosProvider } from '../../database/providers/usuarios';

interface IBodyProps extends Omit<IUsuario, 'id'> {}

export const signUpValidation = validation((getSchema) => ({
	body: getSchema<IBodyProps>(yup.object().shape({
		nome: yup.string().strict(true).required().min(3),
		email: yup.string().required().email().min(5),
		senha: yup.string().required().min(6)
	})),
}));

export const signUp = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

	const novoUsuario = await UsuariosProvider.create(req.body);
  
	if (novoUsuario instanceof Error){
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			errors: {
				default: novoUsuario.message,
			}
		});
	}

	return res.status(StatusCodes.CREATED).json(novoUsuario);
};