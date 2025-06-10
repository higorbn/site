// modelo/conexao.js
const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect('mongodb://127.0.0.1:27017/livraria', options)
    .then(() => console.log("✅ Conectado ao MongoDB"))
    .catch((erro) => console.error("❌ Erro ao conectar no MongoDB:", erro));

module.exports = mongoose;