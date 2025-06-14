import { ENV } from "../../utils/constanst";
import api from "../api";
import { IDefaultResponse } from "../auth/auth";




export interface chatParticipant {
    _id: string;
    firstname: string;
    lastname: string;
    password: string;
    avatar?: any;
    email: string;
    estado: boolean;
}

export interface DataChats {
    _id: string;
    participant_one: chatParticipant;
    participant_two: chatParticipant;
    last_message_date?: Date | null;
    last_message_date_formated?: string | null;
}

export interface IResponseChats extends IDefaultResponse {
    data: DataChats[];
}

export interface IResponseChatByID extends IDefaultResponse {
    data: DataChats;
}

export class Chat {

    async createChat(participantOne: string, participantTwo: string) {
        try {
            const response = await api.post(`${ENV.ENDPOINT.CHAT}`, {
                participant_id_one: participantOne,
                participant_id_two: participantTwo,
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getAllChats() {
        try {
            const response = await api.get(`${ENV.ENDPOINT.CHAT}`, {});

            return response.data as IResponseChats;
        } catch (error) {
            throw error;
        }
    }

        async removeChat(chatId: string) {
        try {
            const response = await api.delete(`${ENV.ENDPOINT.CHAT}/${chatId}`);

            return response.data;
        } catch (error) {
            throw error;
        }

        
    }
        async getChatById(chatId: string) {
        try {
            const response = await api.get(`${ENV.ENDPOINT.CHAT}/${chatId}`);

            return response.data as IResponseChatByID;
        } catch (error) {
            throw error;
        }

        
    }

}