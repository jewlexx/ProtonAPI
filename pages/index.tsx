import type { FunctionComponent } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { Fab, Paper as MPaper } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import type { Data, Tiers } from '../lib/getGame';
import getGame from '../lib/getGame';
import styles from '../styles/Home.module.css';

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

const Home: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>ProtonDB API</title>
    </Head>

    <h1 style={{ textAlign: 'center' }}>
      Put in a steam game id to get its info, <br />
      or go to <code>/api/GAME_ID</code> and get developer friendly info
    </h1>
  </div>
);

export default Home;
