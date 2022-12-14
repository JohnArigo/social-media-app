import { useEffect, useState } from "react";
import { Meme } from "../components/practice/practice1/meme";
import { RandomQuote } from "../components/practice/practice2/quote";
import NewsPractice from "../components/practice/practice3/news";
import UserForm from "../components/practice/practice4/userForm";
import Table from "../components/practice/practice5/table";
import Carousel from "../components/practice/practice6/carousel";
import Visualization from "../components/practice/practice7/visualization";
import TwoFactor from "../components/practice/practice8/twoFactor";
import { ArticleRoot } from "../lib/types";

// export async function getStaticProps() {
//   const newsRequest = await fetch(
//     `https://newsapi.org/v2/top-headlines?country=us&apiKey=${[
//       process.env.NEWS_KEY,
//     ]}`
//   );
//   const newsResponse = await newsRequest.json();

//   return {
//     props: {
//       news: newsResponse,
//     },
//   };
// }

export const PracticePage = () => {
  // const [newsData, setNewsData] = useState<ArticleRoot>(news);
  // const url =
  //   "https://datausa.io/api/data?drilldowns=Nation&measures=Population";
  // const [data, setData] = useState<number[]>([]);
  // useEffect(() => {
  //   const dataArray: number[] = [];
  //   fetch(
  //     "https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new"
  //   )
  //     .then((response) => response.text())
  //     .then((data) => {
  //       const dataNumbers = data.split("\n").map((number) => parseInt(number));
  //       setData(dataNumbers);
  //     });
  // }, []);

  const code = 1121;
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <TwoFactor code={code} />
    </main>
  );
};

export default PracticePage;
