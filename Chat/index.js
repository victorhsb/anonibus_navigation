import React, { useState, useEffect, useRef } from 'react';
import _ from "lodash"
import { FontAwesome5 } from '@expo/vector-icons';
import {
  View, Text, Image, ScrollView,
  TextInput, TouchableOpacity
} from 'react-native';
import firebase from '../config/firebase';
import api, { randomUser } from '../services/axios';
import { styles, UserName, SentTime } from "./styles"

export default function Chat() {
    const [user, setUser] = useState(null)
    const [messages, setMessages] = useState([])
    const scrollView = useRef(null)

    const db = firebase.firestore()

    const send = async (message, timed) => {
        try {
            var response = await api.post('/sendMessage', {
                message: message,
                user: user.name,
                avatar: user.picture,
                timed: timed,
            })
            console.log(response)
            scrollView.current.scrollToEnd({ animated: true })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        LoadAnonUser()
        let sentMessages = []

        // every 5 seconds clear the timed out messages
        let interval = setInterval(() => {
            if (!sentMessages) {
                return
            }

            const now = new Date().getTime()

            sentMessages = _.filter(sentMessages, v => {
                return _.isFinite(v.expiresAt) ? v.expiresAt > now : true
            })

            setMessages(sentMessages)
        }, 5000)

        // setup subscription to receive new messages
        const unsubscribe = db.collection("chats")
            .doc("chat_01").collection('messages')
            .onSnapshot({ includeMetadataChanges: false }, function (snapshot) {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        const { createdAt, expiresAt, message, user, avatar } = change.doc.data()
                        if (expiresAt > new Date().getTime) {
                            return
                        }
                        const id = change.doc.id
                        sentMessages.push({ createdAt, expiresAt, message, user, avatar, id })
                    }
                })
                sentMessages = _.orderBy(sentMessages, "createdAt")
                setMessages(sentMessages)
                scrollView.current ? scrollView.current.scrollToEnd({ animated: true }) : null;
            })

        return () => {
            unsubscribe()
            clearInterval(interval)
        }
    }, [])

    const LoadAnonUser = async () => {
        try {
            let response = await randomUser.get('/api/?results=1&nat=BR')
            const user = response.data.results[0];
            setUser({
                name: `${user.name.first} ${user.name.last}`,
                picture: user.picture.large
            })
            console.log('user', user)
        } catch(e) {
            console.log(error);
        }
    }

    return (
        <View style={styles.view}>
        {user &&
            <><TouchableOpacity onPress={LoadAnonUser}>
                <Image
                    style={styles.avatar}
                    source={{ uri: user.picture }} />
            </TouchableOpacity>
            <Text style={styles.userName}>{user.name}</Text></>
        }
            <ScrollView style={styles.scrollView} ref={scrollView}>
                { messages.length > 0 && messages.map(item => <UserMessage item={item} key={item.id} />)}
            </ScrollView>
            <ChatInput onSend={(message, timed) => send(message, timed)} />
        </View>)
}

const ChatInput = ({onSend}) => {
    let [ text, setText ] = useState('')
    let [ timed, setTimed ] = useState(false)
    const send = () => {
        onSend(text, timed)
        setText('')
        setTimed(false)
    }

    return <View style={styles.footer}>
        <TextInput
            style={styles.inputMessage}
            onChangeText={input => setText(input)}
            value={text} />
        <TouchableOpacity onPress={send} onLongPress={() => setTimed(!timed)} >
            <FontAwesome5 style={styles.sendButton} name={timed ? "hourglass-end" : "reply" } size={32} color={'#999'} />
        </TouchableOpacity>
    </View>

}

const UserMessage = ({item}) => {
    var date = new Date(item.createdAt)
    var displayTime = `${date.getHours()}:${date.getMinutes()}`
    var now = new Date()
    if (date.getDay() != now.getDay()) {
        displayTime = `${calculateNumberOfDays(item.createdAt, second)} dias atrás`
    }

    return <View style={styles.chatLine}>
        <Image style={styles.chatAvatar} source={{ uri: item.avatar }} />
        <View style={styles.chatContent}>
            <UserName>{item.user} <SentTime>{displayTime}</SentTime></UserName>
            <Text>{item.message.toString()}</Text>
        </View>
    </View>
}

function calculateNumberOfDays(first, second) {
    let dif = second - first
    // the difference between the two timestamps divided by
    // (1000 * 3600 * 24) which is the amount of nanoseconds in a day
    return dif / (1000 * 3600 * 24)
}
