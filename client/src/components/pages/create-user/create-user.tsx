import { useState } from "react";
import { Form, InputProps, InvalidData } from "../../atoms/form/form";
import { api } from "../../../utils/api/api";
import { UserPayload } from "../../../utils/types/requests";
import { useNavigate } from "react-router-dom";
import { HandleError } from "../../../utils/errors/handle-error-modal";

export function CreateUser() {
  const navigate = useNavigate();

  const inputOptions: InputProps[] = [
    {
      name: "Name",
      type: "text",
      placeholder: "name",
    },
    {
      name: "email",
      type: "email",
      placeholder: "email",
    },
    {
      name: "password",
      type: "text",
      placeholder: "password",
    },
    {
      name: "cpf",
      type: "text",
      placeholder: "cpf",
    },
  ];

  function validateData(data: UserPayload) {
    let dataIsValid = true;
    const error = {
      fields: [] as string[],
    };
    if (data.password.length < 8) {
      error.fields.push("password");
      dataIsValid = false;
    }

    if (!data.email.includes(".com")) {
      error.fields.push("email");
      dataIsValid = false;
    }

    if (!dataIsValid) {
      console.log(error);
      HandleError({ message: "Erro no(s) campo: " + error.fields.join(", ") });
    }

    return dataIsValid;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      name: e.currentTarget.Name.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      cpf: e.currentTarget.cpf.value,
    };

    const isValid = validateData(data);

    console.log(data);

    if (isValid) {
      await api.createUser(data);
      navigate("/");
    }
  }

  return (
    <div>
      <Form title={"Register"} inputs={inputOptions} onSubmit={handleSubmit} />
    </div>
  );
}
