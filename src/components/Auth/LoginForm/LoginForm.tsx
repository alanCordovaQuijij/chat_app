import { Alert, Text, TouchableOpacity } from "react-native"
import { View } from "react-native"
import { Button, TextInput, useTheme } from "react-native-paper"
import { useState } from "react"
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Auth } from "../../../api/auth/auth"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { AuthStackParamList } from "../../../navigations/stacks/AuthNavigation"
import { loginFormStyles } from "./LoginFormStyles";
import { useAuth } from "../../../hooks/useAuth";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Correo no válido')
        .required('Este campo es obligatorio'),
    password: Yup.string()
        .min(6, 'Mínimo 6 caracteres')
        .required('Este campo es obligatorio'),
});


const authController = new Auth();

export const LoginForm = () => {
   const {login} = useAuth();
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();


    const handleSubmit = async(values: any) => {
        console.log('Datos enviados:', values);
        // Aquí puedes llamar a tu función de LOGIN

        try {
            const response = await authController.login(values.email, values.password);
            
            if(response){
                Alert.alert(`${response.message}`);

                const {access, refresh} = response;

                authController.setAccessToken(access);
                authController.setRefreshToken(refresh);
                
                await login(access)
            }


        } catch (error: any) {
            Alert.alert(`${error?.message}`);
        }
    };

    return (
        // <View>
        //     <View style={{ ...registerFormStyles.viewInput }}>
        //         <TextInput
        //             placeholder="Correo electrónico"
        //             style={{ ...registerFormStyles.input }}
        //             autoCapitalize="none"
        //         />

        //     </View>

        //     <TextInput
        //         placeholder="Contraseña"
        //         style={{ ...registerFormStyles.input }}
        //         secureTextEntry
        //     />

        //     <Button style={{ ...registerFormStyles.btn }}>CREAR CUENTA</Button>

        // </View>
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={loginFormStyles.container}>
                    <Text style={loginFormStyles.subtitle}>Entra y empieza a chatear</Text>

                    <TextInput
                        label="Correo electrónico"
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        mode="outlined"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={loginFormStyles.input}
                        error={touched.email && !!errors.email}
                    />
                    {touched.email && errors.email && (
                        <Text style={loginFormStyles.errorText}>{errors.email}</Text>
                    )}

                    <TextInput
                        label="Contraseña"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        secureTextEntry
                        mode="outlined"
                        style={loginFormStyles.input}
                        error={touched.password && !!errors.password}
                    />
                    {touched.password && errors.password && (
                        <Text style={loginFormStyles.errorText}>{errors.password}</Text>
                    )}

                    <Button
                        mode="contained"
                        onPress={() => handleSubmit()}
                        style={loginFormStyles.button}
                        contentStyle={{ paddingVertical: 6 }}
                    >
                        Entrar
                    </Button>
                </View>
            )}
        </Formik>
    )
}
