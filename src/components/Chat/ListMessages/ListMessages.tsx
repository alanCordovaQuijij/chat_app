import { ScrollView, View } from 'react-native';
import { useRef } from 'react';
import { DataChatMessage } from '../../../api/chat/chatMessage';
import { listMessagesStyles } from './ListMessages.styles';
import { ItemText } from './ItemText/ItemText';
import { ItemImage } from './ItemImage/ItemImage';

interface Iprop {
  messages: DataChatMessage[];
}

export const ListMessages = ({ messages }: Iprop) => {
  const scrollViewRef = useRef<ScrollView | null>(null);

  const handleInitialLayout = () => {
    scrollViewRef.current?.scrollToEnd({ animated: false }); // 👈 Sin animación, directo al final
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={listMessagesStyles.container}
      contentContainerStyle={listMessagesStyles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      onLayout={handleInitialLayout} // 👈 esto asegura el scroll inicial sin tirón
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
