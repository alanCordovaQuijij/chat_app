import {createStackNavigator} from '@react-navigation/stack';
import {screens} from '../../utils/screens';
import {AuthStartScreen} from '../../screens/Auth/AuthStartScreen/AuthStartScreen';
import {LoginScreen} from '../../screens/Auth/LoginScreen/LoginScreen';
import { RegisterScreen } from '../../screens/Auth/RegisterScreen/RegisterScreen';
import { IconBack } from '../../components/IconBack';
import { stackNavigationStyles } from '../Styles.styles';

export type AuthStackParamList = {
  AuthStartScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
}

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{...stackNavigationStyles, headerLeft: IconBack}}>
      <Stack.Screen
        name={screens.auth.authStartScreen}
        component={AuthStartScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={screens.auth.loginScreen}
        component={LoginScreen}
        options={{title: 'Iniciar Sesión'}}
      />

      <Stack.Screen
        name={screens.auth.registerScreen}
        component={RegisterScreen}
        options={{title: 'Registro'}}
      />
    </Stack.Navigator>
  );
};
