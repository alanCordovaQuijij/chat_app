import { ENV } from "../../utils/constanst";
import api from "../api";

export interface IUser {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    avatar?: string | null;
}

export class UserController {


    async getMe() {
        try {
            const response = await api.get(`${ENV.ENDPOINT.ME}`,
                //     {
                //     headers: {
                //         Authorization: `Bearer ${accessToken}`
                //       }
                // }
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateMe(userData: any) {
        try {

            if (userData) {
                const formData = new FormData();

                Object.keys(userData).forEach((key) => {
                    if (userData[key]) {
                        formData.append(key, userData[key])
                    }
                });


                const response = await api.patch(`${ENV.ENDPOINT.ME}`, formData);

                return response.data;
            }



        } catch (error) {
            throw error;
        }
    }

    async getAllUsers() {
        try {

            const response = await api.get(`${ENV.ENDPOINT.USER}`);

            return response.data as IUser[];

        } catch (error) {
            throw error;
        }
    }

        async getUserById(userId: string) {
        try {
            const response = await api.get(`${ENV.ENDPOINT.USER}/${userId}`,
                //     {
                //     headers: {
                //         Authorization: `Bearer ${accessToken}`
                //       }
                // }
            );

            return response.data as IUser;
        } catch (error) {
            throw error;
        }
    }

}