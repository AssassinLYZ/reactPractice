import { ReactNode, createContext, useContext } from "react";

interface Props {
  children: ReactNode;
  id: number;
}

interface ContextType {
  id: number;
}

const AccordionItemContext = createContext<ContextType>({ id: -1 });
const useAccordionItem = () => useContext(AccordionItemContext);

const AccordionItem = ({ children, id }: Props) => {
  return (
    <AccordionItemContext.Provider value={{ id }}>
      <div className="accordion-item">{children}</div>
    </AccordionItemContext.Provider>
  );
};

export { AccordionItem, AccordionItemContext, useAccordionItem };
