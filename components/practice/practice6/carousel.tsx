//create a countdown timer
//once countedown === 0; setcoundown to 3, iterate through image
//carousel will have image, two buttons
//data.children[counter].data.url_overrident_by_dest
import { useEffect, useState } from "react";

export const Carousel = ({ data }: any) => {
  const [countdown, setCountdown] = useState<number>(3);
  const [counter, setCounter] = useState<number>(0);
  const [selector, setSelector] = useState<number[]>([0, 1, 2, 3, 4]);
  const handlePlus = () => {
    if (counter > data.length - 1) {
      setCounter(0);
    } else {
      setCounter((prevCount) => prevCount + 1);
    }
  };
  const handleMinus = () => {
    if (counter === 0) {
      setCounter(data.length - 1);
    } else {
      setCounter((prevCount) => prevCount - 1);
    }
  };

  useEffect(() => {
    countdown > 0 && setTimeout(() => setCountdown(countdown - 1), 1000);
    if (countdown === 0) {
      setCountdown(3);
      handlePlus();
    }
  }, [countdown]);

  useEffect(() => {
    setSelector([
      counter === 0 ? data.length - 2 : counter - 2,
      counter === 0 ? data.length - 1 : counter - 1,
      counter,
      counter > data.length - 1 ? 0 : counter + 1,
      counter > data.length - 1 ? 1 : counter + 2,
    ]);
  }, [counter]);

  if (data) {
    return (
      <main className="w-full h-full flex flex-col justify-center items-center">
        <section className="w-96 sm:w-1/2 h-48 flex justify-center items-center">
          <div className="absolute flex w-96 justify-between items-center">
            <button
              onClick={handleMinus}
              className=" bg-primary-content hover:bg-green-50 focus:bg-green-50 text-info-content h-auto w-auto px-3 py-1 mr-4 rounded-full"
            >
              {"<"}
            </button>
            <button
              onClick={handlePlus}
              className="hover:bg-green-50 focus:bg-green-50 bg-primary-content text-info-content h-auto w-auto px-3 py-1 ml-4 rounded-full"
            >
              {">"}
            </button>
          </div>

          <img className="w-96" src={data[counter]?.url} alt="carousel image" />
        </section>
        <section className="w-96 h-36">
          <div className="w-full sm:w-96 h-full mt-48 flex justify-between overflow-x-auto">
            <div
              className={`roounded-full ${
                counter === selector[0] ? "bg-white" : ""
              }`}
              onClick={() => setCounter(selector[0])}
            >
              {selector[0]}
            </div>

            <div
              className={`roounded-full ${
                counter === selector[1] ? "bg-white" : ""
              }`}
              onClick={() => setCounter(selector[1])}
            >
              {selector[1]}
            </div>

            <div
              className={`roounded-full ${
                counter === selector[2] ? "text-white" : ""
              }`}
              onClick={() => setCounter(selector[2])}
            >
              {selector[2]}
            </div>

            <div
              className={`roounded-full ${
                counter === selector[3] ? "bg-white" : ""
              }`}
              onClick={() => setCounter(selector[3])}
            >
              {selector[3]}
            </div>

            <div
              className={`roounded-full ${
                counter === selector[4] ? "bg-white" : ""
              }`}
              onClick={() => setCounter(selector[4])}
            >
              {selector[4]}
            </div>
          </div>
        </section>
      </main>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default Carousel;
