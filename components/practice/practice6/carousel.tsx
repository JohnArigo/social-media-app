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
    setSelector([counter - 2, counter - 1, counter, counter + 3, counter + 4]);
  }, [counter]);

  if (data) {
    return (
      <main className="w-full h-full flex flex-col justify-center items-center">
        <section className="w-96 sm:w-1/2 h-48 flex justify-center items-center">
          <button
            onClick={handleMinus}
            className=" bg-primary-content text-info-content h-auto w-auto px-3 py-1 mr-4 rounded-full"
          >
            {"<"}
          </button>
          <img className="w-72" src={data[counter]?.url} alt="carousel image" />
          <button
            onClick={handlePlus}
            className=" bg-primary-content text-info-content h-auto w-auto px-3 py-1 ml-4 rounded-full"
          >
            {">"}
          </button>
        </section>
        <section className="w-96 h-36">
          <div className="w-full sm:w-96 h-full mt-48 flex justify-between overflow-x-auto">
            <div>{selector[0]}</div>

            <div>{selector[1]}</div>

            <div>{selector[2]}</div>

            <div>{selector[3]}</div>

            <div>{selector[4]}</div>
          </div>
        </section>
      </main>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default Carousel;
