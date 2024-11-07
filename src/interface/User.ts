export interface IEndereco {
  rua: string;
  numero: number;
  bairro: string;
}

export enum TipoUsuario {
  comum = 1,
  admin,
  superAmin,
}

export interface IAllUsers {
  message: string;
  contas: IUserModel;
}

export enum Cras {
  'Codin' = 1,
  'Custodópolis',
  'Jardim Carioca',
  'Esplanada',
  'Chatuba',
  'Matadouro',
  'Penha',
  'Goitacazes',
  'Parque Guarus',
  'Travessão',
  'Morro do Coco',
  'Farol',
  'Jockey',
  'Ururaí',
}

export interface IUserModel {
  id: string;
  name: string;
  email?: string;
  cpf: string;
  data_nascimento: string;
  password: string;
  telefone: string;
  endereco: IEndereco;
  tipo_usuario: TipoUsuario;
  cras: Cras;
  ativo: boolean;
  password_reset_token?: string;
  password_reset_expires?: Date;
  updated_at?: Date;
  [key: string]: any;
}

export enum Bairros {
  'ACAMP SEM TERRA ESTRADA LEITE',
  'ALTO DA AREIA',
  'ALTO DO ELISEU',
  'ASSENT ALELUIA',
  'ASSENT ANTONIO FARIAS',
  'ASSENT BATATAL',
  'ASSENT CAMBUCA',
  'ASSENT TERRA CONQUISTADA',
  'BABOSA',
  'BAIXA GRANDE',
  'BALANCA RANGEL',
  'BARRA DO JACARE',
  'BENTA PEREIRA',
  'BEIRA DO FAZ',
  'BEIRA DO TAI',
  'BOA VISTA',
  'BREJO GRANDE',
  'BUGALHO',
  'CABOIO',
  'CAJU',
  'CAMBAIBA',
  'CAMPELO',
  'CAMPO DE AREIA',
  'CAMPO LIMPO',
  'CAMPO NOVO',
  'CANAA',
  'CANAL DAS FLEXAS',
  'CANTAGALO',
  'CANTO DO ENGENHO',
  'CANTO DO RIO TOCOS',
  'CAPAO',
  'CARIOCA DE TOCOS',
  'CARVAO',
  'CAXETA',
  'CAXIAS DE TOCOS',
  'CAZUMBA',
  'CENTRO (OU ESPLANADA)',
  'CENTRO (OU MATADOURO)',
  'CEREJEIRA',
  'CHACARA JOAO FERREIRA',
  'CHATUBA',
  'CHAVE DO PARAISO',
  'CIPRIAO',
  'CODIN',
  'CONCEICAO DO IMBE',
  'COND SANTA ROSA',
  'COND SANTA ROSA 2',
  'COND CIDADE VERDE',
  'COND. DOS NOGUEIRAS',
  'CONSELHEIRO JOSINO',
  'COQUEIRO DE TOCOS',
  'CORREGO FUNDO',
  'CORRENTEZA',
  'CUPIM DE POÇO GORDO',
  'DIVISA',
  'DONANA',
  'DORES DE MACABU',
  'ESCOVA URUBU',
  'ESPINHO',
  'ESPIRITO SANTINHO',
  'ESTANCIA DA PENHA',
  'FAROL DE SÃO THOME',
  'FAROLZINHO',
  'FAZENDINHA',
  'GAIVOTAS',
  'GOIABA',
  'GOITACAZES',
  'GUANDU',
  'GURIRI',
  'HORTO',
  'IBITIOCA',
  'IMBE',
  'INVASÃO CIDADE LUZ',
  'ITERERE',
  'JARDIM BOA VISTA',
  'JARDIM CARIOCA',
  'JARDIM FLAMBOYANT I',
  'JARDIM FLAMBOYANT II',
  'JARDIM MARIA DE QUEIROZ',
  'JARDIM PARAISO DE TOCOS',
  'JARDIM PRIMAVERA',
  'JOAO MARIA',
  'JOCKEY CLUB',
  'JOCKEY I',
  'JOCKEY II',
  'KM 5 a 8',
  'KM 9 a 16',
  'LAGOA DAS PEDRAS',
  'LAGOA DE CIMA',
  'LAGAMAR',
  'LAPA',
  'LARGO DO GARCIA',
  'LINHA DO LIMÃO',
  'MACACO',
  'MARCELO',
  'MARRECAS',
  'MARTINS LAGE',
  'MATA DA CRUZ',
  'MATO ESCURO',
  'MATUTU',
  'MINEIROS',
  'MONTENEGRO',
  'MORADO DO ORIENTE',
  'MORANGABA',
  'MORRO DO COCO',
  'MORRO GRANDE',
  'MULACO',
  'MUNDEOS',
  'MURUNDU',
  'MUSSUREPE',
  'MUTEMA',
  'NOSSA SRA DO ROSARIO',
  'NOVA BRASILIA',
  'NOVA CANAA',
  'NOVA GOITACAZES',
  'NOVO ELDORADO',
  'NOVO JOCKEY',
  'PARQUE ALPHAVILLE',
  'PARQUE ALPHAVILLE II',
  'PARQUE ALDEIA',
  'PARQUE ALDEIA I',
  'PARQUE ALDEIA II',
  'PARQUE ANGELICA',
  'PARQUE AURORA',
  'PARQUE BARAO DO RIO BRANCO',
  'PARQUE BELA VISTA',
  'PARQUE BONSUCESSO',
  'PARQUE CALIFORNIA',
  'PARQUE CARLOS DE LACERDA',
  'PARQUE CIDADE LUZ',
  'PARQUE CONJ. SANTA MARIA',
  'PARQUE CORRIENTES',
  'PARQUE CUSTODOPOLIS',
  'PARQUE DO PRADO',
  'PARQUE DOM BOSCO',
  'PARQUE DOS RODOVIÁRIOS',
  'PARQUE DR BEDA',
  'PARQUE ELDORADO',
  'PARQUE ESPLANADA',
  'PARQUE FAZENDA GRANDE',
  'PARQUE FUNDAO',
  'PARQUE GUARUS',
  'PARQUE IMPERIAL',
  'PARQUE IPS',
  'PARQUE JD DAS ACACIAS',
  'PARQUE JD GUARUS',
  'PARQUE JARDIM AEROPORTO',
  'PARQUE JARDIM CEASA',
  'PARQUE JOAO SEIXAS',
  'PARQUE JOSE DO PATROCINIO',
  'PARQUE JULIAO NOGUEIRA',
  'PARQUE LEBRET',
  'PARQUE LEOPOLDINA',
  'PARQUE MOSTEIRO DE SÃO BENTO',
  'PARQUE NAUTICO',
  'PARQUE NITEROI',
  'PARQUE NOVA CAMPOS',
  'PARQUE NOVO MUNDO',
  'PARQUE OLIVEIRA BOTELHO',
  'PARQUE PRAZERES',
  'PARQUE PRESIDENTE VARGAS',
  'PARQUE REAL',
  'PARQUE RESIDENCIAL DA LAPA II',
  'PARQUE RES PORTO SEGURO',
  'PARQUE RES SANTO ANTONIO',
  'PARQUE RIACHUELO',
  'PARQUE ROSARIO',
  'PARQUE RUI BARBOSA',
  'PARQUE SALO BRAND',
  'PARQUE SANTA CLARA',
  'PARQUE SANTA HELENA',
  'PARQUE SANTA ROSA',
  'PARQUE SANTO AMARO',
  'PARQUE SANTO ANTONIO',
  'PARQUE SÃO BENEDITO',
  'PARQUE SÃO CAETANO',
  'PARQUE SÃO DOMINGOS',
  'PARQUE SÃO JOSE',
  'PARQUE SÃO LINO',
  'PARQUE SÃO MATHEUS',
  'PARQUE SÃO SILVESTRE',
  'PARQUE SÃO SILVANO',
  'PARQUE SANTOS DUMONT',
  'PARQUE SARAIVA',
  'PARQUE SUMARE',
  'PARQUE TAMANDARE',
  'PARQUE TARCISIO MIRANDA',
  'PARQUE TRANSMISSOR',
  'PARQUE TROPICAL',
  'PARQUE TURF CLUB',
  'PARQUE VARANDA DO VISCONDE',
  'PARQUE VERA CRUZ',
  'PARQUE VICENTE GONÇALVES DIAS',
  'PARQUE VILA MENEZES',
  'PARQUE VILA VERDE',
  'PAUS AMARELOS',
  'PECUARIA',
  'PEDRA NEGRA',
  'PENHA',
  'PERNAMBUCA',
  'PITANGUEIRA',
  'PLANICIE',
  'POÇO GORDO',
  'PONTA DA LAMA',
  'PONTA GROSSA',
  'PONTO DE COQUEIROS',
  'PONTO DO CARMO',
  'QUILOMBO',
  'QUIXABA',
  'RADIO VELHO',
  'RES. VIVENDAS DA PENHA I',
  'RES. VIVENDAS DA PENHA II',
  'RESIDENCIAL PLANICIE',
  'RETIRO',
  'RIBEIRO DO AMARO',
  'SABAO',
  'SANTA BARBARA',
  'SANTA CRUZ',
  'SANTA MARIA',
  'SANTANA',
  'SANTO AMARO DE CAMPOS',
  'SANTO EDUARDO',
  'SÃO DIOGO',
  'SÃO LUIS DE MUTUCA',
  'SÃO ROQUE',
  'SÃO MARTINHO',
  'SÃO SEBASTIÃO',
  'SENTINELA DO IMBE',
  'SERRINHA',
  'SESMARIA',
  'SOLAR DA PENHA',
  'TAPERA',
  'TERMINAL PESQUEIRO',
  'TERRA PROMETIDA',
  'TIRA GOSTO',
  'TOCAIA',
  'TOCOS',
  'TRAVESSÃO',
  'TRES VENDAS',
  'URURAI',
  'USINA SÃO JOAO',
  'USINA SANTO ANTONIO',
  'VALA DO MATO',
  'VENDA NOVA',
  'VEIGA',
  'VIANA',
  'VIEGAS',
  'VILA DO SOL',
  'VILA DOS PESCADORES',
  'VILA INDUSTRIAL',
  'VILA MANHAES',
  'VILA NOVA',
  'VILA REAL',
  'VILA ROMANA',
  'VISTA ALEGRE',
  'VIVENDAS DOS COQUEIROS',
  'VIVENDAS DOS COQUEIROS II',
  'XEXE',
  'ZUZA MOTA',
}
