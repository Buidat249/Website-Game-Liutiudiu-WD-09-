import LayouContact from '../layoutContact';
import Fanpage from './conponent/fanpage';


const PageFanpage = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-[1048px]">
      <LayouContact />
      <Fanpage />
    </div>
  );
};

export default PageFanpage;
