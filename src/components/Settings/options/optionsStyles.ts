import { StyleSheet } from "react-native";

export const optionsStyles = StyleSheet.create({
    content: {
        flex: 1,
        //alignItems: 'center',
        marginTop: 40,
        marginHorizontal: 20
    },
    item: {
        backgroundColor: "#171717",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
        opacity: 0.8
    },
    text: {
        color: "#fff",
        fontSize: 16
    },
    itemClose: {
        marginTop: 20,
    },
    textClose: {
        textAlign: 'center',
        color: 'red',
        fontSize: 16
    }

});