import { PrismaClient } from '@prisma/client';
import { IUsuario } from '../../models';

const prisma = new PrismaClient();

export const create = async (usuario: Omit<IUsuario, 'id'>)=>{
	try{
		const result = await prisma.usuario.create({
			data: usuario,
		});

		if (result) {
			return result.id;
		}
	}catch(error){
		return new Error('Erro ao criar usuário');
	}
};