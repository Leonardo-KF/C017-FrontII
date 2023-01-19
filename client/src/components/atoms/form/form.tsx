import { FormEvent } from "react";
import { FormContainer } from "./styles";

export interface InputProps {
  placeholder: string;
  type: string;
  name: string;
  defaultValue?: string;
}

export interface FormProps<T = FormEvent<HTMLFormElement>> {
  title: string;
  inputs: InputProps[];
  onSubmit: (value: T) => void;
  cancel?: () => void;
}

export function Form({ inputs, onSubmit, title, cancel }: FormProps) {
  return (
    <FormContainer>
      <h2>{title}</h2>
      <form onSubmit={onSubmit}>
        {inputs.map((input, index) => (
          <input
            type={input.type}
            placeholder={input.placeholder}
            name={input.name}
            defaultValue={input.defaultValue}
            key={index}
          />
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
