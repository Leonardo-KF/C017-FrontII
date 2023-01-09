import { Dispatch, SetStateAction } from "react";

export interface SelectProps {
  options: string[];
  selectedOption: (value: string) => void;
}

// toda interface que uma classe irá implementar ( um contrato ) deve ter o prefixo I
