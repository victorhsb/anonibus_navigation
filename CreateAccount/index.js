import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Button } from "../Components/Button"

import { AuthContext } from '../context';

import firebase from 'firebase';

export default CreateAccount = () => {
  const [mail, setMail] = React.useState('')
  const [textPassword, setTextPassword] = React.useState('')

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(mail, textPassword)
      .then(() => signUp())
      .catch(error => alert(error))
  }

  const { signUp } = React.useContext(AuthContext)

  return (
    <View style={styles.container}>
      <View style={styles.view_fields}>
        <TextInput
          style={styles.input_auth}
          onChangeText={text => { console.log(text); setMail(text.toLowerCase()) }}
          value={mail} />

        <TextInput
          placeholder="Digite sua senha"
          style={styles.input_auth}
          onChangeText={text => setTextPassword(text)}
          value={textPassword} secureTextEntry={true} />
      </View>
      <Button title="Criar Conta" onPress={() => handleSignUp()} />
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

