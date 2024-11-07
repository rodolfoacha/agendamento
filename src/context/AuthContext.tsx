import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useState, useCallback } from 'react';
import { IAuthContext, IAuthProvider, IPayload } from '../interface/AuthProps';
import {
	SignIn,
	RegisterUserModel,
	RegisterSchedullingModel,
	BloqueioAgendamentoModel,
	ITodosBloqueiosModel,
} from '../types/auth-data';
import {
	loginRequest,
	registerRequest,
	getAllUsersRequest,
	updateUserRequest,
	getSchedullingRequest,
	registerSchedullingRequest,
	getAllSchedullingCrasRequest,
	updateSchedulingRequest,
	updateBlockRequest,
	getUserCpfRequest,
	registerSchedullingBlockRequest,
	getSchedullingBlockRequest,
} from '../services/auth-request';
import { IAllUsers, IUserModel } from '../interface/User';
import { ISchedulingModel } from '../interface/Schedulling';

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
	const [payload, setPayload] = useState<IPayload | null>(null);
	const [cpfData, setCpfData] = useState<any>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [datasBloqueadas, setDatasBloqueadas] = useState<BloqueioAgendamentoModel | null>(null);

	const getUserFromToken = (token: string) => {
		try {
			const decoded = jwtDecode<any>(token);
			return decoded;
		} catch (error) {
			return null;
		}
	};

	const getByCpf = async (cpf: string) => {
		const data = await getUserCpfRequest(cpf);
		setCpfData(data.contas);
	};

	const getToken = useCallback(async () => {
		const token = localStorage.getItem('token');
		if (token) {
			const payload = getUserFromToken(token);
			if (payload) {
				setToken(token);
				setPayload(payload);
				setIsAuthenticated(true);
				axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
			} else {
				localStorage.removeItem('token');
				setToken(null);
				setPayload(null);
				setIsAuthenticated(false);
				delete axios.defaults.headers.common['Authorization'];
			}
		}
	}, []);

	useEffect(() => {
		getToken();
	}, [token, getToken]);

	const signIn = async ({ cpf, password }: SignIn) => {
		const { data } = await loginRequest({ cpf, password });
		const { token } = data;
		localStorage.setItem('token', token);
		setToken(token);
		setPayload(getUserFromToken(token));
	};

	const registerUser = async ({
		cpf,
		cras,
		data_nascimento,
		email,
		endereco,
		name,
		password,
		telefone,
		tipo_usuario,
		ativo: status,
	}: RegisterUserModel) => {
		await registerRequest({
			cpf,
			cras,
			data_nascimento,
			email,
			endereco,
			name,
			password,
			telefone,
			tipo_usuario,
			ativo: status,
		});
	};

	const getAllUsers = async (): Promise<IAllUsers> => {
		const data = await getAllUsersRequest();
		return data;
	};

	const updateUser = async (id: string, updates: Partial<IUserModel>) => {
		await updateUserRequest(id, updates);
	};

	const registerSchedulling = async ({
		name,
		usuario_id,
		servico,
		description,
		duracao_estimada,
		data_hora,
		cras,
		status,
	}: RegisterSchedullingModel) => {
		await registerSchedullingRequest({
			name,
			usuario_id,
			servico,
			description,
			duracao_estimada,
			data_hora,
			cras,
			status,
		});
	};

	const getSchedullingBlock = async (): Promise<ITodosBloqueiosModel> => {
		const { data } = await getSchedullingBlockRequest();
		return data;
	};

	const registerBlock = async (data: BloqueioAgendamentoModel) => {
		await registerSchedullingBlockRequest(data);
		setDatasBloqueadas(data);
	};

	const updateBlock = async (
		id: number,
		usuario_id: string,
		updates: Partial<BloqueioAgendamentoModel>
	) => {
		await updateBlockRequest(id, usuario_id, updates);
	};

	const getAllSchedulling = async (): Promise<ISchedulingModel> => {
		const { data } = await getSchedullingRequest();
		return data;
	};

	const getAllSchedullingCras = async (cras: number): Promise<ISchedulingModel> => {
		const { data } = await getAllSchedullingCrasRequest(cras);
		return data;
	};

	const updateScheduling = async (
		id: number,
		usuario_id: string,
		updates: Partial<ISchedulingModel>
	) => {
		await updateSchedulingRequest(id, usuario_id, updates);
	};

	const signOut = async () => {
		localStorage.removeItem('token');
		setToken(null);
		setPayload(null);
		delete axios.defaults.headers.common['Authorization'];
	};

	return (
		<AuthContext.Provider
			value={{
				payload,
				setPayload,
				getSchedullingBlock,
				isAuthenticated,
				signIn,
				registerUser,
				signOut,
				getAllUsers,
				token,
				cpfData,
				datasBloqueadas,
				getAllSchedulling,
				registerSchedulling,
				getAllSchedullingCras,
				updateScheduling,
				registerBlock,
				updateBlock,
				getByCpf,
				updateUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
