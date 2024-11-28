// src/App.js


import React from 'react';
import Createaccout from './guide_createaccout/createaccout';
import Menu from './guide_createaccout/menu';



const PageBuyingguide = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-[1048px]">
      <Menu />
      <Createaccout />
    </div>
  );
};

export default PageBuyingguide;
