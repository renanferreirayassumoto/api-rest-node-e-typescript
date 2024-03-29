"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const client_1 = require("@prisma/client");
const services_1 = require("../../../shared/services");
const prisma = new client_1.PrismaClient();
const create = (usuario) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield services_1.PasswordCrypto.hashPassword(usuario.senha);
        usuario.senha = hashedPassword;
        const result = yield prisma.usuario.create({
            data: usuario
        });
        if (result) {
            return result.id;
        }
    }
    catch (error) {
        return new Error('Erro ao criar usuário');
    }
});
exports.create = create;
