
import { Book, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface EbookCardProps {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  rating: number;
}

const EbookCard = ({
  id,
  title,
  author,
  coverUrl,
  description,
  rating,
}: EbookCardProps) => {
  // Generate star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${
              i < rating
                ? "text-education-secondary fill-education-secondary"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <Card className="overflow-hidden card-hover h-full">
      <Link to={`/ebooks/${id}`}>
        <div className="h-48 overflow-hidden">
          <img
            src={coverUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link to={`/ebooks/${id}`}>
          <h3 className="font-semibold text-lg mb-1 line-clamp-2 hover:text-education-primary transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
          by {author}
        </p>
        <div className="mb-3">{renderStars(rating)}</div>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default EbookCard;
