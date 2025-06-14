import { MMKV } from "react-native-mmkv";

const storage = new MMKV()


export class UnreadMessages {

    async getTotalReadMessages(chatId: string){
        const response =   storage.getString(`${chatId}_read`);
        return Number(response || 0)
    }

    async getActiveChatId(key: string){
        const response = storage.getString(`${key}`);
        return response
    }

}    
