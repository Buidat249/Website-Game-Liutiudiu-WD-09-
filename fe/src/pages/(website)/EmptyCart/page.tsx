import React from "react";
import EmptyCart from "./_components/emptcart";

function PageEmptCart() {
  return (
    <div className=" flex flex-col items-center justify-center w-screen px-5">
      <div className="   w-full max-w-4xl p-8">
        <EmptyCart />
      </div>
    </div>
  );
}

export default PageEmptCart;
