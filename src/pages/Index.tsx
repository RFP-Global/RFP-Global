import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { ApplyForm } from "@/components/ApplyForm";

const Index = () => {
  const [applyFormOpen, setApplyFormOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse position for cloud animation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        
        // Calculate relative mouse position within the container
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate much more dramatic cloud transformations
  const topCloudStyle = {
    transform: `translate(${(mousePosition.x - 0.5) * 80}px, ${(mousePosition.y - 0.5) * 80}px) scale(${1 + mousePosition.y * 0.2})`,
    transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
    opacity: 0.35 + mousePosition.y * 0.2,
  };

  const bottomCloudStyle = {
    transform: `translate(${(mousePosition.x - 0.5) * -100}px, ${(mousePosition.y - 0.5) * -60}px) scale(${1 + (1 - mousePosition.y) * 0.3})`,
    transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
    opacity: 0.35 + (1 - mousePosition.y) * 0.2,
  };

  // Add a third cloud for more visual interest
  const middleCloudStyle = {
    transform: `translate(${(mousePosition.x - 0.5) * 120}px, ${(mousePosition.y - 0.5) * -40}px) rotate(${(mousePosition.x - 0.5) * 10}deg)`,
    transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
    opacity: 0.3 + Math.abs(mousePosition.x - 0.5) * 0.3,
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-black to-[#001A0F] overflow-hidden"
    >
      {/* Main large cloud with enhanced reactivity */}
      <div 
        className="absolute top-1/4 right-1/3 w-[700px] h-[700px] bg-[#2EE697]/30 rounded-full blur-[100px] origin-center" 
        style={topCloudStyle}
      />
      
      {/* Bottom cloud with opposite movement */}
      <div 
        className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-[#2EE697]/30 rounded-full blur-[100px] origin-center" 
        style={bottomCloudStyle}
      />
      
      {/* Middle smaller cloud for more dynamic effect */}
      <div 
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-[#2EE697]/25 rounded-full blur-[80px] origin-center -translate-x-1/2 -translate-y-1/2" 
        style={middleCloudStyle}
      />
      
      {/* Small accent clouds that move dramatically with cursor */}
      <div 
        className="absolute top-1/3 left-1/4 w-[200px] h-[200px] bg-[#2EE697]/20 rounded-full blur-[50px]"
        style={{
          transform: `translate(${(mousePosition.x - 0.5) * 150}px, ${(mousePosition.y - 0.5) * 150}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      
      <div 
        className="absolute bottom-1/3 right-1/4 w-[250px] h-[250px] bg-[#2EE697]/20 rounded-full blur-[60px]"
        style={{
          transform: `translate(${(mousePosition.x - 0.5) * -180}px, ${(mousePosition.y - 0.5) * -120}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 min-h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-5xl font-medium text-white mb-6 animate-fade-in">
          Connecting <span className="text-[#2EE697]">vetted</span> borrowers with <span className="text-[#2EE697]">premium </span> lenders. 
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mb-12">
          RFP elevates financial matchmaking with unparalleled discretion
          and exclusivity
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            size="lg"
            className="bg-[#2EE697] text-black hover:bg-[#2EE697]/90 px-8"
            onClick={() => setApplyFormOpen(true)}
          >
            Apply <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="bg-black text-white border-white/20 hover:bg-white/10 hover:text-white group"
            onClick={() => window.open('mailto:rfppartners01@gmail.com?subject=Inquiry about RFP Global&body=I would like to learn more about your services.', '_blank')}
          >
            <Mail className="mr-2 h-5 w-5 group-hover:text-white" /> 
            <span className="group-hover:text-white">Inquire</span>
          </Button>
        </div>
      </main>

      <footer className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center text-gray-500 text-sm">
        <span>Austin, TX</span>
        <span>© 2025 RFP Global. All rights reserved.</span>
      </footer>

      {/* Apply Form Dialog */}
      <ApplyForm open={applyFormOpen} onOpenChange={setApplyFormOpen} />
    </div>
  );
};

export default Index;