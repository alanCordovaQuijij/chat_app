import { StyleSheet } from "react-native";

export const listUsersStyles = StyleSheet.create({
    content: {
        paddingHorizontal: 10,
       // marginBottom: 50,
        //paddingBottom: 50,
        gap: 10,
        backgroundColor: '#000'
    },
    item: {
        flexDirection: 'row',
        borderWidth: 1,
        borderBottomColor: "#333",
        paddingVertical: 10,
        alignItems: 'center',
        gap: 10
    },
    avatar: {
       // marginTop: 10,

    },
    name: {
        fontWeight: "600",
        color: "#fff",
        fontSize: 16,
    },
    email: {
         color: "#fff",
         opacity: 0.6,
         marginTop: 5
    }
});