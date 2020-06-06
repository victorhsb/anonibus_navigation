import React, { useState, useEffect, useRef } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import {
  View, Text, Image, ScrollView,
  TextInput, TouchableOpacity
} from 'react-native';
import firebase from '../config/firebase';
import api from '../services/axios';
import axios from 'axios';
import { styles } from "./styles"

export default function Chat() {
    const [user, setUser] = useState(null)
    const [messages, setMessages] = useState([])
    const [textBox, setTextBox] = useState('')
    const scrollView = useRef(null)

    const db = firebase.firestore()

    const salvar = async () => {
        try {
            var response = await api.post('/sendMessage', {
                message: textBox,
                user: user.name,
                avatar: user.picture,
            })
            console.log(response)
            setTextBox('')
            scrollView.current.scrollToEnd({ animated: true })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        LoadAnonUser()
        let messages_enviadas = []
        const unsubscribe = db.collection("chats")
          .doc("sala_01").collection('mensagens')
          .onSnapshot({ includeMetadataChanges: false }, function (snapshot) {
            snapshot.docChanges().forEach(function (change) {
              if (change.type === "added") {
                const { message, user, avatar } = change.doc.data()
                const id = change.doc.id
                messages_enviadas.push({ message, user, avatar, id })
              }
            })
            setMessages([...messages_enviadas])
            scrollView.current ? scrollView.current.scrollToEnd({ animated: true }) : null;
          })
        return unsubscribe
    }, [])

    const LoadAnonUser = async () => {
        try {
            let response = await axios.get('https://randomuser.me/api/?results=1&nat=BR')
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
                { messages.length > 0 && messages.map(item => (
                <View key={item.id} style={styles.chatLine}>
                    <Image style={styles.chatAvatar} source={{ uri: item.avatar }} />
                    <View style={{ flexDirection: 'column', marginTop: 5 }}>
                        <Text style={{ fontSize: 12, color: '#999' }}>{item.user}</Text>
                        {typeof (item.message) == "string" && <Text>{item.message}</Text> }
                    </View>
                </View>
                ))
            }
            </ScrollView>
            <View style={styles.footer}>
                <TextInput
                  style={styles.inputMessage}
                  onChangeText={text => setTextBox(text)}
                  value={textBox} />
                <TouchableOpacity onPress={salvar}>
                    <FontAwesome5 style={styles.sendButton} name="reply" size={32} color={'#999'} />
                </TouchableOpacity>
            </View>
        </View>)
}
