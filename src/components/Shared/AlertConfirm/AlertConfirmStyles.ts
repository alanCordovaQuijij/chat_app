import { StyleSheet } from "react-native";

export const StylesAlertConfim =  StyleSheet.create({
    header: {
        backgroundColor: "#171717",
        borderBottomColor: "#171717",
    },
    titleText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },

     overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    marginRight: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#eee',
    borderRadius: 6,
  },
  cancelText: {
    color: '#333',
  },
  confirmButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#007BFF',
    borderRadius: 6,
  },
  dangerButton: {
    backgroundColor: '#D32F2F',
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  disabledButton: {
  opacity: 0.6,
},
})