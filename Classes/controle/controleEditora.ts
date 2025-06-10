// src/Classes/controle/controleEditora.ts

export class ControleEditora {
  private editoras: { codEditora: number; nome: string }[] = [
    { codEditora: 1, nome: "Alta Books" },
    { codEditora: 2, nome: "Pearson" },
    { codEditora: 3, nome: "O'Reilly" }
  ];

  getEditoras() {
    return this.editoras;
  }

  getNomeEditora(codEditora: number): string {
    const editora = this.editoras.find((e) => e.codEditora === codEditora);
    return editora ? editora.nome : "Desconhecida";
  }
}