import React from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

import { AuthContext } from '../context';

import { } from './styles';

import firebase from 'firebase'; 

export default ({ navigation }) => {
    const { signIn } = React.useContext(AuthContext)
    const [mail, setMail] = React.useState('')
    const [pwd, setPwd] = React.useState('')

    const handleSignIn = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(mail, pwd)
            .then(() => signIn())
            .catch(error => alert(error))
    }

    return (
        <View style={styles.container}>
            <View style={styles.view_fields}>
                <TextInput
                  style={styles.input_auth}
                  onChangeText={text => {setMail(text)}}
                  value={mail} />

                <TextInput
                  style={styles.input_auth}
                  onChangeText={text => setPwd(text)}
                  value={pwd} secureTextEntry={true} />
            </View>
            <Button style={styles.button} title="Acessar" onPress={() => handleSignIn()} />
            <Button style={styles.button} title="Criar Conta" onPress={() => navigation.push("CreateAccount")} />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
    color: "#ccc"
  },
  input_auth: {
    borderColor: '#ccc',
    borderWidth: 1,
    flex: 1,
    borderRadius: 3,
    margin: 10,
    marginTop: 0,
    padding: 4
  },
  view_fields: {
    flexDirection: 'column',
    width: '100%',
    height: 100
  }
});

