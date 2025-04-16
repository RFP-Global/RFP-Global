
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black to-[#001A0F] overflow-hidden">
      {/* Background gradient circles with enhanced animation */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#2EE697]/30 rounded-full blur-[120px] animate-pulse-slow origin-center" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#2EE697]/30 rounded-full blur-[120px] animate-pulse-slow delay-1000 origin-center" />
      
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 min-h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-5xl font-medium text-white mb-6 animate-fade-in">
          Connecting <span className="text-[#2EE697]">borrowers</span> with premium <span className="text-[#2EE697]">lenders</span>. 
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mb-12">
          RFP elevates financial matchmaking with unparalleled discretion
          and exclusivity
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            size="lg"
            className="bg-[#2EE697] text-black hover:bg-[#2EE697]/90 px-8"
          >
            Apply Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="bg-black text-white border-white/20 hover:bg-white/10"
          >
            <Mail className="mr-2 h-5 w-5" /> 
            <span>Get in Touch</span>
          </Button>
        </div>
      </main>

      <footer className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center text-gray-500 text-sm">
        <span>Austin, TX</span>
        <span>© 2025 RFP Global. All rights reserved.</span>
      </footer>
    </div>
  );
};

export default Index;
