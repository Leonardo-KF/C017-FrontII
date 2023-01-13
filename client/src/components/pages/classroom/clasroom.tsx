import { FormEvent, useEffect, useState } from "react";
import { Select } from "../../atoms/select/select";
import { ClickedButton } from "./styles";
import { Card } from "../../atoms/card/card";
import { api } from "../../../utils/api/api";

export type classroom = {
  id: string;
  name: string;
  subject: string;
  theme: string;
};

export function Classroom() {
  const [classrooms, setClassrooms] = useState<classroom[]>([]);
  const [search, setSearch] = useState("");
  // const [sortedClassrooms, setSortedClassrooms] = useState<classroom[]>([]);

  async function findClassrooms() {
    const classes = await api.getClassrooms();
    setClassrooms(classes);
  }

  const sortedClassrooms =
    search.length > 0
      ? classrooms.filter((classroom) =>
          classroom.name
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        )
      : classrooms;

  // 1 array de dependencias vazio = executa uma vez quando o component é montado
  useEffect(() => {
    console.log("rodou useEffect");
    findClassrooms();
  }, []);

  // 2 array de dependencias com valor = executa toda vez que o valor mudar
  // useEffect(() => {
  //   console.log("rodou useEffect 2");
  //   setTimeout(() => {
  //     console.log("rodou timeout");
  //     setControl(!control);
  //   }, 2000);
  //   findClassrooms();
  // }, [control]);

  // 3 sem array de dependencias = executa toda vez que um state muda
  // useEffect(() => {
  //   console.log("rodou useEffect 3");
  //   findClassrooms();
  // });

  console.log("renderizou");

  return (
    <div>
      <h2>Clasroom</h2>
      <input
        type="text"
        onChange={(e) => {
          setSearch(e.currentTarget.value);
        }}
        placeholder="Search"
      />
      {sortedClassrooms.map((classroom) => (
        <div key={classroom.id}>
          <h2>{classroom.name}</h2>
          <p>{classroom.subject}</p>
        </div>
      ))}
    </div>
  );
}
