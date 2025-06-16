import { Text, TextInput } from 'react-native-paper'
import { Formik } from 'formik'
import { View } from 'react-native'
import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import Fuse from 'fuse.js';
import { DataChats } from '../../../../api/chat/chat';
import { searchChatstyles } from './SearchChat.styles';

interface Iprops {
    data: DataChats[],
    setData: React.Dispatch<React.SetStateAction<DataChats[]>>
}
const validationSchema = Yup.object().shape({
    nombre: Yup.string()
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'El texto debe contener letras')
        .min(2, 'Debe tener al menos 2 caracteres')
    //.required('El nombre es obligatorio'),
});

export const SearchChat = ({ data, setData }: Iprops) => {

    const [nombreBusqueda, setNombreBusqueda] = useState('');
    const [originalData] = useState(data);

    const realizarBusqueda = (texto: string) => {
        console.log("Palabra busqueda===>", texto);
        // Configuración de Fuse
        const fuse = new Fuse(data, {
            keys: [
                'participant_one.email',
                'participant_one.firstname',
                'participant_one.lastname',
                'participant_two.email',
                'participant_two.firstname',
                'participant_two.lastname',
            ],
            threshold: 0.1, // Más bajo = más preciso, más alto = más tolerante
        });
        const resultadosFuse = fuse.search(texto);
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
            setData(originalData);
        }
    }, [nombreBusqueda]);

    return (
        <Formik
            initialValues={{ texto: '' }}
            validationSchema={validationSchema}
            //onSubmit={handleSubmit}
            //onSubmit={({ nombre }) => realizarBusqueda(nombre)}
            onSubmit={() => { }} // No se usa más
        >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                <View style={searchChatstyles.content}>

                    <TextInput
                        label="Buscar"
                        value={values.texto}
                        //onChangeText={handleChange('nombre')}
                        onChangeText={(text) => {
                            setFieldValue('texto', text);
                            setNombreBusqueda(text); // ✅ sincroniza el input con el estado local
                        }}
                        onBlur={handleBlur('texto')}
                        mode="outlined"
                        keyboardType="default"
                        autoCapitalize="none"
                        style={searchChatstyles.input}
                        error={touched.texto && !!errors.texto}
                        contentStyle={{ color: '#fff' }}

                    />
                    {touched.texto && errors.texto && (
                        <Text style={searchChatstyles.errorText}>{errors.texto}</Text>
                    )}

                </View>
            )}
        </Formik>
    )
}
