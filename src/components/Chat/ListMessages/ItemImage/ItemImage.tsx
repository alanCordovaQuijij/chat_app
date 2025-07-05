import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {itemImageStyled} from './ItemImage.style';
import {ENV} from '../../../../utils/constanst';
import {useAuth} from '../../../../hooks/useAuth';
import {DataChatMessage} from '../../../../api/chat/chatMessage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { GlobalsStackParamList } from '../../../../navigations/interfaces/interfacesScreen';

interface Iprop {
  message: DataChatMessage;
  width?: number;
}

export const ItemImage = ({message, width = 300}: Iprop) => {
  const {user} = useAuth();
  const isMe = user?._id === message.user._id;

  const styles = itemImageStyled(isMe);
  const imageUrl = `${ENV.BASE_PATH}/${message.message}`;
  const [height, setHeight] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const fecha = moment(message.createdAt).format('HH:mm');
  const navigation = useNavigation<NavigationProp<GlobalsStackParamList>>();

  useEffect(() => {
    let isMounted = true;
    Image.getSize(
      imageUrl,
      (w, h) => {
        if (isMounted) {
          const ratio = h / w;
          setHeight(width * ratio);
        }
      },
      () => {
        if (isMounted) setError(true);
      },
    );
    return () => {
      isMounted = false;
    };
  }, [imageUrl]);

  const onOpenImage = () => {
    navigation.navigate('ImageFullScreen' ,{
      uri: imageUrl
    });
  }

  return (
    <View style={styles.content}>
      <View style={styles.message}>
          {error ? (
            <Text style={{color: 'red'}}>❌ No se pudo cargar la imagen</Text>
          ) : height === null ? (
            <ActivityIndicator size="small" />
          ) : (
          <TouchableOpacity onPress={onOpenImage}>
            <Image
              source={{uri: imageUrl}}
              style={[{width, height}, styles.image]}
              resizeMode="contain"
            />
           </TouchableOpacity>
          )}
        <Text style={styles.date}>{fecha}</Text>
      </View>
    </View>
  );
};
