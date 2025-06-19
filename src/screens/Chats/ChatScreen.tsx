import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {View} from 'react-native';
import {HeaderChat} from '../../components/Navigation/HeaderChat/HeaderChat';
import {useRoute} from '@react-navigation/native';
import {ChatMessage, DataChatMessage} from '../../api/chat/chatMessage';
import {LoadingScreen} from '../../components/Shared/LoadingScreen';
import { UnreadMessages } from '../../utils/Storage';
import _ from "lodash";
import { ENV } from '../../utils/constanst';

const chatMessageController = new ChatMessage();
//type Props = DrawerScreenProps<DrawerParamList, 'CreacionEvento'>;

const unreadMessageController = new UnreadMessages();

export const ChatScreen = () => {
  const route = useRoute();
  const {chatId} = route.params as {chatId: string};
  const [messages, setMessages] = useState<DataChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

/*   useEffect(() => {
    (async () => {
      try {
        console.log('CHAT ID CHAT SCREEN===>', chatId);
        setIsLoading(true);
        const resp = await chatMessageController.getAllMessages(chatId);

        if (resp?.data) {
          console.log('DATA MESSAGES===>', resp.data);
          setMessages(resp.data.messages);
          unreadMessageController.setReadMessages(chatId, resp.data.total);
        }
      } catch (error: any) {
        console.log('Error listado mensajes===>', error);
        //Alert.alert(`${error?.message}`);
      } finally {
        setIsLoading(false);
      }
    })();

    return async() => {
      const resp = await chatMessageController.getAllMessages(chatId);
      unreadMessageController.setReadMessages(chatId, resp.data.total)
    }

  }, [chatId]); */

useEffect(() => {
  (async () => {
    try {
      console.log('CHAT ID CHAT SCREEN===>', chatId);
      setIsLoading(true);
      const resp = await chatMessageController.getAllMessages(chatId);

      if (resp?.data) {
        console.log('DATA MESSAGES===>', resp.data);
        setMessages(resp.data.messages);
        unreadMessageController.setTotalReadMessages(chatId, resp.data.total);
      }
    } catch (error: any) {
      console.log('Error listado mensajes===>', error);
      // Alert.alert(`${error?.message}`);
    } finally {
      setIsLoading(false);
    }
  })();

  // // Cleanup debe ser síncrono:
  // return () => {
  //   // Si quieres usar async, define y llama a una función dentro
  //   const markAsRead = async () => {
  //     try {
  //       const resp = await chatMessageController.getAllMessages(chatId);
  //       unreadMessageController.setTotalReadMessages(chatId, resp.data.total);
  //       console.log("ENTRA EN RETURN DE CHATSCREEN=====>", resp.data.total)
  //     } catch (error) {
  //       console.log("Error al marcar mensajes como leídos en cleanup:", error);
  //     }
  //   };

  //   markAsRead(); // Llamada sin await
  // };
}, [chatId]);


useEffect(() => {
  (()=> {
     unreadMessageController.setActiveChatId(ENV.ACTIVE_CHAT_ID, chatId);
  })();

  return () => {
    unreadMessageController.removeActiveChatId(ENV.ACTIVE_CHAT_ID);
  }

}, [chatId])



  return (
    <>
      <HeaderChat />
      {isLoading ? (
        <LoadingScreen />
      ) : messages.length > 0 ? (
        messages.map((item, index) => <Text key={index}>{item.message}</Text>)
      ) : (
        <Text>No hay mensajes</Text>
      )}
    </>
  );
};
