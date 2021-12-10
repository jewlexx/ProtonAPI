import type { FunctionComponent } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { Fab, Paper as MPaper } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import type { Data, Tiers } from '../../lib/getGame';
import getGame from '../../lib/getGame';
import styles from '../../styles/Home.module.css';

interface Props {
  data: Data;
  game: any;
  id: string;
}

const Paper: FunctionComponent<{ color: string }> = ({ color, children }) => (
  <MPaper
    style={{
      padding: '0.5rem 1rem',
      margin: '0.5rem',
      background: color,
    }}
  >
    {children}
  </MPaper>
);

const getColor = (tier: Tiers): string => {
  if (tier === 'native') {
    return 'rgb(0, 128, 0)';
  }
  if (tier === 'platinum') {
    return 'rgb(180, 199, 220)';
  }
  if (tier === 'gold') {
    return 'rgb(207, 181, 59)';
  }
  if (tier === 'silver') {
    return 'rgb(192, 192, 192)';
  }
  if (tier === 'bronze') {
    return 'rgb(205, 127, 50)';
  }
  return 'rgb(255, 0, 0)';
};

const firstCaps = (str: string): string =>
  str.slice(0, 1).toUpperCase() + str.slice(1);

const Home: NextPage<Props> = ({ data, game, id }) => (
  <div className={styles.container}>
    <Head>
      <title>{game.data.name} | ProtonDB API</title>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </Head>

    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={game.data.header_image}
      alt={`${game.data.name} Header Image`}
      style={{ maxWidth: '100vw' }}
    />

    <Fab
      style={{
        position: 'absolute',
        left: '15px',
        top: '15px',
      }}
      color="primary"
      href={`https://www.protondb.com/app/${id}`}
      target="_blank"
      rel="noreferrer"
      title="Open in Protondb"
    >
      <LinkIcon />
    </Fab>

    <h1>{game.data.name}</h1>

    <Paper color={getColor(data.tier)}>
      <p>Tier: {firstCaps(data.tier)}</p>
    </Paper>

    <Paper color={getColor(data.tier)}>
      <p>Trending Tier: {firstCaps(data.trendingTier)}</p>
    </Paper>

    <Paper color={getColor(data.tier)}>
      <p>Best Reported Tier: {firstCaps(data.bestReportedTier)}</p>
    </Paper>

    <Paper color={parseInt(data.confidence, 10) > 0.5 ? 'green' : 'orange'}>
      <p>Total Score: {data.score}</p>
    </Paper>

    <Paper color="yellow">
      <p>Confidence: {firstCaps(data.confidence)}</p>
    </Paper>

    <Paper color="orange">
      <p>Total Reports: {data.total}</p>
    </Paper>
  </div>
);

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { id } = ctx.query;

  if (typeof id !== 'string') {
    throw new Error('Invalid id provided');
  }

  const [, data] = await getGame(id);

  const gameUrl = `https://store.steampowered.com/api/appdetails?appids=${id}`;

  const game = await fetch(gameUrl).then((res) => res.json());

  return {
    props: {
      data,
      game: game[id],
      id,
    },
  };
};

export default Home;
