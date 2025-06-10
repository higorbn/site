import { NextApiRequest, NextApiResponse } from 'next';
import { controleLivro } from '../../../Classes/controle/controleLivro';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const livros = await controleLivro.obterLivros();
    res.status(200).json(livros);
  } else if (req.method === 'POST') {
    // lógica para incluir livro
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;