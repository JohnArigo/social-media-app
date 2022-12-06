import { quoteType } from "./quote";

export type favoriteType = { quotes: quoteType[] };

export const FavoriteQuotes = ({ quotes }: favoriteType) => {
  return (
    <div className="h-full w-96 mb-16 mt-10">
      <div className="h-full overflow-y-auto">
        {quotes.map((quote, index) => {
          return (
            <div className="w-96 h-56 bg-white text-black flex flex-col items-center justify-center mt-5">
              <h1 className="text-center">{quote.text}</h1>
              <h3 className="self-end mr-10 italic text-gray-700">
                - {quote.author}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoriteQuotes;
