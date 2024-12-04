// src/App.js


import React from 'react';
import Shopping from './shopping';
import Menu from './menu';


const PageShopping = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-[1048px]">
      <Menu />
      <Shopping />
    </div>
  );
};

export default PageShopping;
