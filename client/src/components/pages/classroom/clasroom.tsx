import { FormEvent, useState } from "react";
import { Select } from "../../atoms/select/select";
import { ClickedButton } from "./styles";
import { Card } from "../../atoms/card/card";

export function Classroom() {
  const [selectedClassroom, setSelectedClassroom] = useState<string>();
  const [selectedModule, setSelectedModule] = useState<string>();

  const options = ["Turma 1", "Turma 2", "Turma 3", "Turma 4", "Turma 5"];

  const module = ["Módulo 1", "Módulo 2", "Módulo 3"];

  const alunosTurma1 = ["Átila", "Tiago", "João", "Felipe", "Bruno"];

  const alunosTurma2 = ["Matheus", "Lucas", "Olavo", "Yago"];

  function resultSelect(value: string) {
    setSelectedModule(value);
    console.log(selectedModule);
  }

  const movieList = [
    {
      name: "Interstellar",
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    },
    {
      name: "A ilha do medo",
      description:
        "A writer visits the isolated island of Shutter Island, where he encounters a strange collection of ex-convicts and the brutal, missing wife of a former police chief.",
    },
    {
      name: "A Origem",
      description:
        "A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.",
    },
  ];

  const [selectedMovies, setSelectedMovies] = useState<string[]>([]);

  function selectedMovie(value: string) {
    if (selectedMovies.includes(value)) {
      setSelectedMovies((state) =>
        state.filter((movieName) => movieName !== value)
      );
    } else {
      setSelectedMovies((state) => [...state, value]);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    console.log(selectedMovies);
  }

  return (
    <div>
      <h2>Clasroom</h2>
      <Select options={options} selectedOption={setSelectedClassroom} />
      <Select options={module} selectedOption={resultSelect} />
      <form onSubmit={handleSubmit}>
        {movieList.map((movie) => {
          return (
            <Card
              description={movie.description}
              name={movie.name}
              selectCard={selectedMovie}
              key={movie.name}
            />
          );
        })}
        <button type="submit">enviar</button>
      </form>
      {selectedModule === "Módulo 1" && (
        <>
          {alunosTurma1.map((aluno) => {
            return <h2>{aluno}</h2>;
          })}
        </>
      )}
      {selectedModule === "Módulo 2" && (
        <>
          {alunosTurma2.map((aluno) => {
            return <h2>{aluno}</h2>;
          })}
        </>
      )}
    </div>
  );
}
