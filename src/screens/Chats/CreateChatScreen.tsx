import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { chatsStackParamList } from '../../navigations/stacks/ChatsNavigation';
import { IconButton } from 'react-native-paper';
import { UserController } from '../../api/auth/user';
import { ListUsers } from '../../components/CreateChat/ListUsers/ListUsers';

export const CreateChatScreen = () => {

  const navigation = useNavigation<NavigationProp<chatsStackParamList>>();
  const userController = new UserController();
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosResult, setUsuariosResult] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="close" // Paper usa MaterialCommunityIcons por defecto
          size={24}
          onPress={() => {
            // Acción al presionar el ícono
            console.log('CERRAR');
            // navegación opcional:
            navigation.goBack();
          }}
        />
      ),
    });
  }, []);


  const obtenerUsuarios = async () => {

    try {

      const resp = await userController.getAllUsers();
      console.log("USUARIOS=====>", resp)
      if (resp) {
        setUsuarios(resp);
        setUsuariosResult(resp);
      }

    } catch (error: any) {
      console.error('Error al lisar Usuarios:', error?.message || error);

    }

  }


  useEffect(() => {
    obtenerUsuarios();
  }, [])



  return (
    <ListUsers user={usuarios}/>
  )
}
