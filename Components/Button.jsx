import React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

export const Button = ({style, title, onPress}) => {
    return <TouchableOpacity
        style={[ defaultButtonStyle.button ]}
        onPress={onPress}>
            <Text style={defaultButtonStyle.buttonText}>{title}</Text>
        </TouchableOpacity>
}

const defaultButtonStyle = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#333'
    },
    buttonText: {
        color: '#fff'
    }
})
