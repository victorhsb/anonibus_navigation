var functions = require("firebase-functions")
var admin = require("firebase-admin")
var path = require("path")

admin.initializeApp()

let db = admin.firestore()

exports.sendMessage = functions.https.onRequest((request, response) => {
	let queryRef = db
		.collection("chats")
		.doc("sala_01")
		.collection("mensagens")
		.doc()

		queryRef.set({
			message: request.body.message,
			user: request.body.user,
			avatar: request.body.avatar,
            expiresAt: request.body.expiresAt,
        }).then(() => {
            response.json({ ok: true })
        }).catch(e => {
            response.json({ error: true, data: e })
        })
})

exports.imageUpdateFirestore = functions.storage.object().onFinalize((object) => {
	const filePath = object.name
	const fileName = path.basename(filePath)
    console.log(fileName, object)

	db.collection("imagens")
        .doc(fileName)
        .set({image: object })


	return
})
