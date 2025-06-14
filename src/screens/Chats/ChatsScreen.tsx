import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/core';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {chatsStackParamList} from '../../navigations/stacks/ChatsNavigation';
import {Chat, DataChats} from '../../api/chat/chat';
import {LoadingScreen} from '../../components/Shared/LoadingScreen';
import {ListChat} from '../../components/Chat/ListChat/ListChat';
import * as _ from 'lodash';
import moment from 'moment';
import {DataChatMessage} from '../../api/chat/chatMessage';
import { SearchChat } from '../../components/Chat/ListChat/searchChat/SearchChat';

const chatController = new Chat();

export const ChatsScreen = () => {
  const [chatsResult, setChatsResult] = useState<DataChats[]>([]);
  const [chats, setChats] = useState<DataChats[]>([]);
  const [reload, setReload] = useState(false);
  const navigation = useNavigation<NavigationProp<chatsStackParamList>>();

  const onReload = () => setReload(prevState => !prevState);

  const upTopChat = (newMessage: DataChatMessage) => {
    console.log('Entra en UPtopchat');

    if (chatsResult.length) {
      console.log('Entra en el ordenamiento 1');
      // Clonar el array
      const updatedChatsResult = chatsResult.map(item => {
        if (item._id === newMessage.chat_id) {
          return {
            ...item,
            last_message_date: newMessage.createdAt,
            last_message_date_formated: moment(newMessage.createdAt).format('HH:mm'),
          };
        }
        return item;
      });
      setChatsResult(sortChats(updatedChatsResult));
    }
    if (chats.length) {
      console.log('Entra en el ordenamiento 2');
      const updatedChats = chats.map(item => {
        if (item._id === newMessage.chat_id) {
          return {
            ...item,
            last_message_date: newMessage.createdAt,
            last_message_date_formated: moment(newMessage.createdAt).format('HH:mm'),
          };
        }
        return item;
      });
      setChats(sortChats(updatedChats));
    }
  };

  const sortChats = (chats: DataChats[]) => {
    const result = chats.sort((a, b) => {
      const dateA = a.last_message_date ? moment(a.last_message_date) : null;
      const dateB = b.last_message_date ? moment(b.last_message_date) : null;

      if (!dateA && !dateB) return 0;
      if (!dateA) return 1; // a es null → va después
      if (!dateB) return -1; // b es null → va después

      return dateB.diff(dateA); // más recientes al inicio
    });

    console.log("RESULT ORDENADO ====> ",result )

    return result;
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="plus" // Paper usa MaterialCommunityIcons por defecto
          size={24}
          onPress={() => {
            // Acción al presionar el ícono
            console.log('Nuevo chat');
            // navegación opcional:
            navigation.navigate('CreateChatScreen');
          }}
        />
      ),
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        try {
          // Lógica asíncrona
          const response = await chatController.getAllChats();
          if (isActive) {
            // Procesar los datos si el componente sigue montado
            if (response?.data) {
              const result = response.data.sort((a, b) => {
                const dateA = a.last_message_date
                  ? moment(a.last_message_date)
                  : null;
                const dateB = b.last_message_date
                  ? moment(b.last_message_date)
                  : null;

                if (!dateA && !dateB) return 0;
                if (!dateA) return 1; // a es null → va después
                if (!dateB) return -1; // b es null → va después

                return dateB.diff(dateA); // más recientes al inicio
              });

              setChats(result);
              setChatsResult(result);
              console.log('RESPONSE CHATS====>', response.data);
            }
          }
        } catch (error: any) {
          console.error(error);
          Alert.alert('Error', `${error.message}`);
        }
      };

      fetchData();

      return () => {
        // Cleanup
        isActive = false;
      };
    }, [reload]),
  );

  if (!chatsResult.length) return <LoadingScreen />;

  return (
    <View style={{backgroundColor: '#000', flex: 1}}>

      {_.size(chats) > 0 && <SearchChat  data={chats}  setData={setChatsResult}/>}

      <ListChat
        chats={_.size(chats) === _.size(chatsResult) ? chats : chatsResult}
        onReload={onReload}
        upTopChat={upTopChat}
      />
    </View>
  );
};
