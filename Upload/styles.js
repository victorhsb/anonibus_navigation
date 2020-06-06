import { StyleSheet } from "react-native"
import styled from "styled-components/native"

export const WrapperView = styled.View`
	flex-direction: column;
	border: 1px solid #000;
	justify-content: center;
	align-items: center;
	flex: 1;
`

export const CorrecaoView = styled.SafeAreaView`
	flex: 1;
`

export const Content = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`

export const styles = StyleSheet.create({
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 3,
        borderStyle: "solid",
        borderColor: "#333"
    }
})
