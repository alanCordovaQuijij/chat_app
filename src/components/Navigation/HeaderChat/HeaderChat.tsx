import React, { useEffect, useState } from 'react'
import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import { headerChatStyles } from './HeaderChat.styles'
import { Avatar, IconButton, Text } from 'react-native-paper'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { GlobalsStackParamList } from '../../../navigations/interfaces/interfacesScreen';
import { Chat, chatParticipant } from '../../../api/chat/chat';
import { useAuth } from '../../../hooks/useAuth';
import { ENV } from '../../../utils/constanst';
import { AlertConfirm } from '../../Shared/AlertConfirm/AlertConfirm';

const chatController = new Chat();

export const HeaderChat = () => {

  const [userChat, setUserChat] = useState<chatParticipant | null>(null);
  const [fullName, setFullName] = useState('');
  const [initials, setInitials] = useState('');
  const [showDelete, setShowDelete] = useState(false)

  const { user } = useAuth();
  const navigation = useNavigation<NavigationProp<GlobalsStackParamList>>();

  const route = useRoute();
  const { chatId } = route.params as { chatId: string };
  //console.log("CHAT ID CHAT SCREEN===> ", chatId)

  const openCloseDelete = () => setShowDelete(prevState => !prevState);

  const deleteChat = async () => {
    console.log("delete chat =>", chatId);

    try {
      const resp = await chatController.removeChat(chatId);
      //console.log(resp)
      //openCloseDelete();
      navigation.goBack();
      //onReload();
    } catch (error) {
      console.error("Error", error)
    }
  }

  const goToUserProfile = () => {
    if (userChat) {
      navigation.navigate('UserProfileScreen', {
        userId: userChat._id
      })
    }
  };

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
    if (userChat) {
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
            {/* {userChat?.avatar ? (
              <Avatar.Image size={40} source={{ uri: `${ENV.BASE_PATH}/${userChat.avatar}` }} />
            ) : (
              <Avatar.Text size={40} label={initials} />
            )} */}
            <TouchableOpacity onPress={goToUserProfile}>
              {userChat?.avatar ? (
                <Avatar.Image
                  size={40}
                  source={{ uri: `${ENV.BASE_PATH}/${userChat.avatar}` }}
                />
              ) : (
                <Avatar.Text
                  size={40}
                  label={initials}
                />
              )}
            </TouchableOpacity>
            <Text style={headerChatStyles.name} onPress={goToUserProfile}>{fullName}</Text>
          </View>
          <View>
            <IconButton
              icon="delete"
              size={24}
              onPress={() => {
                // Aquí puedes lanzar un modal de confirmación o lógica de eliminación
                openCloseDelete();
                console.log('Eliminar conversación');
              }}
            />
          </View>

        </View>
      </SafeAreaView>

      <AlertConfirm
        show={showDelete}
        onClose={openCloseDelete}
        textConfirm="Eliminar"
        onConfirm={deleteChat}
        title="Eliminar chat"
        message={`Estas seguro de que quieres eliminar este Chat?`}
        isDanger
      />

    </>
  )
}
