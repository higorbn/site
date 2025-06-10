import { useEffect, useState } from 'react';
import { Livro } from '../Classes/modelo/Livro';
import { ControleEditora } from '../Classes/controle/controleEditora';

const controleEditora = new ControleEditora();

interface LinhaLivroProps {
  livro: Livro;
  excluir: () => void;
}

export const LinhaLivro: React.FC<LinhaLivroProps> = ({ livro, excluir }) => {
  const [nomeEditora, setNomeEditora] = useState('');

  useEffect(() => {
    const nome = controleEditora.getNomeEditora(livro.codEditora);
    setNomeEditora(nome);
  }, [livro.codEditora]);

  return (
    <tr>
      <td>{livro.titulo}</td>
      <td>{livro.resumo}</td>
      <td>
        <ul>
          {livro.autores.map((autor, index) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
      <td>{nomeEditora}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={excluir}>
          Excluir
        </button>
      </td>
    </tr>
  );
};