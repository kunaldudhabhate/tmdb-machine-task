import React from 'react';
import { api_key } from '../component/Keys';
import Usefetchrecord from '../Customhook/Usefetchrecord';
import Showfetchrecord from '../Customhook/Showfetchrecord';

const Home = () => {
  const ans = Usefetchrecord(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`);

  return <Showfetchrecord apidata={ans} label="Popular Movies" />;
};

export default Home;