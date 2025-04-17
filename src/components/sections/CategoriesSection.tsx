
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "@/data/categories";

const CategoriesSection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Popular Categories</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our wide range of educational categories to find the perfect content for your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/videos?category=${category.slug}`}
              className="group relative overflow-hidden rounded-xl card-hover"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10" />
              <img 
                src={category.imageUrl} 
                alt={category.name}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-white text-xl font-semibold mb-1">{category.name}</h3>
                <p className="text-white/80 text-sm">{category.count} courses</p>
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="text-white" size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
