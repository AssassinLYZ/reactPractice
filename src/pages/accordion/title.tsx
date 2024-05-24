import { ReactNode } from "react";
import { useAccordion } from "./accordion";
import { useAccordionItem } from "./item";

export interface Props {
  children: ReactNode;
}

export const AccordionTitle = ({ children }: Props) => {
  const { activeItem, setActiveItem } = useAccordion();
  const { id } = useAccordionItem();

  return (
    <div
      className="accordion-title"
      onClick={() => setActiveItem(activeItem === id ? -1 : id)}
    >
      {children}
    </div>
  );
};
