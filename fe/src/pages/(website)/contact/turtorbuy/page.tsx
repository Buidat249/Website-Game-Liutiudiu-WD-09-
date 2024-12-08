
import LayouContact from '../layoutContact';
import Shopping from './component/turtorbuypage';


const PageTurtorBuy = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-[1048px]">
      <LayouContact />
      <Shopping />
    </div>
  );
};

export default PageTurtorBuy;
