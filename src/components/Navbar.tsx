
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6 md:px-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full border-2 border-[#2EE697] flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2EE697] to-[#18A167]"></div>
          </div>
          <span className="text-white text-xl font-medium">RFP GLOBAL</span>
        </div>
        <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
          Contact
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
