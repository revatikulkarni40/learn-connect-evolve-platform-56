
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Video, FileText, Award } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title">About LearnConnect</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              LearnConnect is a comprehensive educational platform designed to provide high-quality learning resources to students worldwide. Our mission is to make education accessible, engaging, and effective for everyone.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Through our curated selection of videos, e-books, and articles, we aim to support learners at every stage of their educational journey, from beginners to advanced practitioners.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-start">
                <div className="bg-education-primary/10 p-2 rounded-md mr-3">
                  <Video className="text-education-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Premium Videos</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">High-quality educational videos</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-education-secondary/10 p-2 rounded-md mr-3">
                  <BookOpen className="text-education-secondary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Digital E-Books</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive learning materials</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-education-accent/10 p-2 rounded-md mr-3">
                  <FileText className="text-education-accent" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Expert Articles</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">In-depth topical explorations</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-600/10 p-2 rounded-md mr-3">
                  <Award className="text-purple-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Certifications</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Recognize your achievements</p>
                </div>
              </div>
            </div>
            <Button asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-education-primary/10 rounded-lg"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-education-secondary/10 rounded-lg"></div>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Students learning together" 
              className="rounded-lg shadow-lg relative z-10 w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
