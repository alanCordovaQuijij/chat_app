import { Avatar, Text } from "react-native-paper"
import { DataChats } from "../../../../api/chat/chat"
import { TouchableOpacity } from "react-native"
import { ENV } from "../../../../utils/constanst"
import { itemChatStyles } from "./ItemChat.styles"
import { View } from "react-native"

interface Iprops {
  chat: DataChats
}

const totalUnreadMessages = 10;
const lastMessage = true;

export const ItemChat = ({ chat }: Iprops) => {

  const user = chat.participant_two;

  const initials = `${user.firstname[0] ?? ''}${user.lastname[0] ?? ''}`.toUpperCase();
  const fullName = `${user?.firstname ?? 'Nombre'} ${user?.lastname ?? 'Apellido'}`;



  return (
    <>
      <TouchableOpacity style={itemChatStyles.content}>
        {user.avatar ? (
          <Avatar.Image size={40} source={{ uri: `${ENV.BASE_PATH}/${user.avatar}` }} style={itemChatStyles.avatar} />
        ) : (
          <Avatar.Text size={40} label={initials} style={itemChatStyles.avatar} />
        )}
        <View style={itemChatStyles.infoContent}>

          <View style={itemChatStyles.info}>
            <Text style={itemChatStyles.identity}>{user.email}</Text>
            <Text style={itemChatStyles.message} numberOfLines={2}>
              Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.
            </Text>
          </View>

          <View style={itemChatStyles.notify}>

            {lastMessage && (<Text style={itemChatStyles.time}> 12:31</Text>
            )}

            {totalUnreadMessages && (
              <View style={itemChatStyles.totalUnreadMessages}>
                <Text style={itemChatStyles.totalUnread}>
                  {totalUnreadMessages < 99 ? totalUnreadMessages : "99+"}
                </Text>
              </View>
            )}
          </View>



        </View>

      </TouchableOpacity>
    </>
  )
}
