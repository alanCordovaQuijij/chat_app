import { ScrollView, View, InteractionManager, ActivityIndicator } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { DataChatMessage } from '../../../api/chat/chatMessage';
import { listMessagesStyles } from './ListMessages.styles';
import { ItemText } from './ItemText/ItemText';
import { ItemImage } from './ItemImage/ItemImage';

interface Iprop {
  messages: DataChatMessage[];
}

export const ListMessages = ({ messages }: Iprop) => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const lastMessageId = useRef<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  const totalImages = messages.filter((msg) => msg.type === 'IMAGE').length;

  useEffect(() => {
    const timer = setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {
        setLoading(false);
        // Scroll después de ocultar loader y asegurar renderizado
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: false });
        }, 100); // un pequeño delay extra
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const last = messages[messages.length - 1]?._id;
    if (last && last !== lastMessageId.current) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
      lastMessageId.current = last;
    }
  }, [messages]);

  if (loading) {
    return (
      <View style={[listMessagesStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      style={listMessagesStyles.container}
      contentContainerStyle={listMessagesStyles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {messages.map((item) => {
        if (item.type === 'TEXT') {
          return <ItemText key={item._id} message={item} />;
        }
        if (item.type === 'IMAGE') {
          return <ItemImage key={item._id} message={item} />;
        }
        return null;
      })}
    </ScrollView>
  );
};
