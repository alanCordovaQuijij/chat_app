import React from 'react'
import { Text, View } from 'react-native'

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../../navigations/stacks/AuthNavigation';
import { screens } from '../../../utils/screens';
import { loginScreenStyles } from './LoginScreenStyles';
import { LoginForm } from '../../../components/Auth/LoginForm/LoginForm';


export const LoginScreen = () => {

  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();


  const goToRegister = () => {
    navigation.navigate(screens.auth.registerScreen)
  }

  return (
    <View style={{ ...loginScreenStyles.content }}>
      <Text style={{ ...loginScreenStyles.title }}> Entra y empieza a chatear</Text>

      <LoginForm/>


      <Text style={{ ...loginScreenStyles.register }} onPress={goToRegister}> Registrarse</Text>

      <Text style={{ ...loginScreenStyles.info }}> Debes de tener al menos 16 años de edad para registrarte. Mas informacion sobre como trabaja ChatApp en las politicas</Text>


    </View>
  )
}
