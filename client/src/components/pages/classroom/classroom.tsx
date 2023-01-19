import { FormEvent, useEffect, useState } from "react";
import { Select } from "../../atoms/select/select";
import { ClickedButton } from "./styles";
import { Card } from "../../atoms/card/card";
import { api } from "../../../utils/api/api";
import { Form, InputProps } from "../../atoms/form/form";
import { CreateClassroomForm } from "../../celules/create-classroom-form/create-classroom-form";
import AttendancesList from "../../celules/attendances-lists/attendances-lists";
import { Classroom } from "../../../utils/types/data";
import { UpdateClassroomForm } from "../../celules/update-classroom-form/update-classroom-form";
import { ClassroomCard } from "../../molecules/classroom-card/classroom-card";

export function Classroom() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [selectedClassroom, setSelectedClassroom] = useState<
    string | undefined
  >();
  const [control, setControl] = useState<boolean>(false);

  const [isEditingMode, setIsEditingMode] = useState<boolean>(false);

  const classroomSelectedData = classrooms.find(
    (classroom) => classroom.id === selectedClassroom
  );

  async function findClassrooms() {
    const data = await api.getClassrooms();
    setClassrooms(data);
  }

  function getSelectedClassroom(value: string) {
    setSelectedClassroom(value);
  }

  function handleControl() {
    setControl(!control);
  }

  function handleEditMode() {
    setIsEditingMode(!isEditingMode);
  }

  // 1 array de dependencias vazio = executa uma vez quando o component é montado
  useEffect(() => {
    findClassrooms();
  }, [control]);

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
  // });{

  return (
    <div>
      <h2>Clasrooms</h2>
      <Select
        options={classrooms.map((classroom) => {
          return { name: classroom.name, value: classroom.id };
        })}
        selectedOption={getSelectedClassroom}
      />
      <div>
        {selectedClassroom && (
          <ClassroomCard
            classroom={classroomSelectedData ?? ({} as Classroom)}
            changeEditingMode={handleEditMode}
            handleControl={handleControl}
            editingMode={isEditingMode}
          />
        )}
      </div>
      <AttendancesList selectedClassroom={selectedClassroom} />
    </div>
  );
}
