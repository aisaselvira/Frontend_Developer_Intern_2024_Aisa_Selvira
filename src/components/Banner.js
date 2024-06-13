import React from 'react';

const Banner = ({ imageUrl }) => {
  return (
    <div className="relative h-screen overflow-hidden">
      <div
        className="parallax-bg"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="relative h-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold">Ideas</h1>
          <p className="mt-4 text-lg md:text-2xl">Where all our great things begin</p>
        </div>
      </div>
      <div className="custom-slant"></div>
    </div>
  );
};

export default Banner;
