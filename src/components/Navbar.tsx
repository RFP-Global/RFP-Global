
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6 md:px-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {/* <div className="w-8 h-8 rounded-full border-2 border-[#2EE697] flex items-center justify-center"> */}
            <img 
              src="/lovable-uploads/2651105c-d331-4fad-b617-96466ab46f01.png" 
              alt="RFP Global Logo" 
              className="w-8 h-8 rounded-full"
            />
          {/* </div> */}
          <span className="text-white text-xl font-medium">RFP Global</span>
        </div>
        {/* Contact button removed */}
      </div>
    </nav>
  );
};

export default Navbar;
