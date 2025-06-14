import { ScrollView, View } from "react-native"
import { Text } from "react-native-paper"
import { DataChats } from "../../../api/chat/chat"
import { listChatsStyles } from "./ListChat.styles"
import * as _ from "lodash";
import { ItemChat } from "./ItemChat/ItemChat";
import { DataChatMessage } from "../../../api/chat/chatMessage";

interface Iprops {
    chats: DataChats[],
    onReload: () => void
    upTopChat: (newMessage: DataChatMessage) => void
}

export const ListChat = ({ chats, onReload, upTopChat }: Iprops) => {



    return (


        <ScrollView alwaysBounceHorizontal={false}>
            <View style={listChatsStyles.content}>

                {_.size(chats) === 0 && (

                    <Text style={listChatsStyles.textNoChats}>
                        No se encontraron conversaciones. Usa el botón (+) para iniciar una nueva.
                    </Text>

                )}

                {chats.map(item => (
                    <ItemChat key={item._id} chat={item} onReload={onReload} upTopChat={upTopChat} />
                ))}

            </View>

        </ScrollView>
    )
}
