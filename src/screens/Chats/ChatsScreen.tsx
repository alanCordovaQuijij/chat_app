import { NavigationProp, useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { IconButton } from 'react-native-paper';
import { chatsStackParamList } from '../../navigations/stacks/ChatsNavigation';

export const ChatsScreen = () => {

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
  
  

  return (
    <Text>ChatsScreen</Text>
  )
}
