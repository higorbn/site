import { Livro } from "../modelo/Livro";

export class ControleLivro {
  private livros: Livro[] = [
    new Livro(1, 1, "Título 1", "Resumo 1", ["Autor 1"]),
    new Livro(2, 2, "Título 2", "Resumo 2", ["Autor 2"]),
    new Livro(3, 3, "Título 3", "Resumo 3", ["Autor 3"]),
  ];

  async obterLivros(): Promise<Livro[]> {
    return this.livros;
  }

  async incluir(livro: Livro): Promise<void> {
    this.livros.push(livro);
  }

  async excluir(codigo: number): Promise<void> {
    this.livros = this.livros.filter((livro) => livro.codigo !== codigo);
  }
}

export const controleLivro = new ControleLivro();