
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Home, LogIn, BookOpen } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just navigate to interests page
    navigate("/interests");
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
            <Link to="/interests" className="text-purple-600 hover:text-purple-800 flex items-center gap-1">
              <BookOpen size={18} />
              Choose Interests
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
