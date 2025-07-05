import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import { chatFormStyles } from './ChatForm.style';

interface IProps {
  chatId: string;
}

export const ChatForm = ({ chatId }: IProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim().length === 0) return;

    console.log('Mensaje enviado:', message, 'al chat:', chatId);
    // Aquí podrías llamar a tu función de enviar mensaje

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
