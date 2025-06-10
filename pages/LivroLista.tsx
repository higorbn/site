import { useEffect, useState } from "react";
import { ControleLivro } from "../Classes/controle/controleLivro";
import { Livro } from "../Classes/modelo/Livro";
import Menu from "../components/Menu";

const controleLivros = new ControleLivro();

const LinhaLivro = ({
  livro,
  onExcluir,
}: {
  livro: Livro;
  onExcluir: () => void;
}) => (
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
    <td>
      <button className="btn btn-danger" onClick={onExcluir}>
        Excluir
      </button>
    </td>
  </tr>
);

const LivroLista = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregado, setCarregado] = useState(false);

  const carregarLivros = async () => {
    const dados = await controleLivros.obterLivros();
    setLivros(dados);
    setCarregado(true);
  };

  useEffect(() => {
    carregarLivros();
  }, [carregado]);

  return (
    <>
      <Menu />
      <main className="container mt-3">
        <h1>Catálogo de Livros</h1>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Título</th>
              <th>Resumo</th>
              <th>Autores</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <LinhaLivro
                key={livro.codigo}
                livro={livro}
                onExcluir={async () => {
                  await controleLivros.excluir(livro.codigo);
                  setCarregado(false);
                }}
              />
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default LivroLista;