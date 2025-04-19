import React from 'react'
import { Text, View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../../navigations/stacks/AuthNavigation';
import { registerScreenStyles } from './RegisterScreenStyles';


export const RegisterScreen = () => {

  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  return (
    <View style={{ ...registerScreenStyles.content }}>
      <Text style={{ ...registerScreenStyles.title }}>Crea tu cuenta y empieza a enviar mensajes</Text>


      <Text style={{ color: "#fff" }} > Registrer Form</Text>

      <Text style={{ ...registerScreenStyles.register }} onPress={navigation.goBack}> Iniciar sesion</Text>


    </View>  )
}
