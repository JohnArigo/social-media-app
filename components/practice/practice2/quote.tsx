// A random React component that you could build might be a "quote generator" that fetches a random quote from an API and displays it in the component.

// Here are some steps to build this component:

// Choose an API that returns a random quote (e.g. the "They Said So" quotes API: https://theysaidso.com/api/) and obtain the API endpoint and any necessary authentication keys or tokens.

// Create a new React project using the create-react-app command and install any necessary dependencies for the API (e.g. axios for HTTP requests).

// Create a new React component (e.g. QuoteGenerator) and use a lifecycle method (e.g. componentDidMount) to fetch the data from the API endpoint when the component is mounted.

// Use the response data from the API to update the state of the component and render the quote in the component's JSX.

// Use CSS to style the component and make it visually appealing (e.g. add colors, fonts, layout, and animations).

// Test the component to ensure that it correctly fetches and displays the quote from the API and that the CSS styles are applied correctly.

// Optional: Add additional features to the component, such as the ability to refresh the quote or save it to a favorites list.

//carousel idea: have a counter that increments on click or decrements on click. array[counter] to display data.
//if counter > array.length, counter = 0
//if counter < 0; counter = array.length - 1

import { useEffect, useState } from "react";
import FavoriteQuotes from "./favoriteQuotes";
export type quoteType = {
  author: string;
  text: string;
  favorite?: boolean;
};
export const RandomQuote = () => {
  const [quote, setQuote] = useState<quoteType[]>([
    { author: "initial", text: "text" },
  ]);
  const [counter, setCounter] = useState<number>(0);
  const [favorite, setFavorites] = useState<quoteType[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  console.log(showFavorites);
  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => setQuote(data));
  }, []);

  const handlePlus = () => {
    if (counter > quote.length - 1) {
      setCounter(0);
    } else {
      setCounter(counter + 1);
    }
  };
  const handleMinus = () => {
    if (counter === 0) {
      setCounter(quote.length - 1);
    } else {
      setCounter(counter - 1);
    }
  };

  const handleFavorite = () => {
    if (!quote[counter].favorite) {
      setQuote((prev: any) => {
        return [...prev, (quote[counter].favorite = true)];
      });
    } else {
      setQuote((prev: any) => {
        return [...prev, (quote[counter].favorite = false)];
      });
    }
    setFavorites((prev: quoteType[]) => {
      return [...prev, quote[counter]];
    });
  };

  const favoriteColor = () => {
    if (quote[counter].favorite) {
      return "text-red-500";
    } else {
      return "text-white-500";
    }
  };

  return (
    <div className="overflow-y-clip">
      <section className="w-96 h-56 bg-white text-black flex flex-col items-center justify-center">
        <h1 className="text-center">{quote[counter].text}</h1>
        <h3 className="self-end mr-10 italic text-gray-700">
          - {quote[counter].author}
        </h3>
      </section>
      <section className="mt-5 flex justify-between">
        <button
          className="rounded-full w-32 h-10 bg-slate-400 text-center"
          onClick={handleMinus}
        >
          Previous
        </button>
        <div className={favoriteColor()} onClick={handleFavorite}>
          Favorite
        </div>
        <button
          className="rounded-full w-32 h-10 bg-slate-400 text-center"
          onClick={handlePlus}
        >
          Next
        </button>
      </section>

      {showFavorites ? (
        <FavoriteQuotes quotes={favorite} />
      ) : (
        <div className="w-full flex justify-center items-center mt-10">
          <button
            onClick={() => setShowFavorites(true)}
            className="rounded-full bg-white w-36 h-14"
          >
            show favorites
          </button>
        </div>
      )}
    </div>
  );
};

export default RandomQuote;
