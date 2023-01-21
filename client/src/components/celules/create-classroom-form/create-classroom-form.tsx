import { FormEvent } from "react";
import { api } from "../../../utils/api/api";
import { Form } from "../../atoms/form/form";

export interface CreateClassroomFormProps {
  handleControl: () => void;
}

export function CreateClassroomForm({
  handleControl,
}: CreateClassroomFormProps) {
  const inputsData = [
    {
      placeholder: "Classroom name",
      type: "text",
      name: "Name",
    },
    {
      placeholder: "Classroom theme",
      type: "text",
      name: "theme",
    },
    {
      placeholder: "Classroom subject",
      type: "text",
      name: "subject",
    },
  ];

  async function HandleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      name: e.currentTarget.Name.value,
      theme: e.currentTarget.theme.value,
      subject: e.currentTarget.subject.value,
    };

    const response = await api.createClassroom(data);
    handleControl();

    console.log(response);
  }

  return (
    <section>
      <Form
        title={"Create a classroom"}
        inputs={inputsData}
        onSubmit={HandleSubmit}
      />
    </section>
  );
}
