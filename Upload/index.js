import React, { useState, useEffect } from "react"

//expo install expo-image-picker
import * as ImagePicker from "expo-image-picker"

import { ToastAndroid, Image } from "react-native"
import { Button } from "../Components/Button"

import firebase from "../config/firebase"

import { WrapperView, CorrecaoView, Content, styles } from "./styles"

export default function Upload() {
	const [image, setImage] = useState(null)

	uploadimage = async (uri) => {
		const response = await fetch(uri)
		const blob = await response.blob()
		const filename = new Date().getTime()

		var ref = firebase
			.storage()
			.ref()
			.child("upload/" + filename)

		ref.put(blob).then(function(snapshot) {
			snapshot.ref.getDownloadURL().then(function(downloadURL) {
				setImage(downloadURL)
			})
		})
	}

	selectImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			})
			if (!result.cancelled) {
				uploadimage(result.uri)
			}

			console.log(result)
		} catch (E) {
			ToastAndroid.showWithGravity(E.message, ToastAndroid.LONG, ToastAndroid.BOTTOM)
		}
	}

	return (
		<CorrecaoView>
			<WrapperView>
				<Content>
					{image && <Image source={{ uri: image }} style={styles.avatar} />}
					<Button title={image ? "Alterar imagem" : "Definir imagem" } onPress={selectImage}/>
				</Content>
			</WrapperView>
		</CorrecaoView>
	)
}
