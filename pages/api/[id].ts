import type { NextApiRequest, NextApiResponse } from 'next';
import type { Data } from '../../lib/getGame';
import getGame from '../../lib/getGame';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | string>,
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { id } = req.query;

  if (typeof id !== 'string') {
    res.status(400).send('Incorrect query');
    return;
  }

  const [status, data] = await getGame(id);

  res.status(status).json(data);
}
