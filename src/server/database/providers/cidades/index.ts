import * as getById from './GetById';
import * as getAll from './GetAll';
import * as create from './Create';
import * as deleteById from './DeleteById';
import * as updateById from './UpdateById';

export const CidadesProvider = {
	...getById,
	...getAll,
	...create,
	...deleteById,
	...updateById
};