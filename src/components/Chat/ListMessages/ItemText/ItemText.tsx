import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {DataChatMessage} from '../../../../api/chat/chatMessage';
import {useAuth} from '../../../../hooks/useAuth';
import {itemTextstyled} from './ItemText.style';
import moment from 'moment';

interface Iprop {
  message: DataChatMessage;
}

export const ItemText = ({message}: Iprop) => {
  const {user} = useAuth();
  const isMe = user?._id === message.user._id;

  const styles = itemTextstyled(isMe);
  const fecha = moment(message.createdAt).format("HH:mm")

  return (
    <View style={styles.content}>
      <View style={styles.message}>
        <Text style={styles.text}>{message.message}</Text>
        <Text style={styles.date}>{fecha}</Text>
      </View>
    </View>
  );
};
