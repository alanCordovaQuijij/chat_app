import {ScrollView, View} from 'react-native';
import {DataChatMessage} from '../../../api/chat/chatMessage';
import {Text} from 'react-native-paper';
import {listMessagesStyles} from './ListMessages.styles';
import {ItemText} from './ItemText/ItemText';
import { ItemImage } from './ItemImage/ItemImage';

interface Iprop {
  messages: DataChatMessage[];
}

export const ListMessages = ({messages}: Iprop) => {
  return (
    <ScrollView
      style={listMessagesStyles.container}
      alwaysBounceVertical={false}>
      <View style={listMessagesStyles.content}>
        {messages.map((item, index) => {
          if (item.type === 'TEXT') {
            return (
              //<Text key={item._id}> {item.message}</Text>
              <ItemText key={item._id} message={item} />
            );
          }

          if (item.type === 'IMAGE') {
            //return( <Text key={item._id}> MSG- IMAGE</Text>);
            return( <ItemImage key={item._id} message={item}/>);

            
          }
        })}
      </View>
    </ScrollView>
  );
};
