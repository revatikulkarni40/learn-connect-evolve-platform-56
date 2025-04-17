
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoCard from "@/components/cards/VideoCard";
import EbookCard from "@/components/cards/EbookCard";
import ArticleCard from "@/components/cards/ArticleCard";
import { featuredVideos, featuredEbooks, featuredArticles } from "@/data/featured";

const FeaturedContentSection = () => {
  const [activeTab, setActiveTab] = useState("videos");

  return (
    <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="section-title">Featured Content</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our most popular educational resources curated for effective learning
          </p>
        </div>

        <Tabs 
          defaultValue="videos" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 sm:w-auto w-full">
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="ebooks">E-Books</TabsTrigger>
              <TabsTrigger value="articles">Articles</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="videos" className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredVideos.slice(0, 8).map((video) => (
                <VideoCard
                  key={video.id}
                  id={video.id}
                  title={video.title}
                  description={video.description}
                  thumbnailUrl={video.thumbnailUrl}
                  duration={video.duration}
                  views={video.views}
                  date={video.uploadDate}
                />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button asChild>
                <a href="/videos">View All Videos</a>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="ebooks" className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredEbooks.slice(0, 8).map((ebook) => (
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
            <div className="flex justify-center mt-8">
              <Button asChild>
                <a href="/ebooks">View All E-Books</a>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="articles" className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.slice(0, 6).map((article) => (
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
            <div className="flex justify-center mt-8">
              <Button asChild>
                <a href="/articles">View All Articles</a>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturedContentSection;
