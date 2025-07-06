import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import { chatFormStyles } from './ChatForm.style';
import { ChatMessage } from '../../../api/chat/chatMessage';

interface IProps {
  chatId: string;
}

const chatMessageController = new ChatMessage();

export const ChatForm = ({ chatId }: IProps) => {
  const [message, setMessage] = useState('');

  const handleSend = async() => {
    if (message.trim().length === 0) return;

    console.log('Mensaje enviado:', message, 'al chat:', chatId);
    // Aquí podrías llamar a tu función de enviar mensaje

    const resp = await chatMessageController.sendMessage(chatId, message);

    console.log("RESPUESTA ENVIAR MENSAJE===>",resp)

    setMessage(''); // limpiar input
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={chatFormStyles.content}
    >
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Escribe un mensaje..."
        mode="outlined"
        style={chatFormStyles.input}
        contentStyle={{ color: '#fff' }}

      />
      <IconButton
        icon="send"
        iconColor="#007AFF"
        onPress={handleSend}
        disabled={message.trim().length === 0
        }
      />
    </KeyboardAvoidingView>
  );
};
