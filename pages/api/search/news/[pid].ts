import type { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ alert: "Method not allowed" });
  }
  const { pid } = req.query;
  const userInput = pid?.toString();
  const newsRequest = await fetch(
    `https://newsapi.org/v2/everything?q=${userInput}&apiKey=${process.env.NEWS_KEY}`
  );
  const newsResponse = await newsRequest.json();

  res.json(newsResponse);
}
