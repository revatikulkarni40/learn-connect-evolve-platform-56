
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* About Section */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold mb-4 text-education-dark dark:text-white">
              Learn<span className="text-education-secondary">Connect</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Empowering learners worldwide with high-quality educational content and resources.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                aria-label="Facebook"
                className="text-gray-600 hover:text-education-primary dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                aria-label="Twitter"
                className="text-gray-600 hover:text-education-primary dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                aria-label="Instagram"
                className="text-gray-600 hover:text-education-primary dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                aria-label="LinkedIn"
                className="text-gray-600 hover:text-education-primary dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="#" 
                aria-label="YouTube"
                className="text-gray-600 hover:text-education-primary dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-education-dark dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-600 hover:text-education-primary dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/videos" 
                  className="text-gray-600 hover:text-education-primary dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Videos
                </Link>
              </li>
              <li>
                <Link 
                  to="/ebooks" 
                  className="text-gray-600 hover:text-education-primary dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  E-Books
                </Link>
              </li>
              <li>
                <Link 
                  to="/articles" 
                  className="text-gray-600 hover:text-education-primary dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-600 hover:text-education-primary dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-education-dark dark:text-white">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/videos?category=coding" 
                  className="text-gray-600 hover:text-education-primary dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Coding
                </Link>
              </li>
              <li>
                <Link 
                  to="/videos?category=dancing" 
                  className="text-gray-600 hover:text-education-primary dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Dancing
                </Link>
              </li>
              <li>
                <Link 
                  to="/videos?category=music" 
                  className="text-gray-600 hover:text-education-primary dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Music
                </Link>
              </li>
              <li>
                <Link 
                  to="/videos?category=sciences" 
                  className="text-gray-600 hover:text-education-primary dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Sciences
                </Link>
              </li>
              <li>
                <Link 
                  to="/videos?category=languages" 
                  className="text-gray-600 hover:text-education-primary dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Languages
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-education-dark dark:text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail size={20} className="text-education-primary mt-1" />
                <span className="text-gray-600 dark:text-gray-300">
                  support@learnconnect.com
                </span>
              </li>
              <li>
                <p className="text-gray-600 dark:text-gray-300">
                  1234 Education Ave,<br />
                  Learning City, ED 56789<br />
                  United States
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © {currentYear} LearnConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
