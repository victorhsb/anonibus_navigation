var functions = require("firebase-functions")
var admin = require("firebase-admin")
var path = require("path")

admin.initializeApp()

let db = admin.firestore()

exports.sendMessage = functions
    .runWith({memory: '128MB', timeoutSeconds: 5})
    .https.onRequest(async (request, response) => {
            let queryRef = db
                .collection("chats")
                .doc("chat_01")
                .collection("/messages")
                .doc()

            try {
                let createdAt = new Date().getTime()
                let message = {
                    message: request.body.message,
                    user: request.body.user,
                    avatar: request.body.avatar,
                    createdAt: createdAt,
                }

                if (request.body.timed) {
                    // 10 minutes from now
                    message.expiresAt = ( createdAt + 600000 )
                }

                await queryRef.set(message)
                response.json({ ok: true })
            } catch (e) {
                response.json({ error: true, data: e })
            }
        }
    )

exports.imageUpdateFirestore = functions.storage.object().onFinalize((object) => {
	const filePath = object.name
	const fileName = path.basename(filePath)
    console.log(fileName, object)

	db.collection("imagens")
        .doc(fileName)
        .set({image: object })


	return
})
