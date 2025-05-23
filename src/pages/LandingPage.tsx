
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { GraduationCap, BookOpen, Users, LogIn } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-purple-800">SHIKSHA-SETU</h1>
          <div className="flex gap-4">
            <Link to="/login" className="text-purple-600 hover:text-purple-800 flex items-center gap-1">
              <LogIn size={18} />
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 animate-fade-in">
            Welcome to <span className="text-purple-600">SHIKSHA-SETU</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Connect with personalized learning paths and discover your true potential
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              onClick={() => navigate("/login")}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Log In <LogIn className="ml-2" />
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="p-6 bg-white rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <GraduationCap className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
            <p className="text-gray-600">
              Tailored educational paths based on your interests and goals
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <BookOpen className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Rich Resources</h3>
            <p className="text-gray-600">
              Access to comprehensive study materials and guides
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '1.5s' }}>
            <Users className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Community Support</h3>
            <p className="text-gray-600">
              Connect with peers and mentors in your field of study
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
