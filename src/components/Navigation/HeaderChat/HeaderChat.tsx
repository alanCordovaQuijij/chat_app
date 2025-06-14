import React, { useEffect, useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import { headerChatStyles } from './HeaderChat.styles'
import { Avatar, IconButton, Text } from 'react-native-paper'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { GlobalsStackParamList } from '../../../navigations/interfaces/interfacesScreen';
import { Chat, chatParticipant } from '../../../api/chat/chat';
import { useAuth } from '../../../hooks/useAuth';
import { ENV } from '../../../utils/constanst';

const chatController = new Chat();

export const HeaderChat = () => {

  const [userChat, setUserChat] = useState<chatParticipant | null>(null);
  const [fullName, setFullName] = useState('');
  const [initials, setInitials] = useState('');

  const {user} = useAuth();
  const navigation = useNavigation<NavigationProp<GlobalsStackParamList>>();

  const route = useRoute();
  const { chatId } = route.params as { chatId: string };

  console.log("CHAT ID CHAT SCREEN===> ", chatId)

  useEffect(() => {

    (async () => {
      try {
        const resp = await chatController.getChatById(chatId);

        if (resp?.data) {
          const otherUser = user?._id !== resp.data.participant_one._id ? resp.data.participant_one : resp.data.participant_two
          setUserChat(otherUser);
        }

      } catch (error: any) {
        console.log("Error last message", error)
        //Alert.alert(`${error?.message}`);

      }
    })()

  }, [chatId])

  useEffect(() => {
    if(userChat){
        const initialsTemp = `${userChat.firstname[0] ?? ''}${userChat.lastname[0] ?? ''}`.toUpperCase();
        const fullNameTemp = `${userChat?.firstname ?? 'Nombre'} ${userChat?.lastname ?? 'Apellido'}`;

        setInitials(initialsTemp);
        setFullName(fullNameTemp);
    }
  }, [userChat])
  

  return (
    <>
      <SafeAreaView style={headerChatStyles.container}>
        <View style={headerChatStyles.content}>
          <View style={headerChatStyles.info}>
            <IconButton
              icon="arrow-left"
              size={24}
              onPress={() => navigation.goBack()}
            />
            {userChat?.avatar ? (
              <Avatar.Image size={40} source={{ uri: `${ENV.BASE_PATH}/${userChat.avatar}` }} />
            ) : (
              <Avatar.Text size={40} label={initials} />
            )}
            <Text style={headerChatStyles.name}>{fullName}</Text>
          </View>
          <View>
            <IconButton
              icon="delete"
              size={24}
              onPress={() => {
                // Aquí puedes lanzar un modal de confirmación o lógica de eliminación
                console.log('Eliminar conversación');
              }}
            />
          </View>

        </View>
      </SafeAreaView>

    </>
  )
}
