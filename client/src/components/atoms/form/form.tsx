import { FormEvent } from "react";
import { FormContainer, PersonalizedInput } from "./styles";

export interface InputProps {
  placeholder: string;
  type: string;
  name: string;
  defaultValue?: string;
}

export interface InvalidData {
  name: string;
  errorMessage?: string;
}

export interface FormProps<T = FormEvent<HTMLFormElement>> {
  title: string;
  inputs: InputProps[];
  onSubmit: (value: T) => void;
  cancel?: () => void;
  invalidData?: InvalidData[];
}

export function Form({
  inputs,
  onSubmit,
  title,
  cancel,
  invalidData,
}: FormProps) {
  function clearFields(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (invalidData?.length === 0) {
      console.log(invalidData);
      inputs.forEach((input) => {
        e.currentTarget[input.name].value = "";
      });
    }
  }

  return (
    <FormContainer>
      <h2>{title}</h2>
      <form
        onSubmit={(e) => {
          onSubmit(e);
          clearFields(e);
        }}
      >
        {inputs.map((input, index) => (
          <>
            {invalidData?.find((data) => data.name == input.name)
              ?.errorMessage && (
              <span>
                {
                  invalidData?.find((data) => data.name == input.name)
                    ?.errorMessage
                }
              </span>
            )}
            <PersonalizedInput
              error={
                invalidData?.find((data) => data.name == input.name)
                  ? true
                  : false
              }
              type={input.type}
              placeholder={input.placeholder}
              name={input.name}
              defaultValue={input.defaultValue}
              key={index}
            />
          </>
        ))}
        <button type="submit">Enviar</button>
        {cancel && (
          <button type="button" onClick={cancel}>
            Cancelar
          </button>
        )}
      </form>
    </FormContainer>
  );
}
