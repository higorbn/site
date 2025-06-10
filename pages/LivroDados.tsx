import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Livro } from "../Classes/modelo/Livro";
import { ControleEditora } from "../Classes/controle/controleEditora";
import { ControleLivro } from "../Classes/controle/controleLivro";

const controleEditora = new ControleEditora();
const controleLivro = new ControleLivro();

export const LivroDados = () => {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [resumo, setResumo] = useState("");
  const [autores, setAutores] = useState("");
  const [codEditora, setCodEditora] = useState("0");
  const [editoras, setEditoras] = useState<{ codEditora: number; nome: string }[]>([]);

  useEffect(() => {
    const lista = controleEditora.getEditoras();
    setEditoras(lista);
  }, []);

  const tratarCombo = (evento: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(evento.target.value);
  };

  const incluir = async (evento: React.FormEvent) => {
    evento.preventDefault();

    const novoLivro: Livro = {
      codigo: 0, // o backend deve gerar
      titulo,
      resumo,
      autores: autores.split('\n'),
      codEditora: Number(codEditora),
    };

    await controleLivro.incluir(novoLivro);
    navigate('/');
  };

  return (
    <main className="container">
      <h1 className="mt-3">Cadastro de Livro</h1>
      <form onSubmit={incluir}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Resumo</label>
          <textarea className="form-control" value={resumo} onChange={(e) => setResumo(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Autores (um por linha)</label>
          <textarea className="form-control" value={autores} onChange={(e) => setAutores(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Editora</label>
          <select className="form-select" value={codEditora} onChange={tratarCombo}>
            <option value="">Selecione</option>
            {editoras.map((editora) => (
              <option key={editora.codEditora} value={editora.codEditora}>
                {editora.nome}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary" type="submit">Salvar</button>
      </form>
    </main>
  );
};