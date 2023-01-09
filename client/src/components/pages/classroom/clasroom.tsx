import { useState } from "react";
import { Select } from "../../atoms/select/select";

export function Classroom() {
  const [selectedClassroom, setSelectedClassroom] = useState<string>();
  const [selectedModule, setSelectedModule] = useState<string>();

  const options = ["Turma 1", "Turma 2", "Turma 3"];

  const module = ["Módulo 1", "Módulo 2", "Módulo 3"];

  function resultSelect(value: string) {
    setSelectedModule(value);
    console.log(selectedModule);
  }

  const alunosTurma1 = ["Átila", "Tiago", "João", "Felipe", "Bruno"];

  const alunosTurma2 = ["Matheus", "Lucas", "Olavo", "Yago"];

  console.log(selectedClassroom);
  return (
    <div>
      <h2>Clasroom</h2>
      <Select options={options} selectedOption={setSelectedClassroom} />
      <Select options={module} selectedOption={resultSelect} />
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
