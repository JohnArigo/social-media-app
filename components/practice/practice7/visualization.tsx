//find min and max
//create counter state for each number in between
//function to go through each number and increment counter
//counter will represent css height

import { objectEnumValues } from "@prisma/client/runtime";
import { normalize } from "node:path/win32";
import { useEffect, useState } from "react";

export type visualizationType = { data: number[] };

export const Visualization = ({ data }: visualizationType) => {
  const [counter, setCounter] = useState({});
  const [refresh, setRefresh] = useState<boolean>(false);

  const min = data.sort((a, b) => a - b)[0];
  const max = data.sort((a, b) => a - b)[data.length - 2];

  useEffect(() => {
    for (let i = min; i < max + 1; i++) {
      setCounter((prev: any) => {
        return { ...prev, [i]: 0 };
      });
    }
  }, [data, refresh]);

  //
  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      if (!isNaN(data[i])) {
        setCounter((prev: any) => {
          return {
            ...prev,
            [data[i]]: prev[data[i]] + 1,
          };
        });
      }
    }
  }, [data, refresh]);

  // @ts-ignore

  const arrayValue = Object.values(counter).sort((a, b) => a - b)[
    Object.values(counter).length - 1
  ];

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="h-2/3 w-2/12 flex flex-col justify-end ">
        <div
          className="
        self-center"
          //@ts-ignore
          style={{ height: arrayValue * 4 }}
        >
          {/* @ts-ignore */}
          {arrayValue * 2}
        </div>
        <div //@ts-ignore
          style={{ height: arrayValue * 4 }}
          className=" self-center"
        >
          {/* @ts-ignore */}
          <div>{arrayValue}</div>
        </div>
        <div className="self-center">0</div>
      </div>

      <div className="flex justify-between items-end w-10/12 h-2/3 mr-10">
        {Object.keys(counter).map((key) => {
          if (key !== "NaN") {
            return (
              <div key={key}>
                <div
                  style={{
                    //@ts-ignore
                    height: counter[key] * 4,
                    backgroundColor:
                      "#" + Math.floor(100000 + Math.random() * 900000),
                  }}
                  className={` w-5 hover:bg-amber-300 hover:w-20 `}
                ></div>
                <div className="text-center">{key}</div>
              </div>
            );
          }
        })}
      </div>
      {/* <button
        className="w-15 h-10 bg-green-100 rounded-full"
        onClick={() => setRefresh((prevState) => !prevState)}
      >
        Refresh Data
      </button> */}
    </main>
  );
};

export default Visualization;
