import { getSession } from "@/lib/iron-session";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const product = req.body;
  const session = await getSession(req, res);

  if (!session.products) {
    session.products = [
      {
        ...product,
      },
    ];
  } else {
    session.products = [
      ...session.products,
      {
        ...product,
      },
    ];
  }
  await session.save();

  return res.status(201).json({ message: "Product added with success" });
}
