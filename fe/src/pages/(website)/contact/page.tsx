// src/App.js

import React from 'react';
import Menu from './_components/menu';
import Content from './_components/content';


const PageContact = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-[1048px]">
      <Menu />
      <Content />
    </div>
  );
};

export default PageContact;
