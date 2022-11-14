import type { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ alert: "Method not allowed" });
  }

  const request = await fetch("https://ipinfo.io/json?token=ff5d8d84fee3a7");
  const jsonResponse = await request.json();

  res.json(jsonResponse);
}
