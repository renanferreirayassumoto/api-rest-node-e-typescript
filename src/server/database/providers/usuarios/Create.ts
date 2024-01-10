import { PrismaClient } from '@prisma/client';
import { IUsuario } from '../../models';
import { PasswordCrypto } from '../../../shared/services';

const prisma = new PrismaClient();

export const create = async (usuario: Omit<IUsuario, 'id'>)=>{
	try{

		const hashedPassword = await PasswordCrypto.hashPassword(usuario.senha);

		usuario.senha = hashedPassword;

		const result = await prisma.usuario.create({
			data: usuario
		});

		if (result) {
			return result.id;
		}
	}catch(error){
		return new Error('Erro ao criar usuário');
	}
};