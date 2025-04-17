
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EbookCard from "@/components/cards/EbookCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { featuredEbooks } from "@/data/featured";
import { categories } from "@/data/categories";
import { Search, Filter } from "lucide-react";

const EbooksPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredEbooks, setFilteredEbooks] = useState(featuredEbooks);

  // Filter ebooks based on category and search term
  useEffect(() => {
    let filtered = [...featuredEbooks];
    
    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter(ebook => ebook.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        ebook => 
          ebook.title.toLowerCase().includes(term) || 
          ebook.description.toLowerCase().includes(term) ||
          ebook.author.toLowerCase().includes(term)
      );
    }
    
    setFilteredEbooks(filtered);
  }, [activeCategory, searchTerm]);

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className="bg-education-secondary/10 dark:bg-education-secondary/5 py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Digital E-Books</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
            Our comprehensive collection of e-books covers a wide range of subjects and topics.
            Download or read online to expand your knowledge at your own pace.
          </p>
        </div>
      </div>
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          {/* Search and filter section */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <form 
              onSubmit={handleSearchSubmit} 
              className="relative flex-grow"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search e-books by title, author, or keywords..."
                className="pl-10 pr-4 py-2 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
            
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-500" />
              <span className="hidden md:inline text-gray-600 dark:text-gray-400">Filter:</span>
            </div>
          </div>
          
          {/* Categories tabs */}
          <Tabs 
            defaultValue="all" 
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="mb-8"
          >
            <TabsList className="mb-6 flex flex-wrap">
              <TabsTrigger value="all">All E-Books</TabsTrigger>
              {categories.map(category => (
                <TabsTrigger key={category.id} value={category.slug}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value={activeCategory} forceMount>
              {filteredEbooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredEbooks.map(ebook => (
                    <EbookCard
                      key={ebook.id}
                      id={ebook.id}
                      title={ebook.title}
                      author={ebook.author}
                      coverUrl={ebook.coverUrl}
                      description={ebook.description}
                      rating={ebook.rating}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No e-books found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    We couldn't find any e-books matching your search criteria.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm("");
                      setActiveCategory("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          {/* Load more button would go here in a real implementation */}
          {filteredEbooks.length > 0 && (
            <div className="flex justify-center mt-12">
              <Button variant="outline">
                Load More
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EbooksPage;
