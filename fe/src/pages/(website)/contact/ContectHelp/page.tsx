
import LayouContact from '../layoutContact';
import ContactHelp from './component/contacthelp';


const PageContactHelp = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-[1048px]">
      <LayouContact />
      <ContactHelp />
    </div>
  );
};

export default PageContactHelp;
