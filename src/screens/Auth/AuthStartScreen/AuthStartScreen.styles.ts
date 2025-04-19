import { StyleSheet } from "react-native";

export const authStartScreenStyles = StyleSheet.create({
    content: {
      flex: 1,
      position: 'relative'
    //   margin: 0,
    //   justifyContent: 'space-between',
    //   backgroundColor: 'red'
    },
    img: {
      // Aquí puedes agregar propiedades para tu imagen
      position: 'absolute',
      width: "100%",
      height: "100%",
      resizeMode: 'cover',
      marginVertical: 0
    },
    title:{
        color: "#fff",
        textAlign: 'center',
        fontSize: 40,
        //backgroundColor: 'yellow',
        fontWeight: 'bold',
        //marginBottom: 20
    },
    description:{
        color: "#fff",
        //opacity: 0.6,
        textAlign: 'center',
        marginBottom: 10
    },
    btn:{
        color: "#0891b2",
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 40
    }
  });