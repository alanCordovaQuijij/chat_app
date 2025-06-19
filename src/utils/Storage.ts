import { MMKV } from "react-native-mmkv";

const storage = new MMKV()


export class UnreadMessages {

    async getTotalReadMessages(chatId: string){
        const response =   storage.getString(`${chatId}_read`);
        return Number(response || 0)
    }

    async setTotalReadMessages(chatId: string, total: number){
        const response = storage.set(`${chatId}_read`, JSON.stringify(total));
    }

    async getActiveChatId(key: string){
        const response = storage.getString(`${key}`);
        return response
    }

    setActiveChatId(key: string, chatId: string){
        const response = storage.set(`${key}`, chatId);
        return response;
    }

    removeActiveChatId(key: string){
        const response = storage.delete(`${key}`);
        return response;
    }



}    
