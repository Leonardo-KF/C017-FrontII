import { Dispatch, FormEvent, SetStateAction } from "react";
import { Classroom } from "../../../utils/types/data";
import { Form, InputProps } from "../../atoms/form/form";
import { api } from "../../../utils/api/api";

export interface UpdateClassroomFormProps {
  handleControl: () => void;
  changeEditingMode: () => void;
  classroom: Classroom;
}

export function UpdateClassroomForm({
  handleControl,
  classroom,
  changeEditingMode,
}: UpdateClassroomFormProps) {
  const inputsData: InputProps[] = [
    {
      name: "Name",
      placeholder: "New name for this classroom",
      type: "text",
      defaultValue: classroom.name,
    },
    {
      name: "subject",
      placeholder: "New subject for this classroom",
      type: "text",
      defaultValue: classroom.subject,
    },
    {
      name: "theme",
      placeholder: "New theme for this classroom",
      type: "text",
      defaultValue: classroom.theme,
    },
    {
      name: "students",
      placeholder: "New students for this classroom",
      type: "text",
    },
    {
      name: "teacher",
      placeholder: "New teacher for this classroom",
      type: "text",
    },
  ];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // const data = inputsData.reduce((acc, input) => {
    //   return { ...acc, [input.name]: e.currentTarget[input.name].value };
    // }, {}) as any;

    // console.log({
    //   ...data,
    //   teachers: [
    //     ...classroom.teachers.filter((teacher) => teacher.id !== data.teacher),
    //     data.teacher,
    //   ],
    // });

    const data = {
      name: e.currentTarget.Name.value,
      theme: e.currentTarget.theme.value,
      subject: e.currentTarget.subject.value,
      teachersIds: [classroom.teachers[0].id],
      // studentsIds: [e.currentTarget.students.value ?? null],
    };

    console.log({ ...data, id: classroom.id });

    await api.updateClassroom({ ...data, id: classroom.id });

    changeEditingMode();
    handleControl();
  }

  return (
    <section>
      <Form
        title={"Update ClassRoom"}
        inputs={inputsData}
        onSubmit={handleSubmit}
        cancel={changeEditingMode}
      />
    </section>
  );
}
