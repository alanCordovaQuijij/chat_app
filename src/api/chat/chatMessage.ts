import { ENV } from "../../utils/constanst";
import api from "../api";
import { IDefaultResponse } from "../auth/auth";




export interface chatMessageParticipant {
    _id: string;
    firstname: string;
    lastname: string;
    avatar?: any;
    email: string;
    estado: boolean;
}

export interface DataChatMessage {
    chat_id: string;
    user_id: string;
    message: string;
    type: string;
    createdAt: Date;
    createdAtFormated: string;
    updatedAt: Date;
    estado: boolean;
    _id: string;
    user: chatMessageParticipant;
}

export interface IResponseChatLastMessage extends IDefaultResponse {
    data: DataChatMessage;
}

export interface IResponseChatMessageTotal extends IDefaultResponse {
    data: number;
}

export interface IResponseChatMessage extends IDefaultResponse {
    data: {
        messages: DataChatMessage[];
        total: number
    }
}

export interface IResponseSendChatMessage extends IDefaultResponse {
    data: DataChatMessage
}


export class ChatMessage {


    async getLastMessage(chatId: string) {
        try {
            const response = await api.get(`${ENV.ENDPOINT.CHAT_MESSAGE_LAST}/${chatId}`);

            return response.data as IResponseChatLastMessage;
        } catch (error) {
            throw error;
        }
    }

    async getMessageTotal(chatId: string) {
        try {
            const response = await api.get(`${ENV.ENDPOINT.CHAT_MESSAGE_TOTAL}/${chatId}`);

            return response.data as IResponseChatMessageTotal;
        } catch (error) {
            throw error;
        }
    }


    async getAllMessages(chatId: string) {
        try {
            const response = await api.get(`${ENV.ENDPOINT.CHAT_MESSAGE}/${chatId}`);

            return response.data as IResponseChatMessage;
        } catch (error) {
            throw error;
        }
    }


    async sendMessage(chatId: string, message: string) {
        try {

            const data: Record<string, any> = {
                chat_id: chatId,
                message: message,
            };

            const formData = new FormData();

            Object.keys(data).forEach((key) => {
                if (data[key] != null) { // permite valores como 0 o false
                    formData.append(key, data[key]);
                }
            });

            const response = await api.post(`${ENV.ENDPOINT.CHAT_MESSAGE}`, formData);

            return response.data as IResponseSendChatMessage;
        } catch (error) {
            throw error;
        }
    }

}