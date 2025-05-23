import { ENV } from "../../utils/constanst";
import api from "../api";


export class UserController {


    async login(accessToken: string) {
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
}