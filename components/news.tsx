import Link from "next/link";
import { ArticleRoot } from "../lib/types";

export type newsType = {
  news: ArticleRoot;
};

export default function News({ news }: newsType) {
  return (
    <section className="h-full w-full overflow-y-auto">
      {news.articles.map((article) => {
        console.log(article);
        return (
          <Link href={article.url}>
            <div className="flex flex-col items-center justify-center w-full h-auto bg-base-content text-info-content pb-10 mt-5 rounded-lg">
              <h2 className="mt-3 text-center mb-3 text-md">{article.title}</h2>
              <img src={article.urlToImage} />
            </div>
          </Link>
        );
      })}
    </section>
  );
}
