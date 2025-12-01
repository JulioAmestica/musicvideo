import { getUsersPlaylists } from '../../lib/spotify';
import { getToken } from "next-auth/jwt";

const handler = async (req: any, res: any) => {
  try {
    const token = await getToken({ req });
    if (!token?.refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const playlists = await getUsersPlaylists(token.refreshToken as string);
    return res.status(200).json({ playlists });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handler;
