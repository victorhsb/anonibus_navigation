import React from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

import { AuthContext } from '../context';

import { } from './styles';

import firebase from 'firebase';


export default SignIn = ({ navigation }) => {



  const { signIn } = React.useContext(AuthContext)
  const [textEmail, setTextEmail] = React.useState('')
  const [textPassword, setTextPassword] = React.useState('')

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(textEmail, textPassword)
      .then(() => signIn())
      .catch(error => alert(error))

  }

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <TextInput
          style={styles.input_mensagem}
          onChangeText={text => setTextEmail(text)}
          value={textEmail} />

        <TextInput
          style={styles.input_mensagem}
          onChangeText={text => setTextPassword(text.toLowerCase())}
          value={textPassword} secureTextEntry={true} />
      </View>


      <Button title="Acessar" onPress={() => handleSignIn()} />
      <Button title="Criar Conta" onPress={() => navigation.push("CreateAccount")} />
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
    borderRadius: 5
  },
  input_mensagem: {
    borderColor: '#ccc',
    borderWidth: 1,
    flex: 1,
    borderRadius: 3,
    margin: 10,
    marginTop: 0,
    padding: 4
  },
  footer: {
    flexDirection: 'column',
    width: '100%',
    height: 100
  }
});

