import type { NextApiRequest, NextApiResponse } from 'next';
import { youtube } from 'scrape-youtube';

type Data = { url?: string; message?: string };

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const query = (req.query.q as string) || '';
    if (!query.trim()) {
      return res.status(400).json({ message: 'Missing query' });
    }

    const { videos } = await youtube.search(query);
    const url = videos?.[0]?.link;
    if (!url) {
      return res.status(404).json({ message: 'No results' });
    }

    return res.status(200).json({ url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'YouTube search failed' });
  }
};

export default handler;
