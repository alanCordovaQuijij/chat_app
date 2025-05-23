import { StyleSheet } from "react-native";

export const loginFormStyles = StyleSheet.create({
  // viewInput: {
  //     marginBottom: 5

  //   },
  //   input:{
  //     backgroundColor: "#202020",
  //     color: "#fff",
  //     fontSize: 18,
  //     marginVertical: 5
  //   },
  //   btn: {
  //     marginTop: 10
  //   },
  //   inputError: {
  //     backgroundColor: "#270c0d"
  //   }
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
  },
  link: {
    marginTop: 24,
    textAlign: 'center',
    color: '#0077B6',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  }

  });