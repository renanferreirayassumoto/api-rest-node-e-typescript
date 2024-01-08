import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const cidadesCampoGrande = [
	'Água Clara',
	'Alcinópolis',
	'Amambaí',
	'Anastácio',
	'Anaurilândia',
	'Angélica',
	'Antônio João',
	'Aparecida do Taboado',
	'Aquidauana',
	'Aral Moreira',
	'Bandeirantes',
	'Bataguassu',
	'Bataiporã',
	'Bela Vista',
	'Bodoquena',
	'Bonito',
	'Brasilândia',
	'Caarapó',
	'Camapuã',
	'Campo Grande',
	'Caracol',
	'Cassilândia',
	'Chapadão do Sul',
	'Corguinho',
	'Coronel Sapucaia',
	'Corumbá',
	'Costa Rica',
	'Coxim',
	'Deodápolis',
	'Dois Irmãos do Buriti',
	'Douradina',
	'Dourados',
	'Eldorado',
	'Fátima do Sul',
	'Glória de Dourados',
	'Guia Lopes da Laguna',
	'Iguatemi',
	'Inocência',
	'Itaporã',
	'Itaquiraí',
	'Ivinhema',
	'Japorã',
	'Jaraguari',
	'Jardim',
	'Jateí',
	'Juti',
	'Ladário',
	'Laguna Carapã',
	'Maracaju',
	'Miranda',
	'Mundo Novo',
	'Naviraí',
	'Nioaque',
	'Nova Alvorada do Sul',
	'Nova Andradina',
	'Novo Horizonte do Sul',
	'Paranaíba',
	'Paranhos',
	'Pedro Gomes',
	'Ponta Porã',
	'Porto Murtinho',
	'Ribas do Rio Pardo',
	'Rio Brilhante',
	'Rio Negro',
	'Rio Verde de Mato Grosso',
	'Rochedo',
	'Santa Rita do Pardo',
	'São Gabriel do Oeste',
	'Selvíria',
	'Sete Quedas',
	'Sidrolândia',
	'Sonora',
	'Tacuru',
	'Taquarussu',
	'Terenos',
	'Três Lagoas',
	'Vicentina'
];

async function seedCidades() {
	const count = await prisma.cidade.count();

	if (count === 0){
		for(const nome of cidadesCampoGrande){
			await prisma.cidade.create({
				data: {
					nome: nome,
				}
			});
		}
	}else{
		return;
	}
}

seedCidades()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});