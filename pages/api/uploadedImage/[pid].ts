import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ alert: "Method not allowed" });
  }
  const { pid } = req.query;
  require("dotenv").config();
  var cloudinary = require("cloudinary");
  console.log(cloudinary.config().cloud_name);
  //   cloudinary.v2.uploader
  //     .upload("/home/my_image.jpg")
  //     .then((result) => console.log(result));
  //   const postData = JSON.parse(req.body);

  //   const savedPost = await prisma.post.create({ data: postData });

  //   res.json(savedPost);
  // res.status(200).json({ name: "John Doe" });
}
