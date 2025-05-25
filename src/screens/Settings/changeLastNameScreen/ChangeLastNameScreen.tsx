import { Formik } from 'formik'
import React from 'react'
import { Alert, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import * as Yup from 'yup';
import { useAuth } from '../../../hooks/useAuth';
import { changeLastNameStyles } from './changeLastName.styles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SettingsStackParamList } from '../../../navigations/stacks/SettingsNavigation';


const validationSchema = Yup.object().shape({
      apellido: Yup.string()
        .min(4, 'Mínimo 4 caracteres')
        .required('Este campo es obligatorio'),
});



export const ChangeLastNameScreen = () => {
    const navigation = useNavigation<NavigationProp<SettingsStackParamList>>();

    const { updateUser} = useAuth();

      const handleSubmit = async(values: any) => {
        console.log('Datos enviados:', values);
        // Aquí puedes llamar a tu función de LOGIN

        try {
        let dataToUpdate = {
          lastname: values.apellido
        }
        await updateUser(dataToUpdate);

        values.apellido = ''
        //Alert.alert(`Apellido actualizado!`);

        if(navigation.canGoBack()){
          navigation.goBack()
        }
        } catch (error: any) {
            Alert.alert(`${error?.message}`);
        }
    };



  return (
        <Formik
            initialValues={{ apellido: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={changeLastNameStyles.container}>

                    <TextInput
                        label="Apellido"
                        value={values.apellido}
                        onChangeText={handleChange('apellido')}
                        onBlur={handleBlur('apellido')}
                        mode="outlined"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={changeLastNameStyles.input}
                        error={touched.apellido && !!errors.apellido}
                    />
                    {touched.apellido && errors.apellido && (
                        <Text style={changeLastNameStyles.errorText}>{errors.apellido}</Text>
                    )}


                    <Button
                        mode="contained"
                        onPress={() => handleSubmit()}
                        style={changeLastNameStyles.button}
                        contentStyle={{ paddingVertical: 6 }}
                    >
                        Cambiar
                    </Button>
                </View>
            )}
        </Formik>  )
}
