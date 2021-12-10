export type Tiers =
  | 'borked'
  | 'bronze'
  | 'silver'
  | 'gold'
  | 'platinum'
  | 'native';

export interface Data {
  confidence: string;
  /* Between 0 and 1 */
  score: number;
  total: number;
  tier: Tiers;
  trendingTier: Tiers;
  bestReportedTier: Tiers;
}

export default async function getGame(id: string): Promise<[number, Data]> {
  const url = `https://www.protondb.com/api/v1/reports/summaries/${id}.json`;

  const [status, data]: [number, Data] = await fetch(url).then((res) => {
    return new Promise((resolve) => {
      res.json().then((json) => {
        resolve([res.status, json]);
      });
    });
  });

  return [status, data];
}
