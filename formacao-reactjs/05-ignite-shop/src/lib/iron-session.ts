import { getIronSession, IronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";

export const getSession = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<
  IronSession<{
    products: {
      id: string;
      priceId: string;
    }[];
  }>
> => {
  return await getIronSession(req, res, {
    cookieName: `${process.env.IRON_COOKIE_NAME}`,
    password: `${process.env.IRON_PASSWORD}`,
  });
};
