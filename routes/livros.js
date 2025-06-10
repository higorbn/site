const express = require('express');
const router = express.Router();
const LivroDAO = require('../modelo/livro-dao');

router.get('/', async (req, res) => {
  const livros = await LivroDAO.listar();
  res.json(livros);
});

router.post('/', async (req, res) => {
  try {
    console.log('📥 Corpo recebido:', req.body); // <-- Adicionado
    const livro = await LivroDAO.incluir(req.body);
    res.status(201).json(livro);
  } catch (erro) {
    console.error('❌ Erro ao incluir livro:', erro); // <-- Adicionado
    res.status(500).json({ erro: "Erro ao incluir livro." });
  }
});

module.exports = router;