import { NextApiRequest, NextApiResponse } from 'next';
import { ControleEditora } from '@controle/controleEditora';

const controleEditora = new ControleEditora();

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const codEditora = Number(req.query.codEditora);
      const nome = controleEditora.getNomeEditora(codEditora);
      res.status(200).json({ nome });
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
};

export default handler;