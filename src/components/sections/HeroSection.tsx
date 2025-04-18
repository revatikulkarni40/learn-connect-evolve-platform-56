
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-indigo-600 to-indigo-900 dark:from-indigo-900 dark:to-gray-900 text-white py-24 lg:py-32 overflow-hidden">
      {/* Background decorations with enhanced animations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-education-secondary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-education-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Welcome to <span className="text-education-secondary">SHIKSHA-SETU</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Empowering education through technology. Join us on a journey of knowledge and growth.
          </p>
          <div className="flex justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              className="bg-white text-indigo-700 hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
              asChild
            >
              <Link to="/login" className="flex items-center gap-2">
                Get Started <ArrowRight className="ml-1 animate-pulse" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
