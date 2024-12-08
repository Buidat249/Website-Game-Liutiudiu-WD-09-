import LayouContact from '../layoutContact';
import Recharge from './conponent/turtorrechange';


const PageTurRecharge = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-[1048px]">
      <LayouContact />
      <Recharge />
    </div>
  );
};

export default PageTurRecharge;
