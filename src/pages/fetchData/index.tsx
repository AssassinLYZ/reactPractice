import { useEffect, useState } from "react";

interface FecthDataProps {}
interface Country {
  name: {
    common: string;
  };
  population?: number;
  capital?: string;
  // 其他属性...
}

const FilterCapitals = ["Tallinn", "Helsinki", "Oslo", "Stockholm"] as const;
type Capital = (typeof FilterCapitals)[number];

const FecthData: React.FC<FecthDataProps> = ({}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [capitial, setCapitial] = useState<Capital | "">("");
  useEffect(() => {
    let url: string;
    console.log(capitial);
    if (capitial) {
      url = "https://restcountries.com/v3.1/capital/" + capitial;
    } else {
      url = "https://restcountries.com/v3.1/all";
    }
    const fetchData = async () => {
      try {
        let res = await fetch(url);
        const data = await res.json();
        setCountries(data);
      } catch (e) {
        console.log(e);
      } finally {
        console.log("finish fetching");
      }
    };
    fetchData();
  }, [capitial]);
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCapitial(e.target.value as Capital);
  };
  return (
    <div>
      <select onChange={handleChange}>
        <option value="" hidden></option>
        {FilterCapitals.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      <div>
        {countries.map((item, index) => {
          return (
            <p key={index}>
              {item.capital + " "}
              {item.name.common}
            </p>
          );
        })}
      </div>
    </div>
  );
};
export default FecthData;
