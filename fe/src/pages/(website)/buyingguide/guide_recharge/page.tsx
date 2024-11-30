// src/App.js


import React from 'react';
import Recharge from './recharge';
import Menu from './menu';




const PageGuideRecharge = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-[1048px]">
      <Menu />
      <Recharge/>
    </div>
  );
};

export default PageGuideRecharge;
