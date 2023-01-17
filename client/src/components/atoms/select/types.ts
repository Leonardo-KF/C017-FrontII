import { Dispatch, SetStateAction } from "react";

export interface OptionProps {
  name: string;
  value: string;
}
export interface SelectProps {
  options: OptionProps[];
  selectedOption: (value: string) => void;
}

// toda interface que uma classe irá implementar ( um contrato ) deve ter o prefixo I
