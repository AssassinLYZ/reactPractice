import { useState, useEffect } from "react";

import "./styles.css";
import { CompanyType } from "../../types/company";
import { Accordion } from "./accordion";

// Endpoint for company data
const endpoint = "https://api.npoint.io/e01cac7d042707a00a72";

const App = () => {
  const [companies, setCompanies] = useState<CompanyType[]>([]);

  const loadCompanies = async () => {
    try {
      const response = await fetch(endpoint);
      const data: { companies: CompanyType[] } = await response.json();
      const companies = data.companies.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setCompanies(companies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  return (
    <>
      <h1>Companies</h1>
      <Accordion>
        {companies?.map((item) => (
          <Accordion.Item key={item.id} id={item.id}>
            <Accordion.Title>{item.name}</Accordion.Title>
            <Accordion.Content>
              <div className="column">
                <img src={item.images["100x100"]} alt={item.name} />
              </div>
              <div className="column">
                <span>Company: {item.name}</span>
                <span>Employees: {item.employees}</span>
                <span>Date: {new Date(item.date).toLocaleDateString()}</span>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};

export default App;
