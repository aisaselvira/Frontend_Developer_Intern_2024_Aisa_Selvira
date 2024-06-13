import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import ListPost from './components/ListPost';
import bannerImage from './assets/banner-suitmedia.png';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Banner imageUrl={bannerImage} />
        <ListPost />
      </div>
    </Router>
  );
};

export default App;
