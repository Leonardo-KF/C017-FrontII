import { useEffect, useState } from "react";
import { api } from "../../../utils/api/api";
import { Classroom } from "../../../utils/types/data";
import { Select } from "../../atoms/select/select";
import AttendancesList from "../../celules/attendances-lists/attendances-lists";
import { ClassroomPage } from "../classroom-page/classroom-page";
import { CreateClassroomForm } from "../../celules/create-classroom-form/create-classroom-form";
import { UpdateClassroomForm } from "../../celules/update-classroom-form/update-classroom-form";
import { ClassroomCardOptionsContainer } from "../classroom-page/styles";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ClassroomCard } from "../../atoms/classroom-card/classroom-card";
import { colors } from "../../../utils/colors";
import { ClassroomContentDiv, ClassroomDiv } from "./styles";

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

  const navigate = useNavigate();

  console.log(JSON.parse(localStorage.getItem("user") ?? "").role);

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

  async function handleDeleteClassroom() {
    await api.deleteClassroom(classroomSelectedData?.id ?? "");
    handleControl();
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
    <ClassroomDiv>
      <ClassroomContentDiv>
        {classrooms.map((classroom) => {
          const color =
            colors[Math.floor(Math.random() * colors.length - 1) + 1];
          return (
            <ClassroomCard
              key={classroom.id}
              id={classroom.id}
              name={classroom.name}
              theme={classroom.theme}
              color={color}
            />
          );
        })}
      </ClassroomContentDiv>
    </ClassroomDiv>
  );
}
