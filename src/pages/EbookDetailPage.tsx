
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Book, BookOpen, Download, Star, User, Calendar, Clock } from "lucide-react";
import { featuredEbooks } from "@/data/featured";
import { categories } from "@/data/categories";
import TranslationPanel from "@/components/language/TranslationPanel";
import { useTranslation } from "react-i18next";

const EbookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [ebook, setEbook] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const { t } = useTranslation();

  // Mock reviews for the demo
  const reviews = [
    {
      id: "r1",
      username: "BookLover123",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      rating: 5,
      title: "Comprehensive and well-structured",
      content: "This book offers a thorough exploration of the subject matter. The author has done an excellent job explaining complex concepts in an accessible way. Highly recommended for beginners and intermediate learners alike.",
      date: "March 15, 2023",
    },
    {
      id: "r2",
      username: "LearningAlways",
      avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      rating: 4,
      title: "Great content, some formatting issues",
      content: "The content is excellent and very informative. My only complaint is that some of the diagrams don't display correctly on smaller screens. Otherwise, it's a valuable resource that I'll definitely be referring back to.",
      date: "January 22, 2023",
    }
  ];

  // Mock table of contents
  const tableOfContents = [
    { chapter: "Introduction", pages: "1-12" },
    { chapter: "Chapter 1: Getting Started", pages: "13-42" },
    { chapter: "Chapter 2: Core Concepts", pages: "43-68" },
    { chapter: "Chapter 3: Advanced Techniques", pages: "69-104" },
    { chapter: "Chapter 4: Practical Applications", pages: "105-158" },
    { chapter: "Chapter 5: Case Studies", pages: "159-202" },
    { chapter: "Conclusion", pages: "203-210" },
    { chapter: "Appendix A: Resources", pages: "211-218" },
    { chapter: "Appendix B: Glossary", pages: "219-230" },
  ];

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

  // Fetch ebook data
  useEffect(() => {
    if (id) {
      const foundEbook = featuredEbooks.find(e => e.id === id);
      if (foundEbook) {
        setEbook(foundEbook);
      }
    }
  }, [id]);

  // Generate star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={`${
              i < rating
                ? "text-education-secondary fill-education-secondary"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
        <span className="ml-2 text-gray-600 dark:text-gray-400">
          {rating.toFixed(1)} ({reviews.length} reviews)
        </span>
      </div>
    );
  };

  if (!ebook) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main className="flex-grow py-12">
          <div className="container-custom text-center">
            <h2 className="text-2xl font-semibold mb-4">E-Book Not Found</h2>
            <p className="mb-6">The e-book you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/ebooks">Back to E-Books</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Find category name
  const categoryName = categories.find(cat => cat.slug === ebook.category)?.name || "";

  return (
    <div className="min-h-screen flex flex-col">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Book Cover (1/3 width on medium screens) */}
            <div className="md:col-span-1">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <img 
                  src={ebook.coverUrl} 
                  alt={ebook.title}
                  className="w-full object-cover aspect-[2/3] rounded-md"
                />
                <div className="flex flex-col gap-3 mt-4">
                  <Button variant="default" className="w-full">
                    <BookOpen className="mr-2 h-4 w-4" /> 
                    Read Online
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" /> 
                    Download PDF
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Book Details (2/3 width on medium screens) */}
            <div className="md:col-span-2">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <li className="inline-flex items-center">
                    <Link to="/ebooks" className="hover:text-education-primary">E-Books</Link>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <span className="mx-2">/</span>
                      <Link to={`/ebooks?category=${ebook.category}`} className="hover:text-education-primary">{categoryName}</Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <span className="mx-2">/</span>
                      <span className="truncate max-w-[200px]">{ebook.title}</span>
                    </div>
                  </li>
                </ol>
              </nav>
              
              <h1 className="text-3xl font-bold mt-4 mb-2">{ebook.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                by <span className="font-medium">{ebook.author}</span>
              </p>
              
              <div className="mb-6">{renderStars(ebook.rating)}</div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Book size={18} className="text-gray-500" />
                  <span>230 pages</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-gray-500" />
                  <span>Published 2023</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={18} className="text-gray-500" />
                  <span>For all levels</span>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {ebook.description}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  This comprehensive e-book is designed to help learners of all levels master the subject matter in a structured and accessible way. From foundational concepts to advanced techniques, the content is organized to build your knowledge progressively.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  Whether you're a beginner looking to get started or an experienced practitioner seeking to refresh your knowledge, this e-book offers valuable insights and practical examples you can apply immediately.
                </p>
              </div>
              
              {/* Translation Panel for Ebook Preview */}
              <TranslationPanel 
                originalText={`This is a sample preview from the e-book "${ebook.title}" by ${ebook.author}.\n\n${ebook.description}\n\nChapter 1: Introduction\n\nThis chapter introduces the fundamental concepts that will be covered throughout this book. By understanding these basic principles, you'll be equipped with the knowledge foundation necessary to grasp more advanced topics in later chapters.`} 
                type="ebook" 
              />
            </div>
          </div>
          
          {/* Tabs for Table of Contents and Reviews */}
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="mt-8"
          >
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="contents">Table of Contents</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">About This E-Book</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    This book is perfect for anyone who wants to deepen their understanding of {categoryName}. The author draws on years of experience to provide a clear and concise guide that bridges theory and practice.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Each chapter builds on the previous one, ensuring a smooth learning curve from basic to advanced concepts. The e-book includes practical exercises, real-world examples, and case studies to reinforce learning.
                  </p>
                  <h4 className="font-semibold mt-6 mb-2">Key Features:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Comprehensive coverage of all essential topics</li>
                    <li>Step-by-step tutorials with detailed explanations</li>
                    <li>Practical exercises to reinforce learning</li>
                    <li>Real-world case studies and applications</li>
                    <li>References for further reading and exploration</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">What You'll Learn</h3>
                  <ul className="space-y-4">
                    {tableOfContents.slice(1, 6).map((item, index) => (
                      <li key={index} className="flex">
                        <div className="mr-4 h-8 w-8 flex items-center justify-center rounded-full bg-education-primary/10 text-education-primary">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{item.chapter.split(": ")[1] || item.chapter}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Pages {item.pages}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="contents">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-6">Table of Contents</h3>
                <div className="space-y-4">
                  {tableOfContents.map((item, index) => (
                    <div key={index} className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-start">
                        <span className="text-gray-500 dark:text-gray-400 mr-4 font-mono">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span>{item.chapter}</span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400">
                        Pages {item.pages}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Reader Reviews</h3>
                  <Button>Write a Review</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="text-4xl font-bold mr-2">{ebook.rating.toFixed(1)}</span>
                      <div className="flex flex-col">
                        <div className="flex">{renderStars(ebook.rating)}</div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {reviews.length} reviews
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = reviews.filter(r => Math.round(r.rating) === star).length;
                        const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                        
                        return (
                          <div key={star} className="flex items-center">
                            <div className="flex items-center w-20">
                              <span>{star}</span>
                              <Star size={14} className="ml-1 text-education-secondary fill-education-secondary" />
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 mx-2 rounded-full">
                              <div 
                                className="bg-education-secondary h-2 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm w-10 text-right">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Review Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">All Reviews</Button>
                      <Button variant="outline" size="sm">Most Helpful</Button>
                      <Button variant="outline" size="sm">Critical</Button>
                      <Button variant="outline" size="sm">Recent</Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  {reviews.map((review) => (
                    <div key={review.id} className="pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0">
                      <div className="flex items-start">
                        <Avatar className="mr-4">
                          <AvatarImage src={review.avatarUrl} />
                          <AvatarFallback>{review.username[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h4 className="font-semibold">{review.username}</h4>
                            <span className="mx-2">•</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {review.date}
                            </span>
                          </div>
                          <div className="flex my-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={`${
                                  i < review.rating
                                    ? "text-education-secondary fill-education-secondary"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                          <h5 className="font-medium mt-2">{review.title}</h5>
                          <p className="text-gray-700 dark:text-gray-300 mt-1">
                            {review.content}
                          </p>
                          <div className="flex items-center mt-3 text-sm">
                            <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                              Helpful
                            </button>
                            <span className="mx-2">|</span>
                            <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                              Report
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EbookDetailPage;
