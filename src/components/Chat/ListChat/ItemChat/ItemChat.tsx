import { Avatar, Text } from "react-native-paper"
import { DataChats } from "../../../../api/chat/chat"
import { Alert, TouchableOpacity } from "react-native"
import { ENV } from "../../../../utils/constanst"
import { itemChatStyles } from "./ItemChat.styles"
import { View } from "react-native"
import { useAuth } from "../../../../hooks/useAuth"
import { useEffect, useState } from "react"
import { ChatMessage, DataChatMessage } from "../../../../api/chat/chatMessage"
import { UnreadMessages } from "../../../../utils/Storage"
import { AlertConfirm } from "../../../Shared/AlertConfirm/AlertConfirm"

interface Iprops {
  chat: DataChats
}

const totalUnreadMessages = 10;
const lastMessage = true;

const chatMessageController = new ChatMessage();
const unreadMessageController = new UnreadMessages();


export const ItemChat = ({ chat }: Iprops) => {

  const { user: userLoged } = useAuth();
  const [lastMessage, setLastMessage] = useState<DataChatMessage | null>(null);
  const [totalUnreadMessages, setTotalUnreadMessages] = useState(0);
  const [showDelete, setShowDelete] = useState(false)

  const user = chat.participant_one._id === userLoged?._id ? chat.participant_two : chat.participant_one;

  const initials = `${user.firstname[0] ?? ''}${user.lastname[0] ?? ''}`.toUpperCase();
  const fullName = `${user?.firstname ?? 'Nombre'} ${user?.lastname ?? 'Apellido'}`;

  const openCloseDelete = () => setShowDelete(prevState => !prevState);

  const openChat =() => {
    console.log("Abrir chat =>", chat._id);
  }

  const deleteChat =() => {
    console.log("delete chat =>", chat._id);
  }


  useEffect(() => {

    (async () => {
      try {
        const resp = await chatMessageController.getLastMessage(chat._id);

        if (resp?.data) {
          setLastMessage(resp.data)
        }

      } catch (error: any) {
        console.log("Error last message", error)
        //Alert.alert(`${error?.message}`);

      }
    })()

  }, [chat._id])

  useEffect(() => {

    (async () => {
      try {
        const resp = await chatMessageController.getMessageTotal(chat._id);
        const totalReadMessages = await unreadMessageController.getTotalReadMessages(chat._id);

        console.log("totalReadMessages==>", totalReadMessages)

        if (resp?.data) {
          setTotalUnreadMessages(resp.data - totalReadMessages)
        }

      } catch (error: any) {
        console.log("Error total message", error)
        //Alert.alert(`${error?.message}`);
      }
    })()

  }, [chat._id])


  return (
    <>
      <TouchableOpacity style={itemChatStyles.content} onPress={openChat} onLongPress={openCloseDelete}>
        {user.avatar ? (
          <Avatar.Image size={40} source={{ uri: `${ENV.BASE_PATH}/${user.avatar}` }} style={itemChatStyles.avatar} />
        ) : (
          <Avatar.Text size={40} label={initials} style={itemChatStyles.avatar} />
        )}
        <View style={itemChatStyles.infoContent}>

          <View style={itemChatStyles.info}>
            <Text style={itemChatStyles.identity}>
              {user.firstname || user.lastname

                ? fullName
                : user.email

              }

            </Text>
            <Text style={itemChatStyles.message} numberOfLines={2}>
              {lastMessage?.message || ''}
            </Text>
          </View>

          <View style={itemChatStyles.notify}>

            {lastMessage && (<Text style={itemChatStyles.time}>{lastMessage.createdAt}</Text>
            )}

            {totalUnreadMessages >= 0 && (
              <View style={itemChatStyles.totalUnreadMessages}>
                <Text style={itemChatStyles.totalUnread}>
                  {totalUnreadMessages < 99 ? totalUnreadMessages : "99+"}
                </Text>
              </View>
            )}
          </View>



        </View>

      </TouchableOpacity>

      <AlertConfirm 
        show = {showDelete}
        onClose = {openCloseDelete}
        textConfirm = "Eliminar"
        onConfirm = {deleteChat}
        title = "Eliminar chat"
        message = {`Estas seguro de que quieres eliminar el chat con ${user.email}`}
        isDanger
      />
    </>
  )
}
