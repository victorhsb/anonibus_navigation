import {StyleSheet} from "react-native"

export const styles = StyleSheet.create({
    sendButton: {
        alignSelf: "center"
    },
    view: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        paddingTop: 50,
        borderBottomWidth: 1,
        borderColor: '#000'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#333'
    },
    chatAvatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#333',
        marginRight: 10
    },
    userName: {
        fontSize: 25,
        color: '#999'
    },
    footer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 50
    },
    inputMessage: {
        borderColor: '#e6e6e6',
        borderWidth: 1,
        flex: 1,
        borderRadius: 4,
        margin: 10,
        marginTop: 0,
        padding: 4
    },
    scrollView: {
        backgroundColor: '#fff',
        width: '100%',
        borderTopColor: '#e6e6e6',
        borderTopWidth: 1,
    },
    chatLine: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 10,
        marginRight: 60,
    }
})
