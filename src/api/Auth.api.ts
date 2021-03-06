import axios from "axios";
import User from "../models/User.model";
import { BASE_URL, LOGIN_TOKEN_KEY } from "./base.api";

export interface LoginData {
	email: string;
	password: string;
}

interface LoginResponse {
	data: {
		is_2fa_enabled: boolean;
	};
	token: string;
	user: User;
}

export const loginAPI = async (data: LoginData) => {
	const url = BASE_URL + "/login";

	const request = await axios.post<LoginResponse>(url, data);

	localStorage.setItem(LOGIN_TOKEN_KEY, request.data.token);

	return request.data.user;
};

export const logOut = () => {
	localStorage.removeItem(LOGIN_TOKEN_KEY);
};
