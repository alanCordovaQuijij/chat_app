import { ENV } from "../../utils/constanst";
import api from "../api";
import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

export interface IDefaultResponse {
    statusCode: number;
    message: string;
}

export interface refreshToken  extends IDefaultResponse{
    accessToken: string;
}

export class Auth {
    async register(email: string, password: string) {
        try {
            const response = await api.post(`${ENV.ENDPOINT.AUTH.REGISTER}`, {
                email,
                password,
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async login(email: string, password: string) {
        try {
            const response = await api.post(`${ENV.ENDPOINT.AUTH.LOGIN}`, {
                email,
                password,
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async refreshAccessToken(refreshToken: string) {
        try {
            const response = await api.post(`${ENV.ENDPOINT.AUTH.REFRESH_ACCESS_TOKEN}`, {
                refreshToken
            });

            return response.data as refreshToken;
        } catch (error) {
            throw error;
        }
    }

    async setAccessToken(token: string) {
        try {
            storage.set(ENV.JWT.ACCESS, token)

        } catch (error) {
            throw error;
        }
    }

    async getAccessToken() {
        try {
            return storage.getString(ENV.JWT.ACCESS)

        } catch (error) {
            throw error;
        }
    }

    async setRefreshToken(token: string) {
        try {
            storage.set(ENV.JWT.REFRESH, token)

        } catch (error) {
            throw error;
        }
    }

    async getRefreshToken() {
        try {
            return storage.getString(ENV.JWT.REFRESH)

        } catch (error) {
            throw error;
        }
    }

    async removeTokens() {
        storage.delete(ENV.JWT.REFRESH);
        storage.delete(ENV.JWT.ACCESS);

    }
}