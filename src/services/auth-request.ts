import { api } from '../api';
import {
	SignIn,
	RegisterUserModel,
	RegisterSchedullingModel,
	BloqueioAgendamentoModel,
} from '../types/auth-data';
import { AxiosError } from 'axios';
import { IErrorResponse } from '../interface/Feedeback';
import { ISchedulingModel } from '../interface/Schedulling';
import { IAllUsers, IUserModel } from '../interface/User';

export const loginRequest = async (data: SignIn) => {
	try {
		const response = await api.post('/login', data);
		return response;
	} catch (error) {
		const errors = error as AxiosError;
		let errorMessage = '';
		if (errors.response && errors.response.data instanceof Error) {
			errorMessage = (errors.response.data as IErrorResponse).message;
			throw new Error(errorMessage);
		} else {
			throw new Error(errors?.message);
		}
	}
};

export const registerRequest = async (data: RegisterUserModel) => {
	try {
		const response = await api.post('/registerUsers', data);
		return response;
	} catch (error) {
		const errors = error as AxiosError;
		let errorMessage = '';
		if (errors.response && errors.response.data) {
			errorMessage = (errors.response.data as IErrorResponse).message;
			throw new Error(errorMessage);
		} else {
			throw new Error(errors?.message);
		}
	}
};

export const getUserCpfRequest = async (cpf: string): Promise<IAllUsers> => {
	try {
		const response = await api.get<IAllUsers>(`/private/accountByCpf/${cpf}`);
		return response.data;
	} catch (error) {
		const errors = error as AxiosError;
		let errorMessage = '';
		if (errors.response && errors.response.data) {
			errorMessage = (errors.response.data as IErrorResponse).message;
			throw new Error(errorMessage);
		} else {
			alert(errors?.message);
			throw new Error(errors?.message);
		}
	}
};

export const getUserRequest = async (id: string) => {
	try {
		const response = await api.get(`/private/accountById/${id}`);
		return response;
	} catch (error) {
		const errors = error as AxiosError;
		let errorMessage = '';
		if (errors.response && errors.response.data) {
			errorMessage = (errors.response.data as IErrorResponse).message;
			throw new Error(errorMessage);
		} else {
			throw new Error(errors?.message);
		}
	}
};

export const getAllUsersRequest = async () => {
	try {
		const response = await api.get(`/private/account`);
		return response.data;
	} catch (error) {
		const errors = error as AxiosError;
		let errorMessage = '';
		if (errors.response && errors.response.data) {
			errorMessage = (errors.response.data as IErrorResponse).message;
			throw new Error(errorMessage);
		} else {
			throw new Error(errors?.message);
		}
	}
};

export const updateUserRequest = async (id: string, updates: Partial<IUserModel>) => {
	try {
		const response = await api.put(`/private/updateAccount/${id}`, updates);
		return response;
	} catch (error) {
		const errors = error as AxiosError;
		let errorMessage = '';
		if (errors.response && errors.response.data) {
			errorMessage = (errors.response.data as IErrorResponse).message;
		} else {
			errorMessage = errors?.message || 'Erro desconhecido';
		}
		throw new Error(errorMessage);
	}
};

export const getSchedullingRequest = async () => {
	try {
		const response = await api.get(`/private/scheduling`);
		return response;
	} catch (error) {
		const errors = error as AxiosError;
		let errorMessage = '';
		if (errors.response && errors.response.data) {
			errorMessage = (errors.response.data as IErrorResponse).message;
			throw new Error(errorMessage);
		} else {
			throw new Error(errors?.message);
		}
	}
};

export const getSchedullingBlockRequest = async () => {
	try {
		const response = await api.get(`/private/block_scheduling`);
		return response;
	} catch (error) {
		const errors = error as AxiosError;
		let errorMessage = '';
		if (errors.response && errors.response.data) {
			errorMessage = (errors.response.data as IErrorResponse).message;
			throw new Error(errorMessage);
		} else {
			throw new Error(errors?.message);
		}
	}
};

export const registerSchedullingRequest = async (data: RegisterSchedullingModel) => {
	try {
		const response = await api.post('private/registerScheduling', data);
		return response;
	} catch (error) {
		const errors = error as AxiosError;
		let errorMessage = '';
		if (errors.response && errors.response.data) {
			errorMessage = (errors.response.data as IErrorResponse).message;
			throw new Error(errorMessage);
		} else {
			throw new Error(errors?.message);
		}
	}
};

export const registerSchedullingBlockRequest = async (data: BloqueioAgendamentoModel) => {
	try {
		const response = await api.post('private/registerBlock', data);
		return response;
	} catch (error) {
		const errors = error as AxiosError;
		let errorMessage = '';
		if (errors.response && errors.response.data) {
			errorMessage = (errors.response.data as IErrorResponse).message;
			throw new Error(errorMessage);
		} else {
			throw new Error(errors?.message);
		}
	}
};

export const getAllSchedullingCrasRequest = async (cras: number) => {
	try {
		const response = await api.get(`/private/crasScheduling/${cras}`);
		return response;
	} catch (error) {
		const errors = error as AxiosError;
		let errorMessage = '';
		if (errors.response && errors.response.data) {
			errorMessage = (errors.response.data as IErrorResponse).message;
			throw new Error(errorMessage);
		} else {
			throw new Error(errors?.message);
		}
	}
};

export const updateSchedulingRequest = async (
	id: number,
	usuario_id: string,
	updates: Partial<ISchedulingModel>
) => {
	try {
		const response = await api.put(
			`/private/updateScheduling/?id=${id}&usuario_id=${usuario_id}`,
			updates
		);
		return response;
	} catch (error) {
		const errors = error as AxiosError;
		let errorMessage = '';
		if (errors.response && errors.response.data) {
			errorMessage = (errors.response.data as IErrorResponse).message;
		} else {
			errorMessage = errors?.message || 'Erro desconhecido';
		}
		throw new Error(errorMessage);
	}
};

export const updateBlockRequest = async (
	id: number,
	usuario_id: string,
	updates: Partial<BloqueioAgendamentoModel>
) => {
	try {
		const response = await api.put(
			`/private/updateBlock/?id=${id}&usuario_id=${usuario_id}`,
			updates
		);
		return response;
	} catch (error) {
		const errors = error as AxiosError;
		let errorMessage = '';
		if (errors.response && errors.response.data) {
			errorMessage = (errors.response.data as IErrorResponse).message;
		} else {
			errorMessage = errors?.message || 'Erro desconhecido';
		}
		throw new Error(errorMessage);
	}
};
