import { StyleSheet } from "react-native";

export const headerChatStyles = StyleSheet.create({
    container: {
        backgroundColor: "#171717",
        //height: 95
    },
    name: {
        color: "#fff",
        marginLeft: 10
    },
    content: {
        //flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        //paddingHorizontal: 16
        //backgroundColor: "red",

    },
    info: {
        flexDirection: "row",
        alignItems: "center",
        //backgroundColor: "green",

    }

});