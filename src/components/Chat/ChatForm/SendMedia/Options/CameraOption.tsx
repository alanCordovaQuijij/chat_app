import React from 'react';
import { Button, IconButton } from 'react-native-paper';
import { View, Text, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ChatMessage } from '../../../../../api/chat/chatMessage';

interface Iprops {
  closeModal: () => void;
  chatId: string;
}
const chatMessageController = new ChatMessage();

export const CameraOption = ({ chatId, closeModal }: Iprops) => {



const takePhoto = async () => {
  try {
    const result = await launchCamera({
      mediaType: 'photo',
      includeBase64: false,
      quality: 1,
      saveToPhotos: true, // Opcional: guarda la foto en la galería del dispositivo
    });

    console.log("result===>", JSON.stringify(result));

    if (result.didCancel) {
      console.log('Captura de imagen cancelada por el usuario');
      return;
    }

    if (result.errorCode) {
      console.error('Error al capturar imagen:', result.errorMessage);
      Alert.alert('Error', 'No se pudo capturar la imagen');
      return;
    }

    const selected = result.assets?.[0];
    if (selected) {
      console.log('Imagen capturada:', selected);

      let dataImage = {
        image: {
          uri: selected.uri,
          name: selected.fileName || 'foto.jpg',
          type: selected.type || 'image/jpeg',
        }
      };

      const resp = await chatMessageController.sendMessage(chatId, null, dataImage);

      closeModal();
    }
  } catch (error: any) {
    console.error('Error al capturar imagen:', error?.message || error);
    Alert.alert('Error', 'Ocurrió un problema al capturar la imagen');
  }
};

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
      <IconButton
        icon="camera"
        size={24}
      />
      <Button onPress={takePhoto}>
        Tomar foto
      </Button>
    </View>
  );
};
