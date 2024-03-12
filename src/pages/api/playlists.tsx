import { getUsersPlaylists } from '../../lib/spotify';
import { getToken } from "next-auth/jwt";

const handler = async (req: any, res: any) => {
  try {
    const token = await getToken({ req });
    const playlists = await getUsersPlaylists(token?.accessToken as string,token?.name as string);
    return res.status(200).json({playlists});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handler;
