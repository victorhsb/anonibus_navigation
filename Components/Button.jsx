import React from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { FontAwesome5 } from '@expo/vector-icons';

export const Button = ({active = true, icon, title, onPress}) => {
    return <TouchableOpacity
        style={[ style.button, active ? style.active : style.inactive ]}
        onPress={active ? onPress : null}>
            <View style={style.container}>
            { icon && <FontAwesome5 name={icon} style={style.buttonIcon} />}
                <Text style={style.buttonText}>{title}</Text>
            </View>
        </TouchableOpacity>
}

const style = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    active : {
        backgroundColor: '#333'
    },
    inactive: {
        backgroundColor: '#666'
    },
    buttonIcon: {
        color: '#fff',
        alignSelf: 'center',
        marginRight: 5
    },
    buttonText: {
        alignSelf: 'center',
        color: '#fff'
    }
})
