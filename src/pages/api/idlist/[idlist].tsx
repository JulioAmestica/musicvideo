import { getPlaylistTracks } from '../../../lib/spotify';
import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

const handler = async (req:any, res:any) => {
  const token = await getToken({ req, secret });
  const query = req.query;
  const { idlist } = query;
  const tracks = await getPlaylistTracks(token.accessToken as string, idlist);
  return res.status(200).json({tracks});
};

export default handler;
