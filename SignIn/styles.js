import { StyleSheet, TextInput } from "react-native"
import styled from 'styled-components/native';

export const AuthInput = styled(TextInput)`
    borderColor: #ccc;
    borderWidth: 1px;
    flex: 1;
    borderRadius: 3px;
    marginVertical: 5px;
    marginHorizontal: 5%;
    paddingHorizontal: 4px;
    paddingVertical: 4px;
`

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    viewFields: {
        flexDirection: 'column',
        width: '100%',
        height: 100
    },
    forgotPwd: {
        marginBottom: 15,
    }
});
