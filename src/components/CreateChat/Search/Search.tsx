import { Text, TextInput } from 'react-native-paper'
import { IUser } from '../../../api/auth/user'
import { Formik } from 'formik'
import { View } from 'react-native'
import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { searchUsersStyles } from './SearchUser.styles';
import debounce from 'lodash/debounce';
import Fuse from 'fuse.js';

interface Iprops {
    data: IUser[],
    setData: React.Dispatch<React.SetStateAction<IUser[]>>
}
const validationSchema = Yup.object().shape({
    nombre: Yup.string()
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'El nombre solo debe contener letras')
        .min(2, 'Debe tener al menos 2 caracteres')
    //.required('El nombre es obligatorio'),
});

export const Search = ({ data, setData }: Iprops) => {

    const [nombreBusqueda, setNombreBusqueda] = useState('');



    const realizarBusqueda = (nombre: string) => {
        console.log("Palabra busqueda===>", nombre);
        // Configuración de Fuse
        const fuse = new Fuse(data, {
            keys: ['email', 'firstname', 'lastname'],
            threshold: 0.5, // Más bajo = más preciso, más alto = más tolerante
        });
        const resultadosFuse = fuse.search(nombre);
        const coincidencias = resultadosFuse.map(result => result.item);
        console.log("COINCIDENCIAS====>", coincidencias)
        setData(coincidencias);
    }; 


    const debouncedBusqueda = useCallback(debounce(realizarBusqueda, 0), []);

    // ✅ Este useEffect está ahora fuera del bloque de Formik y escucha cambios
    useEffect(() => {
        if (nombreBusqueda.length >= 2) {
            debouncedBusqueda(nombreBusqueda);
        } else if (nombreBusqueda.length === 0) {
            // 👉 Restaurar la lista completa cuando el input esté vacío
            setData(data);
        }
    }, [nombreBusqueda]);

    return (
        <Formik
            initialValues={{ nombre: '' }}
            validationSchema={validationSchema}
            //onSubmit={handleSubmit}
            //onSubmit={({ nombre }) => realizarBusqueda(nombre)}
            onSubmit={() => { }} // No se usa más

        >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                <View style={searchUsersStyles.content}>

                    <TextInput
                        label="Buscar por nombre"
                        value={values.nombre}
                        //onChangeText={handleChange('nombre')}
                        onChangeText={(text) => {
                            setFieldValue('nombre', text);
                            setNombreBusqueda(text); // ✅ sincroniza el input con el estado local
                        }}
                        onBlur={handleBlur('nombre')}
                        mode="outlined"
                        keyboardType="default"
                        autoCapitalize="none"
                        style={searchUsersStyles.input}
                        error={touched.nombre && !!errors.nombre}
                    />
                    {touched.nombre && errors.nombre && (
                        <Text style={searchUsersStyles.errorText}>{errors.nombre}</Text>
                    )}

                </View>
            )}
        </Formik>
    )
}
