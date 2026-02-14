// server.js
const express = require("express");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json"); // chave do Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(express.json());

// Rota para enviar notificação
app.post("/send-push", async (req, res) => {
  const { token, title, body } = req.body;

  const message = {
    notification: { title, body },
    token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Notificação enviada:", response);
    res.send({ success: true, response });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, error: err.message });
  }
});

app.listen(8000, () => console.log("Servidor rodando na porta 8000"));
