import { useEffect, useState } from "react";
import { Meme } from "../components/practice/practice1/meme";
import { RandomQuote } from "../components/practice/practice2/quote";
import NewsPractice from "../components/practice/practice3/news";
import UserForm from "../components/practice/practice4/userForm";
import Table from "../components/practice/practice5/table";
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
  const url =
    "https://datausa.io/api/data?drilldowns=Nation&measures=Population";
  return (
    <main>
      <Table url={url} />
    </main>
  );
};

export default PracticePage;
