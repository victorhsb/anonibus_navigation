import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
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
  const [scrollview, setScrollview] = useState('')

  const db = firebase.firestore()

  const salvar = () => {
    api.post('/sendMessage', {
      message: textBox,
      user: user.name,
      avatar: user.picture,
    })
      .then(function () {
        // setMessages([...messages, textBox])
        setCaixaTexto('')
        scrollview.scrollToEnd({ animated: true })
      }).catch(function () {

      })
  }

  useEffect(() => {
    carregauserAnonimo()
    let messages_enviadas = []
    const unsubscribe = db.collection("chats")
      .doc("sala_01").collection('messages')
      .onSnapshot({ includeMetadataChanges: false }, function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            const { message, user, avatar } = change.doc.data()
            const id = change.doc.id
            messages_enviadas.push({ message, user, avatar, id })
          }
        })
        setMessages([...messages_enviadas])
        scrollview ? scrollview.scrollToEnd({ animated: true }) : null;
      })
    return () => {
      unsubscribe()
    }
  }, [])

  const LoadAnonUser = () => {
    axios.get('https://randomuser.me/api/')
      .then(function (response) {
        const user = response.data.results[0];
        // setDistance(response.data.distance)
        setUser({
          name: `${user.name.first} ${user.name.last}`,
          picture: user.picture.large
        })
        console.log('user', user)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <View style={styles.view}>
      {user &&
        <>
          <TouchableOpacity onPress={LoadAnonUser}>
            <Image
              style={styles.avatar}
              source={{ uri: user.picture }} />
          </TouchableOpacity>
          <Text style={styles.userName}>{user.name}</Text>
        </>
      }
      <ScrollView style={styles.scrollview} ref={(view) => { setScrollview(view) }}>
        {
          messages.length > 0 && messages.map(item => (
            <View key={item.id} style={styles.chatLine}>
              <Image style={styles.chatAvatar} source={{ uri: item.avatar }} />
              <View style={{ flexDirection: 'column', marginTop: 5 }}>
                <Text style={{ fontSize: 12, color: '#999' }}>{item.user}</Text>
                {typeof (item.message) == "string" ?
                  <Text>{item.message}</Text>
                  :
                  <Text> </Text>
                }
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
          <Ionicons style={{ margin: 3 }} name="md-send" size={32} color={'#999'} />
        </TouchableOpacity>
      </View>
    </View>)
}
