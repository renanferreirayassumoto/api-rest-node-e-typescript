import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ICidade {
  nome: string;
}

export const createValidation = validation((getSchema) => ({
	body: getSchema<ICidade>(yup.object().shape({
		nome: yup.string().strict(true).required().min(3),
	})),
}));

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
	const novaCidade = await prisma.cidade.create({
		data: req.body,
	});

	return res.status(StatusCodes.CREATED).json(novaCidade);
};