import { TipoUsuario, Cras, IEndereco } from '../interface/User';

export type SignIn = {
	cpf: string;
	password: string;
};

export type RegisterUserModel = {
	tipo_usuario: TipoUsuario;
	cras: Cras;
	name: string;
	cpf: string;
	data_nascimento: string;
	telefone: string;
	email?: string;
	password: string;
	endereco: IEndereco;
	ativo: boolean;
};

export interface RegisterSchedullingModel {
	servico?: number;
	status?: number;
	name: string;
	cras: NonNullable<Cras>; // Ensure this matches your Yup schema type
	usuario_id: string;
	description: string;
	duracao_estimada: string;
	data_hora: string;
}

export interface ITodosBloqueiosModel {
	message: string;
	contas: BloqueioAgendamentoModel[];
}

export interface BloqueioAgendamentoModel {
	id?: string;
	usuario_id: string;
	cras: number;
	data: Date;
	tipo_bloqueio: 'matutino' | 'vespertino' | 'diario'; // Tipos de bloqueio
	motivo: string;
	ativo: boolean;
	block?: [];
}
