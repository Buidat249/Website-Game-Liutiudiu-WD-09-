import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PaymentMomo from "./_components/paymm";

const PagePayMomo = () => {
  const location = useLocation();
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  useEffect(() => {
    if (location.state?.selectedItems) {
      console.log("Updated selectedItems from location state momo:", location.state.selectedItems);
      setSelectedItems(location.state.selectedItems);
    } else {
      console.error("No selectedItems in location.state");
    }
  }, [location.state]);

  return (
    <div>
      {/* Truyền selectedItems vào PaymentMomo */}
      <PaymentMomo selectedItems={selectedItems} />
    
    </div>
  );
};

export default PagePayMomo;
