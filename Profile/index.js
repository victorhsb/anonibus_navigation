import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "../Components/Button"

import { AuthContext } from '../context';

import firebase from 'firebase';

export default Profile = () => {
  const { signOut } = React.useContext(AuthContext)

  const handleSignOut = () => {
    firebase.auth().signOut().then(function () {
      signOut();
    }).catch(function (error) {
      alert(error)
    });
  }

  return (
    <View style={styles.container}>
      <Text>PROFILE</Text>
      <Button title="Sair" icon="sign-out-alt" onPress={() => handleSignOut()} />
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
  }
});

