import { StyleSheet } from "react-native";

export const chatFormStyles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderTopWidth: 1,
        borderColor: '#000',
        backgroundColor: "#171717",
        //backgroundColor: "#fff",    
        borderRadius: 20
    },
    input: {
        flex: 1,
        marginRight: 8,
        backgroundColor: "#29292b",
    },
    iconButton:{
        color: "#0891b2"
    }


});