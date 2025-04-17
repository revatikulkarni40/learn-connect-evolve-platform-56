
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VideoCard from "@/components/cards/VideoCard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { featuredVideos } from "@/data/featured";
import { ThumbsUp, MessageSquare, Share2, Bookmark, Clock, Eye } from "lucide-react";

const VideoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [video, setVideo] = useState<any | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<any[]>([]);
  const [comment, setComment] = useState("");

  // Mock comments for the demo
  const [comments, setComments] = useState([
    {
      id: "c1",
      username: "JaneDoe",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      content: "This video was incredibly helpful for my project. Thanks for the clear explanations!",
      timestamp: "3 days ago",
      likes: 24,
    },
    {
      id: "c2",
      username: "TechGuru42",
      avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      content: "I've been struggling with this concept for weeks. This video made it so clear. Subscribed!",
      timestamp: "5 days ago",
      likes: 17,
    }
  ]);

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

  // Fetch video data
  useEffect(() => {
    if (id) {
      const foundVideo = featuredVideos.find(v => v.id === id);
      if (foundVideo) {
        setVideo(foundVideo);
        
        // Get related videos (same category, excluding current video)
        const related = featuredVideos
          .filter(v => v.category === foundVideo.category && v.id !== id)
          .slice(0, 4);
        
        setRelatedVideos(related);
      }
    }
  }, [id]);

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

  // Handle comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: `c${comments.length + 1}`,
        username: "CurrentUser",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
        content: comment,
        timestamp: "Just now",
        likes: 0,
      };
      
      setComments([newComment, ...comments]);
      setComment("");
    }
  };

  if (!video) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main className="flex-grow py-12">
          <div className="container-custom text-center">
            <h2 className="text-2xl font-semibold mb-4">Video Not Found</h2>
            <p className="mb-6">The video you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/videos">Back to Videos</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main className="flex-grow py-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Player and Info (2/3 width on large screens) */}
            <div className="lg:col-span-2">
              <div className="bg-black aspect-video w-full">
                <video 
                  src={video.videoUrl} 
                  poster={video.thumbnailUrl}
                  controls
                  className="w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              
              <div className="mt-4">
                <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Eye size={16} className="mr-1" />
                      <span>{formatViews(video.views)} views</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      <span>{video.uploadDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm" className="flex items-center">
                      <ThumbsUp size={18} className="mr-2" />
                      <span>Like</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center">
                      <Share2 size={18} className="mr-2" />
                      <span>Share</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center">
                      <Bookmark size={18} className="mr-2" />
                      <span>Save</span>
                    </Button>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {video.description}
                  </p>
                </div>
                
                {/* Comments Section */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Comments ({comments.length})</h3>
                  
                  {/* Comment Form */}
                  <form onSubmit={handleCommentSubmit} className="mb-6">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea 
                          placeholder="Add a comment..." 
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="w-full mb-2"
                        />
                        <div className="flex justify-end">
                          <Button type="submit" disabled={!comment.trim()}>
                            Comment
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                  
                  {/* Comment List */}
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex gap-4">
                        <Avatar>
                          <AvatarImage src={comment.avatarUrl} />
                          <AvatarFallback>{comment.username[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{comment.username}</span>
                            <span className="text-xs text-gray-500">{comment.timestamp}</span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-2">{comment.content}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                              <ThumbsUp size={14} />
                              <span>{comment.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                              <MessageSquare size={14} />
                              <span>Reply</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Related Videos Sidebar (1/3 width on large screens) */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Related Videos</h3>
              <div className="space-y-4">
                {relatedVideos.map((relatedVideo) => (
                  <Link 
                    key={relatedVideo.id} 
                    to={`/videos/${relatedVideo.id}`}
                    className="block"
                  >
                    <div className="flex gap-2">
                      <div className="relative w-40 h-24 flex-shrink-0">
                        <img 
                          src={relatedVideo.thumbnailUrl} 
                          alt={relatedVideo.title}
                          className="w-full h-full object-cover rounded-md"
                        />
                        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                          {formatDuration(relatedVideo.duration)}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium line-clamp-2 text-sm">
                          {relatedVideo.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                          {formatViews(relatedVideo.views)} views
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-xs">
                          {relatedVideo.uploadDate}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VideoPage;
