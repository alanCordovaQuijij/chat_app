import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {View} from 'react-native';
import {HeaderChat} from '../../components/Navigation/HeaderChat/HeaderChat';
import {useRoute} from '@react-navigation/native';
import {ChatMessage, DataChatMessage} from '../../api/chat/chatMessage';
import {LoadingScreen} from '../../components/Shared/LoadingScreen';

const chatMessageController = new ChatMessage();
//type Props = DrawerScreenProps<DrawerParamList, 'CreacionEvento'>;

export const ChatScreen = () => {
  const route = useRoute();
  const {chatId} = route.params as {chatId: string};
  const [messages, setMessages] = useState<DataChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        console.log('CHAT ID CHAT SCREEN===>', chatId);
        setIsLoading(true);
        const resp = await chatMessageController.getAllMessages(chatId);

        if (resp?.data) {
          console.log('DATA MESSAGES===>', resp.data);
          setMessages(resp.data.messages);
        }
      } catch (error: any) {
        console.log('Error listado mensajes===>', error);
        //Alert.alert(`${error?.message}`);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [chatId]);

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
