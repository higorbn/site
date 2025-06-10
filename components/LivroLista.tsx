import { useEffect, useState } from 'react';
import { Livro } from '../Classes/modelo/Livro';
import { LinhaLivro } from '../components/LinhaLivro';
import Menu from '../components/Menu';

const LivroLista = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregado, setCarregado] = useState(false);

  const obterLivros = async () => {
    try {
      const resposta = await fetch('/api/livros');
      const dados = await resposta.json();
      setLivros(dados);
      setCarregado(true);
    } catch (erro) {
      console.error('Erro ao buscar livros:', erro);
      setCarregado(true);
    }
  };

  const excluirLivro = async (codigo: string) => {
    try {
      const resposta = await fetch(`/api/livros/${codigo}`, {
        method: 'DELETE',
      });
      if (resposta.ok) {
        await obterLivros();
      } else {
        alert('Erro ao excluir o livro.');
      }
    } catch (erro) {
      console.error('Erro ao excluir livro:', erro);
      alert('Erro de rede ao excluir livro.');
    }
  };

  useEffect(() => {
    obterLivros();
  }, []);

  return (
    <>
      <Menu />
      <div className="container mt-4">
        <h1>Catálogo de Livros</h1>
        <table className="table table-striped mt-4">
          <thead className="table-dark">
            <tr>
              <th>Título</th>
              <th>Resumo</th>
              <th>Autores</th>
              <th>Editora</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
  <LinhaLivro
    key={livro.codigo}
    livro={livro}
    excluir={() => excluirLivro(livro.codigo.toString())}
  />
))}
            {carregado && livros.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center">
                  Nenhum livro cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LivroLista;