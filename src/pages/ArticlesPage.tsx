
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ArticleCard from "@/components/cards/ArticleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { featuredArticles } from "@/data/featured";

const ArticlesPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(featuredArticles);

  // Filter articles based on search term
  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const filtered = featuredArticles.filter(
        article => 
          article.title.toLowerCase().includes(term) || 
          article.excerpt.toLowerCase().includes(term) ||
          article.author.name.toLowerCase().includes(term)
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(featuredArticles);
    }
  }, [searchTerm]);

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

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering is handled by the useEffect
  };

  // Get featured article
  const featuredArticle = featuredArticles[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className="bg-education-accent/10 dark:bg-education-accent/5 py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Educational Articles</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
            Dive deep into topics with our expert-written articles. Stay informed about the
            latest developments, theories, and practical applications across various subjects.
          </p>
        </div>
      </div>
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          {/* Featured Article */}
          <div className="mb-16">
            <h2 className="section-title mb-8">Featured Article</h2>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <img 
                  src={featuredArticle.featuredImageUrl} 
                  alt={featuredArticle.title} 
                  className="w-full h-96 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="lg:col-span-2 flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  {featuredArticle.author.avatarUrl && (
                    <img 
                      src={featuredArticle.author.avatarUrl} 
                      alt={featuredArticle.author.name} 
                      className="w-10 h-10 rounded-full mr-3" 
                    />
                  )}
                  <div>
                    <p className="font-medium">{featuredArticle.author.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {featuredArticle.publishDate} · {featuredArticle.readTime} min read
                    </p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{featuredArticle.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{featuredArticle.excerpt}</p>
                <Button asChild>
                  <a href={`/articles/${featuredArticle.id}`}>Read Article</a>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Search section */}
          <div className="mb-12">
            <form 
              onSubmit={handleSearchSubmit} 
              className="relative max-w-2xl mx-auto"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10 pr-4 py-2 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          
          {/* All Articles */}
          <div>
            <h2 className="section-title mb-8">All Articles</h2>
            
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map(article => (
                  <ArticleCard
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    author={article.author}
                    featuredImageUrl={article.featuredImageUrl}
                    excerpt={article.excerpt}
                    publishDate={article.publishDate}
                    readTime={article.readTime}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  We couldn't find any articles matching your search criteria.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search
                </Button>
              </div>
            )}
            
            {/* Load more button would go here in a real implementation */}
            {filteredArticles.length > 0 && (
              <div className="flex justify-center mt-12">
                <Button variant="outline">
                  Load More
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticlesPage;
