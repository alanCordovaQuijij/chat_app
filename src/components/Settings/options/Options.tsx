import React from 'react'
import { Text } from 'react-native-paper'
import { AuthContextType, Usuario } from '../../../context/AuthContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../../navigations/stacks/AuthNavigation';
import { Alert, TouchableOpacity, View } from 'react-native';
import { optionsStyles } from './optionsStyles';
//import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import { screens } from '../../../utils/screens';
import { SettingsStackParamList } from '../../../navigations/stacks/SettingsNavigation';



interface Iprops extends Pick<AuthContextType, 'accesToken' | 'logout' | 'updateUser'> { }

export const Options = ({ accesToken, logout, updateUser }: Iprops) => {

    const navigation = useNavigation<NavigationProp<SettingsStackParamList>>();

//   const changeProfilePhoto = async () => {
//     try {
//       const res = await MultipleImagePicker.openPicker({
//         mediaType: 'image',
//         usedCameraButton: true,
//         maxSelectedAssets: 1,
//         isCrop: true,
//         isExportThumbnail: false,
//       });

//       if (res.length > 0) {
//         const selected = res[0];
//         console.log('Imagen seleccionada:', selected);

//         // Puedes subir la imagen aquí (por ejemplo con fetch o axios)
//         // También podrías usar updateUser con la URI de la imagen:
//         // updateUser({
//         //   profileImage: selected.realPath || selected.path,
//         // });

//         Alert.alert('Éxito', 'Foto de perfil actualizada');
//       }
//     } catch (error: any) {
//       console.log('Error al seleccionar imagen:', error?.message || error);
//     }
//   };

const goToChangeFirstName = () => {
  navigation.navigate('ChangeFirstNameScreen')
}

const goToChangeLastName = () => {
  navigation.navigate('ChangeLastNameScreen')
}

const changeProfilePhoto = async () => {
  try {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false, // Puedes poner true si necesitas el base64
      quality: 1, // Calidad de la imagen (1 = máxima)
    });

    console.log("result===>", JSON.stringify(result))
  
    if (result.didCancel) {
      console.log('Selección de imagen cancelada por el usuario');
      return;
    }

    if (result.errorCode) {
      console.error('Error al seleccionar imagen1:', result.errorMessage);
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
      return;
    }

    const selected = result.assets?.[0];
    if (selected) {
      console.log('Imagen seleccionada:', selected);

      // Aquí puedes usar selected.uri o selected.fileName o selected.type
      // Por ejemplo:
      let dataToUpdate = {
        avatar: {
          uri: selected.uri,
          name: selected.fileName || 'avatar.jpg',
          type: selected.type || 'image/jpeg',
        }
      }
       await updateUser(dataToUpdate);

      Alert.alert('Éxito', 'Foto de perfil actualizada');
    }
  } catch (error: any) {
    console.error('Error al seleccionar imagen2:', error?.message || error);
    Alert.alert('Error', 'Ocurrió un problema al seleccionar la imagen');
  }
};
    return (
        <View style={optionsStyles.content}>
            <TouchableOpacity style={optionsStyles.item} onPress={changeProfilePhoto}>
                <Text style={optionsStyles.text}>Cambiar foto de perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={optionsStyles.item} onPress={goToChangeFirstName}>
                <Text style={optionsStyles.text}>Cambiar nombre</Text>
            </TouchableOpacity>

            <TouchableOpacity style={optionsStyles.item} onPress={goToChangeLastName}>
                <Text style={optionsStyles.text}>Cambiar apellidos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[optionsStyles.item, optionsStyles.itemClose]} onPress={logout}>
                <Text style={optionsStyles.textClose}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    )
}
