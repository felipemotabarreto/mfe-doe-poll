import type { NextApiRequest, NextApiResponse } from "next";
import { getPollResults, savePollEntry } from "../../../services/poll";
import Cors from "cors";

const cors = Cors({
  methods: ["GET", "POST"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  if (req.method === "POST") {
    const pollEntry = await savePollEntry(+req.body.option, +req.body.user);
    return res.status(200).json(pollEntry);
  }

  const poll = await getPollResults();
  res.status(200).json(poll);
}
