
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { BookOpen, Code, FlaskConical, Palette, Calculator, Globe, Home, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const interests = [
  { id: "programming", label: "Programming", icon: Code },
  { id: "science", label: "Science", icon: FlaskConical },
  { id: "arts", label: "Arts & Design", icon: Palette },
  { id: "mathematics", label: "Mathematics", icon: Calculator },
  { id: "literature", label: "Literature", icon: BookOpen },
  { id: "geography", label: "Geography", icon: Globe },
];

const InterestsPage = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleContinue = () => {
    // Navigate to home page after selecting interests
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4">
      {/* Navigation Bar */}
      <div className="container mx-auto max-w-4xl mb-6">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-3xl font-bold text-purple-800 flex items-center gap-2">
            <Home size={24} />
            SHIKSH-SETU
          </Link>
          <div className="flex gap-4">
            <Link to="/" className="text-purple-600 hover:text-purple-800 flex items-center gap-1">
              <Home size={18} />
              Landing Page
            </Link>
            <Link to="/login" className="text-purple-600 hover:text-purple-800 flex items-center gap-1">
              <LogIn size={18} />
              Login
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Interests</h1>
          <p className="text-gray-600">Select the subjects that interest you the most</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {interests.map(({ id, label, icon: Icon }) => (
            <Card
              key={id}
              className={`p-4 cursor-pointer transition-all ${
                selectedInterests.includes(id)
                  ? "border-purple-500 bg-purple-50"
                  : "hover:border-purple-200"
              }`}
              onClick={() => toggleInterest(id)}
            >
              <div className="flex items-center space-x-4">
                <Icon className="w-6 h-6 text-purple-600" />
                <div className="flex-1">{label}</div>
                <Checkbox
                  checked={selectedInterests.includes(id)}
                  onCheckedChange={() => toggleInterest(id)}
                />
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            className="bg-purple-600 hover:bg-purple-700"
            disabled={selectedInterests.length === 0}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterestsPage;
