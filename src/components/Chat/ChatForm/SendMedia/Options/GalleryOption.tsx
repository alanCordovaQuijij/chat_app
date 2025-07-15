import React from 'react';
import { Button, IconButton } from 'react-native-paper';
import { View, Text } from 'react-native';

interface Iprops {
  closeModal: () => void;
  chatId: string;
}

export const GalleryOption = ({ chatId, closeModal }: Iprops) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
      <IconButton
        icon="image"
        size={24}
        onPress={() => console.log('Abrir galería para chat', chatId)}
      />
      <Button onPress={() => console.log('Desde galería')}>
        Desde galería
      </Button>
    </View>
  );
};
