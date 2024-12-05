import LayouContact from '../layoutContact';
import TurtorRegister from './component/turtorregister';


const PageTurtoregister = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-[1048px]">
      <LayouContact />
      <TurtorRegister />
    </div>
  );
};

export default PageTurtoregister;
