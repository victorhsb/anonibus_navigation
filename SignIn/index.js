import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";

import { AuthContext } from '../context';

import { styles, AuthInput } from './styles';
import { Button } from '../Components/Button';

import firebase from 'firebase'; 

export default ({ navigation }) => {
    const { signIn } = React.useContext(AuthContext)
    const [mail, setMail] = useState('')
    const [pwd, setPwd] = useState('')
    let [ forgot, setForgot ] = useState(false)

    const handleSignIn = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(mail, pwd)
            .then(() => signIn())
            .catch(error => alert(error))
    }

    if (forgot) {
        return <ForgotForm mail={mail} setMail={setMail} close={() => setForgot(false)} />
    }

    return (
        <View style={styles.container}>
            <View style={styles.viewFields}>
                <AuthInput
                    autoCompleteType="email"
                    placeholder="email@domain.com"
                    onChangeText={text => {setMail(text)}}
                    value={mail} />
                <AuthInput
                    autoCompleteType="password"
                    onChangeText={text => setPwd(text)}
                    value={pwd} secureTextEntry={true} />
            </View>
            <TouchableOpacity style={styles.forgotPwd} onPress={() => setForgot(true)}>
                <Text>Esqueci minha senha</Text>
            </TouchableOpacity>
            <Button title="Acessar" icon="sign-in-alt" onPress={() => handleSignIn()} />
            <Button title="Criar Conta" onPress={() => navigation.push("CreateAccount")} />
        </View>
    )
}

const ForgotForm = ({ mail, setMail, close }) => {
    const handleForgotPwd = async () => {
        if (!mail) {
            alert("email cannot be empty")
            return
        }
        try {
            firebase.auth().
                sendPasswordResetEmail(mail)
        } catch (e) {
            alert(e)
            console.log(e)
        } finally {
            close()
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.viewField}>
                <AuthInput
                    autoCompleteType="email"
                    placeholder="email@domain.com"
                    onChangeText={text => {setMail(text)}}
                    value={mail} />
            </View>
            <Button active={mail != ""} title="Enviar" onPress={() => handleForgotPwd()} />
            <Button title="Cancelar" onPress={() => close()} />
        </View>
    )
}
