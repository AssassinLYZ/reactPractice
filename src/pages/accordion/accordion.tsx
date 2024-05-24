import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

import { AccordionItem } from "./item";
import { AccordionTitle } from "./title";
import { AccordionContent } from "./content";

interface ContextType {
  activeItem: number;
  setActiveItem: Dispatch<SetStateAction<number>>;
}

const AccordionContext = createContext<ContextType>({
  activeItem: -1,
  setActiveItem: () => null,
});

const useAccordion = () => useContext(AccordionContext);

interface Props {
  children: ReactNode;
}

const Accordion = ({ children }: Props) => {
  const [activeItem, setActiveItem] = useState<number>(-1);
  //   const value = useMemo(() => ({ activeItem, setActiveItem }), [activeItem]);

  return (
    <AccordionContext.Provider value={{ activeItem, setActiveItem }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
};

Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;

Accordion.displayName = "Accordion";

export { Accordion, useAccordion };
