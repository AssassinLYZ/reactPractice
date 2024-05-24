import { ReactNode } from "react";
import { useAccordion } from "./accordion";
import { useAccordionItem } from "./item";

export interface Props {
  children: ReactNode;
}

export const AccordionContent = ({ children }: Props) => {
  const { activeItem } = useAccordion();
  const { id } = useAccordionItem();

  return activeItem === id ? (
    <div className="accordion-content">{children}</div>
  ) : null;
};
