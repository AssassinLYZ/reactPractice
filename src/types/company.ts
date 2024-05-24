export interface CompanyType {
  id: number;
  name: string;
  images: {
    [key: string]: string;
  };
  employees: number;
  date: number;
}
