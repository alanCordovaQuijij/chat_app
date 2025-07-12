import { StyleSheet } from "react-native";

export const sendMediaStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    backgroundColor: '#171717',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 5,
  },
  title: {
    marginBottom: 16,
    fontWeight: 'bold',
    color:"#fff"
  },
  cancelBtn: {
    marginTop: 12,
  },

});