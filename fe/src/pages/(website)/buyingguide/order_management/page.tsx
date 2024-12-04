// src/App.js

import Menu from "./menu";
import Order from "./order";


const PageOrder = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-[1048px]">
      <Menu />
      <Order />
    </div>
  );
};

export default PageOrder;
