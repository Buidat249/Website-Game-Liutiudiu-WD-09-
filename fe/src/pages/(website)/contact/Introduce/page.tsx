
import LayouContact from '../layoutContact';
import Introduce from './component/introduce';


const PageIntroduce = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-[1048px]">
      <LayouContact />
      <Introduce />
    </div>
  );
};

export default PageIntroduce;
