import { NextApiRequest, NextApiResponse } from 'next';
import { controleLivro } from '../../../Classes/controle/controleLivro';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { codigo } = req.query;

  if (req.method === 'DELETE') {
    if (typeof codigo === 'string') {
      const codigoNum = Number(codigo);
      if (isNaN(codigoNum)) {
        return res.status(400).json({ mensagem: 'Código inválido.' });
      }
      controleLivro.excluir(codigoNum);
      res.status(200).json({ mensagem: 'Livro excluído com sucesso.' });
    } else {
      res.status(400).json({ mensagem: 'Código inválido.' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default handler;