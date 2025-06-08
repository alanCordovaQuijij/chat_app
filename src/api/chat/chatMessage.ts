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
    createdAt: string;
    updatedAt: Date;
    estado: boolean;
    _id: string;
    user: chatMessageParticipant;
}

export interface IResponseChatMessage extends IDefaultResponse {
    data: DataChatMessage;
}

export interface IResponseChatMessageTotal extends IDefaultResponse {
    data: number;
}




export class ChatMessage {


    async getLastMessage(chatId: string) {
        try {
            const response = await api.get(`${ENV.ENDPOINT.CHAT_MESSAGE_LAST}/${chatId}`);

            return response.data as IResponseChatMessage;
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

}