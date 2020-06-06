import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

import { AuthContext } from '../context';

import { styles, AuthInput } from './styles';
import { Button } from '../Components/Button';

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
            <TouchableOpacity style={styles.forgotPwd} onPress={() => navigation.push("ForgotPassword")}>
                <Text>Esqueci minha senha</Text>
            </TouchableOpacity>
            <Button title="Acessar" onPress={() => handleSignIn()} />
            <Button title="Criar Conta" onPress={() => navigation.push("CreateAccount")} />
        </View>
    )
}
