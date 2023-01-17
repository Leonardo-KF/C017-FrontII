import { FormEvent } from "react";

export interface InputProps {
  placeholder: string;
  type: string;
  name: string;
}

export interface FormProps<T = FormEvent<HTMLFormElement>> {
  title: string;
  inputs: InputProps[];
  onSubmit: (value: T) => void;
}

export function Form({ inputs, onSubmit, title }: FormProps) {
  return (
    <section>
      <h2>{title}</h2>
      <form onSubmit={onSubmit}>
        {inputs.map((input) => (
          <input
            type={input.type}
            placeholder={input.placeholder}
            name={input.name}
          />
        ))}
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}
