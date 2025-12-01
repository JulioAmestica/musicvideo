import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getPlaylistTracks } from "../../../lib/spotify";

const secret = process.env.NEXTAUTH_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await getToken({ req, secret });
    if (!token || !token.refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const idlistParam = Array.isArray(req.query.idlist) ? req.query.idlist[0] : req.query.idlist;
    if (!idlistParam || typeof idlistParam !== "string") {
      return res.status(400).json({ message: "Missing playlist id" });
    }

    const tracks = await getPlaylistTracks(token.refreshToken as string, idlistParam);
    const parsedTracks = tracks.map((item) => item.track).filter(Boolean);

    return res.status(200).json({ tracks: parsedTracks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handler;
