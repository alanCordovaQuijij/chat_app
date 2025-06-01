import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { IconButton } from 'react-native-paper';
import { chatsStackParamList } from '../../navigations/stacks/ChatsNavigation';
import { Chat, DataChats } from '../../api/chat/chat';
import { LoadingScreen } from '../../components/Shared/LoadingScreen';
import { ListChat } from '../../components/Chat/ListChat/ListChat';
import * as _ from "lodash";

const chatController = new Chat();

export const ChatsScreen = () => {
  const [chatsResult, setChatsResult] = useState<DataChats[]>([]);
  const [chats, setChats] = useState<DataChats[]>([]);
  const navigation = useNavigation<NavigationProp<chatsStackParamList>>();

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
              setChats(response.data);
              setChatsResult(response.data);
              console.log("RESPONSE CHATS====>", response.data);
            }
          }
        } catch (error: any) {
          console.error(error);
          Alert.alert("Error", `${error.message}`);
        }
      };

      fetchData();

      return () => {
        // Cleanup
        isActive = false;
      };
    }, [])
  );

  if (!chatsResult.length) return <LoadingScreen />

  return (
    <View style= {{backgroundColor:"#000", flex: 1}}>
      <ListChat chats={_.size(chats) === _.size(chatsResult) ? chats : chatsResult} />
    </View>
  )
}
