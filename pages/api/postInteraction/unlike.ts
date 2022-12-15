import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ alert: "Method not allowed" });
  }
  const likeData = JSON.parse(req.body);

  const savedLike = await prisma.like.delete({
    where: {
      id: likeData.id,
    },
  });

  res.json(savedLike);
  // res.status(200).json({ name: "John Doe" });
}

//Rebekah Medlin
//Michael Piper

// Reach out to Militaryrecruiting@lowes.com
// MilitaryRecruiting@wellsfargo.com

//John Deere
//Deere.com/MilitaryCSP
{
  /*
Im a veteran, I can start working in February 1
I am looking at Washington, Northern California and Hawaii
*/
}

//Contact verizon
//Tailor what youll be doing to the job description to RESUME

//Johnson and Johnson
//Julia Arthur -- SONY
//Justin Santillan -- TekSystems santillan@teksystems.com
//Eddie Dun

//richard.davis@optum.com

//timothy_pawlak@uhg.com
// richard.davis@optum.com
