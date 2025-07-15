import React, {useState} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import {IconButton, Text, Button} from 'react-native-paper';
import {sendMediaStyles} from './SendMedia.styles';
import {GalleryOption} from './Options/GalleryOption';

interface IProps {
  chatId: string;
}

export const SendMedia = ({chatId}: IProps) => {
  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  return (
    <>
      <IconButton icon="plus" iconColor="#007AFF" onPress={openModal} />

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}>
        {/* Dismiss background */}
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={sendMediaStyles.backdrop} />
        </TouchableWithoutFeedback>

        <View style={sendMediaStyles.modalContent}>
          <Text variant="titleMedium" style={sendMediaStyles.title}>
            Seleccionar medio
          </Text>

          {/*           <Button onPress={() => console.log('Desde galería')}>Desde galería</Button>*/}
          <GalleryOption chatId={chatId} closeModal={closeModal} />
          <Button onPress={() => console.log('Tomar foto')}>Tomar foto</Button>

          <Button
            onPress={closeModal}
            rippleColor={'#29292b'}
            textColor="#06b6d4"
            style={sendMediaStyles.cancelBtn}>
            Cancelar
          </Button>
        </View>
      </Modal>
    </>
  );
};
