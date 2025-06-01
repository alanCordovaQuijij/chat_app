import React from 'react'
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native'
import { listUsersStyles } from './ListUsers.styles'
import { Avatar, Text } from 'react-native-paper'
import { ENV } from '../../../utils/constanst'
import { IUser } from '../../../api/auth/user'
import { Chat } from '../../../api/chat/chat'
import { useAuth } from '../../../hooks/useAuth'
import { NavigationProp, useNavigation } from '@react-navigation/core'
import { chatsStackParamList } from '../../../navigations/stacks/ChatsNavigation'



interface Iprops {
  user: IUser[]
}

const chatController = new Chat();

export const ListUsers = ({ user }: Iprops) => {
  const navigation = useNavigation<NavigationProp<chatsStackParamList>>();

  const { user: usuariologueado } = useAuth();

  const createChat = async (selectedUser: IUser) => {
    console.log("CREAR CHAT CON====>", selectedUser);

    try {
      if (usuariologueado?._id) {
        const resp = await chatController.createChat(usuariologueado._id, selectedUser._id);

        if (resp) {
          //Alert.alert("Éxito", `${resp.message}`);
          navigation.goBack();
        }
      } else {
        Alert.alert("Error", "Usuario no logueado");

      }
    } catch (error: any) {
      console.error(error);
      Alert.alert("Error", `${error.message}`);

    }
  };


  return (
    <ScrollView style={listUsersStyles.content}>
      {user.map(item => (
        <TouchableOpacity
          key={item._id}
          style={listUsersStyles.item}
          onPress={() => createChat(item)}
        >
          {item?.avatar ? (
            <Avatar.Image size={40} source={{ uri: `${ENV.BASE_PATH}/${item.avatar}` }} style={listUsersStyles.avatar} />
          ) : (
            <Avatar.Text size={40} label={item.email.substring(0, 2).toUpperCase()} style={listUsersStyles.avatar} />
          )}

          <View style={{ flexDirection: 'column' }}>
            <Text style={listUsersStyles.name}>
              {item?.firstname || item.lastname ? `${item.firstname || ''} ${item.lastname || ''}` : `...`}
            </Text>

            <Text style={listUsersStyles.email}>
              {item?.email || ''}
            </Text>
          </View>



        </TouchableOpacity>
      ))}

    </ScrollView>
  )
}
