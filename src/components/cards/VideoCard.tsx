
import { Clock, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface VideoCardProps {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: number;
  views: number;
  date: string;
}

const VideoCard = ({
  id,
  title,
  description,
  thumbnailUrl,
  duration,
  views,
  date,
}: VideoCardProps) => {
  // Format duration from seconds to mm:ss
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Format views with K for thousands, M for millions
  const formatViews = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    } else {
      return count;
    }
  };

  return (
    <Card className="overflow-hidden card-hover h-full">
      <Link to={`/videos/${id}`}>
        <div className="relative">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full aspect-video object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {formatDuration(duration)}
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <Link to={`/videos/${id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-education-primary transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {description}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Eye size={14} />
            <span>{formatViews(views)} views</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{date}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
