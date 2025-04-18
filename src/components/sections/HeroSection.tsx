
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-indigo-600 to-indigo-900 dark:from-indigo-900 dark:to-gray-900 text-white py-24 lg:py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-education-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-education-accent/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Welcome to <span className="text-education-secondary">SHIKSHA-SETU</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 animate-fade-in animate-delay-200">
            Empowering education through technology. Join us on a journey of knowledge and growth.
          </p>
          <div className="flex justify-center gap-4 animate-fade-in animate-delay-300">
            <Button 
              size="lg" 
              className="bg-white text-indigo-700 hover:bg-gray-100 hover:scale-105 transition-transform duration-300"
              asChild
            >
              <Link to="/login">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
