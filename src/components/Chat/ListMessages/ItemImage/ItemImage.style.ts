import {StyleSheet} from 'react-native';

// export const itemTextStyles = StyleSheet.create({
//   container: {
//     //paddingTop: 20
//   },
//   content: {
//     //paddingHorizontal: 10,
//     //paddingBottom: 15
//   },
// });

export const itemImageStyled = (isMe: boolean) => {
  return StyleSheet.create({
    content: {
      flexDirection: 'row',
      justifyContent: isMe ? 'flex-end' : 'flex-start',
      marginHorizontal: 10,
      marginBottom: 10,
    },
    message: {
      flex: 1,
      backgroundColor: isMe ? '#0891b2' : '#202333',
      maxWidth: "80%",
      borderRadius: 10,
      padding:3
    },
    text: {
        color: "#fff"
    },
    date:{
        opacity: 0.6,
        color: "#fff",
        fontSize: 12,
        marginTop: 2,
        textAlign: "right"
    },
    image: {
      borderRadius: 10
    }
  });
};
