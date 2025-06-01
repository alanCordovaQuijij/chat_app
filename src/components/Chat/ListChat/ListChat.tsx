import { ScrollView, View } from "react-native"
import { Text } from "react-native-paper"
import { DataChats } from "../../../api/chat/chat"
import { listChatsStyles } from "./ListChat.styles"
import * as _ from "lodash";
import { ItemChat } from "./ItemChat/ItemChat";

interface Iprops {
    chats: DataChats[]
}

export const ListChat = ({chats}: Iprops) => {



    return (


        <ScrollView alwaysBounceHorizontal={false}>
            <View style= {listChatsStyles.content}>

                {_.size(chats) === 0 && (

                    <Text>
                        No tienes ningún chat, dale al (+) y empieza una nueva conversación
                    </Text>

                ) }

                {chats.map(item => (
                    <ItemChat key={item._id} chat={item}/>
                ))}

            </View>

        </ScrollView>
    )
}
