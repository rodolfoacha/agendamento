import { Cras } from "./User";

export interface ISchedulingModel {
  id?: number;
  name: string;
  usuario_id: string;
  servico: TipoServico;
  description: string;
  duracao_atendimento: number;
  data_hora: Date;
  cras: Cras;
  status: Status;
  message: string,
  agendamentos: []
}

export interface ISchedulingResponse {
  message: string;
  agendamentos: [];
}

export enum Status {
  cancelado = 0,
  realizado,
  pendente,
  ausente,
}

export enum TipoServico {
  cadastramento = 1,
  outros,
}
