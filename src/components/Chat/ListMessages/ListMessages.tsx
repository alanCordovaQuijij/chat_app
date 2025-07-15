import {
  ScrollView,
  View,
  InteractionManager,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {DataChatMessage} from '../../../api/chat/chatMessage';
import {listMessagesStyles} from './ListMessages.styles';
import {ItemText} from './ItemText/ItemText';
import {ItemImage} from './ItemImage/ItemImage';
import type {FlatList as FlatListType} from 'react-native';
interface Iprop {
  messages: DataChatMessage[];
}

export const ListMessages = ({messages}: Iprop) => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const flatListRef = useRef<FlatListType<DataChatMessage>>(null); // 👈 solución aquí

  const lastMessageId = useRef<string | null>(null);
  const [loading, setLoading] = useState(true);

  const totalImages = messages.filter(msg => msg.type === 'IMAGE').length;

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     InteractionManager.runAfterInteractions(() => {
  //       setLoading(false);
  //       // Scroll después de ocultar loader y asegurar renderizado
  //       setTimeout(() => {
  //         scrollViewRef.current?.scrollToEnd({animated: false});
  //       }, 100); // un pequeño delay extra
  //     });
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, []);

  // useEffect(() => {
  //   const last = messages[messages.length - 1]?._id;
  //   if (last && last !== lastMessageId.current) {
  //     scrollViewRef.current?.scrollToEnd({animated: true});
  //     lastMessageId.current = last;
  //   }
  // }, [messages]);

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToOffset({offset: 0, animated: true});
    }
  }, [messages]);

  if (!loading) {
    return (
      <View
        style={[
          listMessagesStyles.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
  /*<ScrollView
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
    </ScrollView> */

    <FlatList
      ref={flatListRef}
      data={[...messages].reverse()} // invertir para que el más reciente esté abajo
      keyExtractor={item => item._id}
      renderItem={({item}) => {
        if (item.type === 'TEXT') {
          return <ItemText message={item} />;
        }
        if (item.type === 'IMAGE') {
          return <ItemImage message={item} />;
        }
        return null;
      }}
      contentContainerStyle={{
        ...listMessagesStyles.content,
        flexGrow: 1,
        justifyContent: 'flex-end',
      }}
      style={listMessagesStyles.container}
      inverted // muestra desde el final (más reciente)
      showsVerticalScrollIndicator={false}
    />
  );
};
