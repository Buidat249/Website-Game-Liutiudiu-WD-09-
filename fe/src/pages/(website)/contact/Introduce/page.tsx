import LayouContact from '../layoutContact';
import Introduce from './component/introduce';

const PageIntroduce = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-[1048px]">
  <div className="flex-1">
    <LayouContact />
  </div>
  <div className="flex-1">
    <Introduce />
  </div>
</div>
  );
};

export default PageIntroduce;
