import React from 'react';
import { Button, IconButton } from 'react-native-paper';
import { View, Text, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { ChatMessage } from '../../../../../api/chat/chatMessage';

interface Iprops {
  closeModal: () => void;
  chatId: string;
}
const chatMessageController = new ChatMessage();

export const GalleryOption = ({ chatId, closeModal }: Iprops) => {



    const openGallery = async () => {
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
          let dataImage = {
            image: {
              uri: selected.uri,
              name: selected.fileName || 'avatar.jpg',
              type: selected.type || 'image/jpeg',
            }
          }

            const resp = await chatMessageController.sendMessage(chatId, null, dataImage);

            closeModal();
 
        }
      } catch (error: any) {
        console.error('Error al seleccionar imagen2:', error?.message || error);
        Alert.alert('Error', 'Ocurrió un problema al seleccionar la imagen');
      }
    };





  return (
    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
      <IconButton
        icon="image"
        size={24}
        onPress={() => console.log('Abrir galería para chat', chatId)}
      />
      <Button onPress={openGallery}>
        Desde galería
      </Button>
    </View>
  );
};
