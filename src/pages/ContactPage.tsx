
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/forms/ContactForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin 
} from "lucide-react";

const ContactPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check user's preferred color scheme
  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true" || 
                 (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("darkMode", (!isDarkMode).toString());
    
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // FAQ data
  const faqs = [
    {
      question: "How do I access the video content?",
      answer: "All video content is available directly on our platform. Simply navigate to the Videos section, select a category or search for specific content, and click on the video you wish to watch."
    },
    {
      question: "Are the e-books available for download?",
      answer: "Yes, all e-books can be downloaded in PDF format for offline reading once you've registered an account with us. Some premium e-books may require a subscription."
    },
    {
      question: "Do you offer certifications for completed courses?",
      answer: "We offer certificates of completion for most of our structured courses. These certificates can be downloaded and shared on your professional profiles."
    },
    {
      question: "Can I request specific educational content?",
      answer: "Absolutely! We welcome content suggestions from our community. Please use the contact form to send us your requests, and our team will evaluate the possibility of creating or sourcing the content you need."
    },
    {
      question: "How can I report technical issues?",
      answer: "If you encounter any technical issues while using our platform, please contact our support team via the contact form or email us directly at support@learnconnect.com. Please include details about the issue and screenshots if possible."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className="bg-gray-100 dark:bg-gray-900 py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
            Have questions or feedback? We'd love to hear from you. Reach out using any of the methods below,
            and our team will get back to you as soon as possible.
          </p>
        </div>
      </div>
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-education-primary/10 dark:bg-education-primary/20 p-3 rounded-full mr-4">
                      <MapPin className="text-education-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Office Location</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        1234 Education Ave,<br />
                        Learning City, ED 56789<br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-education-primary/10 dark:bg-education-primary/20 p-3 rounded-full mr-4">
                      <Phone className="text-education-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone Number</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-education-primary/10 dark:bg-education-primary/20 p-3 rounded-full mr-4">
                      <Mail className="text-education-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email Address</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        support@learnconnect.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-education-primary/10 dark:bg-education-primary/20 p-3 rounded-full mr-4">
                      <Clock className="text-education-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Support Hours</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Monday - Friday: 9am - 5pm EST<br />
                        Saturday: 10am - 2pm EST<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">Connect With Us</h2>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white p-3 rounded-full transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook size={20} />
                  </a>
                  <a 
                    href="#" 
                    className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white p-3 rounded-full transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter size={20} />
                  </a>
                  <a 
                    href="#" 
                    className="bg-[#E4405F] hover:bg-[#E4405F]/90 text-white p-3 rounded-full transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                  <a 
                    href="#" 
                    className="bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white p-3 rounded-full transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form and FAQ */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-6">Send Us a Message</h2>
                <ContactForm />
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
