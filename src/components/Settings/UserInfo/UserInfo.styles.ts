import { StyleSheet } from "react-native";

export const userInfoStyles = StyleSheet.create({
    content: {
       // display: 'flex',
       // flex: 1,
        alignItems: 'center',
        gap: 8,
        //backgroundColor: "#000"
    },
    avatar: {
        marginTop: 40
    },
    indentity: {
        color: '#fff',
        fontSize: 26,
        fontWeight: "bold",
        marginTop: 20
    },
    email: {
        color:"#fff",
        fontSize: 16,
        //marginTop: 10,
        opacity: 0.9
    }
});