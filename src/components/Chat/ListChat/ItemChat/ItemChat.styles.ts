import { StyleSheet } from "react-native";

export const itemChatStyles = StyleSheet.create({
    content: {
        //paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        height: 80,
        //width: "50%",
        gap: 10
    },
    avatar: {
        width: 60,
        height: 60
    },
    infoContent: {
        flex: 1,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#333",
        paddingVertical: 10,
        justifyContent: "space-between",
        height: "100%",
        //width: "50%"
    },
    info: {
        flex: 1
    },
    identity: {
        fontWeight: "600",
        color: "#fff",
        fontSize: 16,
        marginBottom: 5
    },
    message: {
        color: "#fff",
        opacity: 0.4,
        fontSize: 15
    },
    notify:{
        alignItems: "flex-end"
    },
    time: {
        opacity: 0.6,
        color: "#fff",
        fontSize: 12,
        marginBottom: 5
    },
    totalUnreadMessages: {
        //flex: 1,
        backgroundColor: "#06b6d4",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        width: 19,
        height: 19
    }
    ,
    totalUnread: {
        color: "#000",
        fontSize: 12,
        fontWeight: "bold"
    }
});