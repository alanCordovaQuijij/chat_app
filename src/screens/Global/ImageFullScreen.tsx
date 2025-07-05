import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { GlobalsStackParamList, RootStackParamList } from '../../navigations/interfaces/interfacesScreen';

export const ImageFullScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ImageFullScreen'>>();
  const { uri } = route.params;
  const navigation = useNavigation<NavigationProp<GlobalsStackParamList>>();

  return (
    <View style={styles.container}>
      {/* Botón de cerrar */}
      <IconButton
        icon="close"
        iconColor="#fff"
        size={28}
        onPress={() => navigation.goBack()}
        style={styles.closeButton}
      />

      {/* Imagen */}
      <Image source={{ uri }} style={styles.image} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  closeButton: {
    position: 'absolute',
    top: 40, // Ajusta según notch/status bar
    right: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
