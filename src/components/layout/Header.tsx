
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Menu, 
  X, 
  Search, 
  Sun, 
  Moon, 
  BookOpen, 
  Video, 
  FileText, 
  Phone
} from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "@/components/language/LanguageSelector";

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header = ({ isDarkMode, toggleTheme }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-md dark:bg-education-dark/80 shadow-md" 
          : "bg-white dark:bg-education-dark"
      }`}
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-education-primary dark:text-white">
              Learn<span className="text-education-secondary">Connect</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-medium text-gray-700 hover:text-education-primary dark:text-gray-300 dark:hover:text-white transition-colors">
              {t("welcome")}
            </Link>
            <Link to="/videos" className="font-medium text-gray-700 hover:text-education-primary dark:text-gray-300 dark:hover:text-white transition-colors">
              {t("videos")}
            </Link>
            <Link to="/ebooks" className="font-medium text-gray-700 hover:text-education-primary dark:text-gray-300 dark:hover:text-white transition-colors">
              {t("ebooks")}
            </Link>
            <Link to="/articles" className="font-medium text-gray-700 hover:text-education-primary dark:text-gray-300 dark:hover:text-white transition-colors">
              {t("articles")}
            </Link>
            <Link to="/contact" className="font-medium text-gray-700 hover:text-education-primary dark:text-gray-300 dark:hover:text-white transition-colors">
              {t("contact")}
            </Link>
          </nav>

          {/* Search, Language Selector and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full w-60"
              />
            </div>
            <LanguageSelector />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-4">
            <LanguageSelector variant="minimal" />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex items-center mb-4">
              <Search className="text-gray-400 mr-2" size={18} />
              <Input
                type="text"
                placeholder="Search..."
                className="w-full"
              />
            </div>
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen size={20} />
                <span>{t("welcome")}</span>
              </Link>
              <Link 
                to="/videos" 
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <Video size={20} />
                <span>{t("videos")}</span>
              </Link>
              <Link 
                to="/ebooks" 
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen size={20} />
                <span>{t("ebooks")}</span>
              </Link>
              <Link 
                to="/articles" 
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText size={20} />
                <span>{t("articles")}</span>
              </Link>
              <Link 
                to="/contact" 
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone size={20} />
                <span>{t("contact")}</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
