import { Avatar, IconButton, Text } from "react-native-paper"
import { Chat, DataChats } from "../../../../api/chat/chat"
import { Alert, TouchableOpacity } from "react-native"
import { ENV } from "../../../../utils/constanst"
import { itemChatStyles } from "./ItemChat.styles"
import { View } from "react-native"
import { useAuth } from "../../../../hooks/useAuth"
import { useEffect, useState } from "react"
import { ChatMessage, DataChatMessage } from "../../../../api/chat/chatMessage"
import { UnreadMessages } from "../../../../utils/Storage"
import { AlertConfirm } from "../../../Shared/AlertConfirm/AlertConfirm"
import { socket } from "../../../../utils/sockets"
import { GlobalsStackParamList, RootStackParamList } from "../../../../navigations/interfaces/interfacesScreen"
import { screens } from "../../../../utils/screens"
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface Iprops {
  chat: DataChats,
  onReload: () => void
  upTopChat: (newMessage: DataChatMessage) => void
}

const totalUnreadMessages = 10;
const lastMessage = true;

const chatMessageController = new ChatMessage();
const unreadMessageController = new UnreadMessages();
const chatController = new Chat();


export const ItemChat = ({ chat, onReload, upTopChat }: Iprops) => {

  const { user: userLoged } = useAuth();
  const [lastMessage, setLastMessage] = useState<DataChatMessage | null>(null);
  const [totalUnreadMessages, setTotalUnreadMessages] = useState(0);
  const [showDelete, setShowDelete] = useState(false)

  const navigations = useNavigation<NavigationProp<GlobalsStackParamList>>();

  const user = chat.participant_one._id === userLoged?._id ? chat.participant_two : chat.participant_one;

  const initials = `${user.firstname[0] ?? ''}${user.lastname[0] ?? ''}`.toUpperCase();
  const fullName = `${user?.firstname ?? 'Nombre'} ${user?.lastname ?? 'Apellido'}`;

  const openCloseDelete = () => setShowDelete(prevState => !prevState);

  const openChat = () => {
    console.log("Abrir chat =>", chat._id);
    setTotalUnreadMessages(0);
    //navigations.navigate(screens.globals.ChatScreen,{ });
    navigations.navigate('ChatScreen', {
      chatId: chat._id
    });
  }

  const deleteChat = async () => {
    console.log("delete chat =>", chat._id);

    try {
      const resp = await chatController.removeChat(chat._id);
      console.log(resp)
      openCloseDelete();
      onReload();
    } catch (error) {
      console.error("Error", error)
    }
  }
  /* 
    const newMessage = async(newMessage: DataChatMessage) => {
      //console.log("newMessage====>", JSON.stringify(newMessage));
  
      if (newMessage.chat_id === chat._id) {
  
        if (newMessage.user._id !== userLoged?._id) {
          setLastMessage(newMessage);
          upTopChat(newMessage);
  
          const activeChatId = await unreadMessageController.getActiveChatId(ENV.ACTIVE_CHAT_ID);
          console.log("activeChatId====>", activeChatId);
          console.log(" chat._id====>",  chat._id);
  
         
          if(activeChatId !== newMessage.chat_id){
            console.log("ENTRA EN SUMAR MENSAJES NO LEIDOS");
            setTotalUnreadMessages((prev) => prev +1)
          }
  
          if(activeChatId){
            if(String(activeChatId) === String(newMessage.chat_id)){
            //console.log("ENTRA EN SUMAR MENSAJES NO LEIDOS");
              const totalReadMessages = await unreadMessageController.getTotalReadMessages(chat._id);
              unreadMessageController.setTotalReadMessages(chat._id, totalReadMessages + 1 )
           }
          }
  
        }
      }
    }; */

  const newMessage = async (newMessage: DataChatMessage) => {
    //console.log("newMessage====>", JSON.stringify(newMessage));

    if (newMessage && newMessage.chat_id === chat._id) {

      setLastMessage(newMessage);
      upTopChat(newMessage);

      const activeChatId = await unreadMessageController.getActiveChatId(ENV.ACTIVE_CHAT_ID);
      console.log("activeChatId====>", activeChatId);
      console.log(" chat._id====>", chat._id);


      if (activeChatId) {
        if (String(activeChatId) === String(newMessage.chat_id)) {
          //console.log("ENTRA EN SUMAR MENSAJES NO LEIDOS");
          const totalReadMessages = await unreadMessageController.getTotalReadMessages(chat._id);
          unreadMessageController.setTotalReadMessages(chat._id, totalReadMessages + 1)
          //unreadMessageController.setTotalReadMessages(chat._id, 0 )

        }
      } else {
        if (newMessage.user._id !== userLoged?._id) {
          setTotalUnreadMessages((prev) => prev + 1)

        }
      }
    }
  };

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

        console.log("totalReadMessagesStorage==>", totalReadMessages)
        console.log("TOTALMENSAJESaPI==>", resp.data)

        if (resp?.data) {
          setTotalUnreadMessages(resp.data - totalReadMessages)
        }

      } catch (error: any) {
        console.log("Error total message", error)
        //Alert.alert(`${error?.message}`);
      }
    })()

  }, [chat._id])


  useEffect(() => {
    if (!socket) return;

    socket.emit("subscribe", chat._id); // sala principal
    socket.emit("subscribe", `${chat._id}_notify`); // sala de notificaciones

    const handleMessage = (msg: any) => {
      console.log("Mensaje recibido:", msg);
      // Aquí haces lo que necesites con el mensaje
    };

    // const handleNotify = (msg: any) => {
    //   console.log("Notificación recibida:", msg);


    // };

    socket.on("message", handleMessage);
    socket.on("message_notify", newMessage);

    return () => {
      socket?.off("message", handleMessage);
      socket?.off("message_notify", newMessage);
    };
  }, [socket, chat._id]);


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
            {user.firstname || user.lastname ? fullName : user.email}
          </Text>

          {lastMessage?.type === 'IMAGE' ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <IconButton
                icon="image"
                size={18}
                style={{ margin: 0, padding: 0 }}
              />
              <Text style={itemChatStyles.message}>Imágen</Text>
            </View>
          ) : (
            <Text style={itemChatStyles.message} numberOfLines={2}>
              {lastMessage?.message || ''}
            </Text>
          )}
        </View>

          <View style={itemChatStyles.notify}>

            {lastMessage && (<Text style={itemChatStyles.time}>{lastMessage.createdAtFormated}</Text>
            )}

            {totalUnreadMessages > 0 && (
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
        show={showDelete}
        onClose={openCloseDelete}
        textConfirm="Eliminar"
        onConfirm={deleteChat}
        title="Eliminar chat"
        message={`Estas seguro de que quieres eliminar el chat con ${user.email}`}
        isDanger
      />
    </>
  )
}
