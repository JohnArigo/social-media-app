import { useEffect, useState } from "react";

export type TableType = {
  url?: string;
};

export const Table = ({ url }: TableType) => {
  const [data, setData] = useState<any>([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      age: 35,
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      age: 32,
    },
  ]);

  useEffect(() => {
    if (url !== undefined) {
      alert("loading data");
      try {
        fetch(url)
          .then((res) => res.json())
          .then((data) => setData(data.data));
      } catch (error) {
        alert(error);
      }
    }
  }, [url]);

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <table className="bg-base-content w-96 sm:w-2/3 text-info-content">
        <tr className="w-full text-start">
          {Object.keys(data[0]).map((name: string) => {
            return (
              <th key={name} className={`1/${data.length}`}>
                {name}
              </th>
            );
          })}
        </tr>
        {data.map((item: any, index: number) => {
          return (
            <tr key={index} className="w-full text-center">
              {Object.values(item).map((value: any, index: number) => {
                return <td key={index}>{value}</td>;
              })}
            </tr>
          );
        })}
      </table>
    </main>
  );
};
export default Table;
