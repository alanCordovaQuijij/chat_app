import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, IconButton} from 'react-native-paper';

export const IconBack = () => {
  const navigation = useNavigation();

  return (
    // <IconButton
    //   icon="camera"       // ← nombre del ícono, depende del pack que uses
    //   size={24}
    //   onPress={() => navigation.goBack()}
    // />
    <Button icon="camera">Press me</Button>
  );
};
