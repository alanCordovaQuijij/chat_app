import { Image, ImageBackground, SafeAreaView, Text, View } from 'react-native'
import { useAuth } from '../../../hooks/useAuth'
import { authStartScreenStyles } from './AuthStartScreen.styles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { screens } from '../../../utils/screens';
import { AuthStackParamList } from '../../../navigations/stacks/AuthNavigation';



export const AuthStartScreen = () => {

  const auth = useAuth();
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const goToLogin = () => {
    navigation.navigate(screens.auth.loginScreen)
  }

  return (
    <SafeAreaView style={{ ...authStartScreenStyles.content }}>
      <ImageBackground
        source={require('../../../assets/jpg/fondo_wsp_auth_01_1.jpg')}
        style={{ ...authStartScreenStyles.img, zIndex: -1 }}
      />
      <View
        style={{
          //backgroundColor: 'green',
          flex: 1,
          //zIndex: 2,
          flexDirection: 'column',
          justifyContent: 'flex-end', // <- Esto manda el contenido al fondo vertical
          alignItems: 'center',       // <- Opcional: centra horizontalmente el texto
          paddingBottom: 40           // <- Opcional: agrega margen inferior
        }}
      >
        <Text style={{ ...authStartScreenStyles.title }}>Te damos la bienvenida a ChatApp</Text>
        <Text style={{ ...authStartScreenStyles.description }}>Recomendamos usar este servicio con responsabilidad para disfrutar de la experiencia que proporciona esta app desarrollada con cariño</Text>
        <Text style={{ ...authStartScreenStyles.description }}>Consulta nuestras politicas de privacidad. Pulsa "Aceptar y continuar" para aceptar las condiciones del servicio.</Text>
        <Text style={{ ...authStartScreenStyles.btn }} onPress={goToLogin}>Aceptar y continuar</Text>

      </View>
    </SafeAreaView>
  )
}
