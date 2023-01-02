export type Bola = {
  id: string;
  marca: string;
  modelo: string;
  tamanho: number;
  cor: string;
  estaCheia: boolean;
};

const ball: Omit<Bola, "id" | "marca"> = {
  modelo: "Jabulani",
  tamanho: 5,
  cor: "branco",
  estaCheia: true,
};

const ballList: Bola[] = [] as Bola[];
