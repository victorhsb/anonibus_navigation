import functions from "firebase-functions"
import admin from "firebase-admin"
import path from "path"

admin.initializeApp()

let db = admin.firestore()

exports.sendMessage = functions.https.onRequest(async (request, response) => {
	let queryRef = db
		.collection("chats")
		.doc("sala_01")
		.collection("mensagens")
		.doc()

	try {
		await queryRef.set({
			message: request.body.message,
			user: request.body.user,
			avatar: request.body.avatar,
		})
		response.json({ ok: true })
	} catch (e) {
		response.json({ error: true })
	}
})

exports.imageUpdateFirestore = functions.storage.object().onFinalize(async (object) => {
	const filePath = object.name
	const fileName = path.basename(filePath)

	await db
		.collection("imagens")
		.doc(fileName)
        .set({image: object })

	console.log(fileName, object)

	return
})
