import { Formik } from 'formik'
import React from 'react'
import { Alert, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import * as Yup from 'yup';
import { changeFirstNameStyles } from './changeFirstName.styles';
import { useAuth } from '../../../hooks/useAuth';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SettingsStackParamList } from '../../../navigations/stacks/SettingsNavigation';


const validationSchema = Yup.object().shape({
      nombre: Yup.string()
        .min(4, 'Mínimo 4 caracteres')
        .required('Este campo es obligatorio'),
});



export const ChangeFirstNameScreen = () => {

    const { updateUser} = useAuth();
    const navigation = useNavigation<NavigationProp<SettingsStackParamList>>();

      const handleSubmit = async(values: any) => {
        console.log('Datos enviados:', values);
        // Aquí puedes llamar a tu función de LOGIN

        try {
        let dataToUpdate = {
          firstname: values.nombre
        }
        await updateUser(dataToUpdate);

        values.nombre = ''
        //Alert.alert(`Nombre actualizado!`);
        
        if(navigation.canGoBack()){
          navigation.goBack()
        }
        } catch (error: any) {
            Alert.alert(`${error?.message}`);
        }
    };



  return (
        <Formik
            initialValues={{ nombre: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={changeFirstNameStyles.container}>

                    <TextInput
                        label="Nombre"
                        value={values.nombre}
                        onChangeText={handleChange('nombre')}
                        onBlur={handleBlur('nombre')}
                        mode="outlined"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={changeFirstNameStyles.input}
                        error={touched.nombre && !!errors.nombre}
                    />
                    {touched.nombre && errors.nombre && (
                        <Text style={changeFirstNameStyles.errorText}>{errors.nombre}</Text>
                    )}


                    <Button
                        mode="contained"
                        onPress={() => handleSubmit()}
                        style={changeFirstNameStyles.button}
                        contentStyle={{ paddingVertical: 6 }}
                    >
                        Cambiar
                    </Button>
                </View>
            )}
        </Formik>  
        )
}
