import React from 'react';
import Usefetchrecord from '../Customhook/Usefetchrecord';
import { api_key } from '../component/Keys';
import Showfetchrecord from '../Customhook/Showfetchrecord';

const Toprated = () => {
  const ans = Usefetchrecord(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`);
   
  return <Showfetchrecord apidata={ans} label="Top Rated" />;
};

export default Toprated;