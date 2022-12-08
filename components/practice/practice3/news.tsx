import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Article, ArticleRoot } from "../../../lib/types";

// export type NewsPracticeType = {
//   newsData: ArticleRoot;
// };
export const NewsPractice = () => {
  return (
    <main className="w-full h-full overflow-y-auto overflow-x-clip flex flex-col items-center">
      {/* {newsData?.articles.map((article: Article) => {
        return (
          <div className="w-96 h-72 bg-white mt-5 mb-5">
            <a href={article.url}>
              <div>{article.title}</div>
              <div>
                <img src={article.urlToImage} alt="article image" />
              </div>
            </a>
          </div>
        );
      })} */}
    </main>
  );
};

export default NewsPractice;
