
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface ArticleCardProps {
  id: string;
  title: string;
  author: {
    name: string;
    avatarUrl?: string;
  };
  featuredImageUrl: string;
  excerpt: string;
  publishDate: string;
  readTime: number;
}

const ArticleCard = ({
  id,
  title,
  author,
  featuredImageUrl,
  excerpt,
  publishDate,
  readTime,
}: ArticleCardProps) => {
  return (
    <Card className="overflow-hidden card-hover h-full">
      <Link to={`/articles/${id}`}>
        <div className="h-48 overflow-hidden">
          <img
            src={featuredImageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          {author.avatarUrl && (
            <img
              src={author.avatarUrl}
              alt={author.name}
              className="w-8 h-8 rounded-full mr-2"
            />
          )}
          <div>
            <p className="text-sm font-medium">{author.name}</p>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-3">
              <div className="flex items-center">
                <Calendar size={12} className="mr-1" />
                <span>{publishDate}</span>
              </div>
              <div className="flex items-center">
                <Clock size={12} className="mr-1" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
        <Link to={`/articles/${id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-education-primary transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
          {excerpt}
        </p>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
