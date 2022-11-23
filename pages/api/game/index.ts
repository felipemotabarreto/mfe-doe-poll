import type { NextApiRequest, NextApiResponse } from "next";
import { createGame } from "../../../services/game";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const game = await createGame(req.body.option);
  return res.status(200).json(game);
}
