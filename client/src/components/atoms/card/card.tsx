import { ReactNode, useState } from "react";
import { ClickedButton } from "../../pages/classroom/styles";

export type CardProps = {
  name: string;
  description: string;
  selectCard: (data: string) => void;
};

export function Card({ name, description, selectCard }: CardProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <ClickedButton
      isSelect={isActive}
      onClick={() => {
        setIsActive(!isActive);
        selectCard(name);
      }}
      type="button"
    >
      <h2>{name}</h2>
      <p>{description}</p>
    </ClickedButton>
  );
}
