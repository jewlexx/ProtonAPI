import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>ProtonDB API</title>
      <meta
        name="description"
        content="Get relevant info about your favourite steam games"
      />
      <meta
        name="keywords"
        content="Steam, Gaming, Proton, Linux, Windows, Wine"
      />
      <meta name="author" content="jamesinaxx" />
    </Head>

    <h1 style={{ textAlign: 'center' }}>
      Go to <code>/game/GAME_ID</code> to get the relevant info, <br />
      or go to <code>/api/GAME_ID</code> and get developer friendly info
    </h1>

    <a href="/lighthouse.html">Check out the lighthouse scores</a>
  </div>
);

export default Home;
