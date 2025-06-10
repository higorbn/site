const banco = require('./conexao'); // com './' indicando que está na mesma pasta

const LivroSchema = new banco.Schema({
    titulo: String,
    autor: String,
    ano: Number,
    preco: Number
});

const Livro = banco.model('livros', LivroSchema);

module.exports = Livro;