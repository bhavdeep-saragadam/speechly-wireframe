
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, Play, Award, Mic, Volume2, Star } from "lucide-react";

const CoursesScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Sample course data
  const categories = [
    { id: "all", label: "All" },
    { id: "presentations", label: "Presentations" },
    { id: "interviews", label: "Interviews" },
    { id: "confidence", label: "Confidence" },
    { id: "voice", label: "Voice Training" }
  ];
  
  const courses = [
    {
      id: "course1",
      title: "Public Speaking Fundamentals",
      description: "Master the basics of effective public speaking",
      category: "presentations",
      duration: "4 lessons",
      level: "Beginner",
      icon: <BookOpen className="h-6 w-6 text-white" />
    },
    {
      id: "course2",
      title: "Interview Excellence",
      description: "Ace your next job interview with confidence",
      category: "interviews",
      duration: "6 lessons",
      level: "Intermediate",
      icon: <Mic className="h-6 w-6 text-white" />
    },
    {
      id: "course3",
      title: "Building Speaking Confidence",
      description: "Overcome anxiety and speak with authority",
      category: "confidence",
      duration: "5 lessons",
      level: "Beginner",
      icon: <Award className="h-6 w-6 text-white" />
    },
    {
      id: "course4",
      title: "Mastering Vocal Variety",
      description: "Use tone, pitch, and pace to engage any audience",
      category: "voice",
      duration: "4 lessons",
      level: "Advanced",
      icon: <Volume2 className="h-6 w-6 text-white" />
    },
    {
      id: "course5",
      title: "Persuasive Presentations",
      description: "Influence and inspire with powerful presentations",
      category: "presentations",
      duration: "7 lessons",
      level: "Advanced",
      icon: <BookOpen className="h-6 w-6 text-white" />
    }
  ];
  
  // Filter courses based on active category and search query
  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === "all" || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="p-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold mb-6">Courses</h1>
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="text"
            className="speeko-input pl-10"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Categories */}
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 mb-6 gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                activeCategory === category.id
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Recommended Course */}
        <h2 className="font-medium mb-3">Recommended for You</h2>
        <div className="speeko-card bg-gray-800 text-white mb-6">
          <div className="flex items-start">
            <div className="h-12 w-12 rounded-lg bg-white/20 flex items-center justify-center mr-4 mt-1">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-lg mb-1">Building Speaking Confidence</h3>
              <p className="text-gray-300 text-sm mb-3">
                Overcome anxiety and speak with authority in any situation.
              </p>
              <div className="flex items-center text-sm text-gray-300 mb-4">
                <span className="mr-4">5 lessons</span>
                <span>Beginner</span>
              </div>
              <div className="flex space-x-2">
                <div className="flex space-x-0.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="h-4 w-4" fill={star <= 4 ? "white" : "none"} />
                  ))}
                </div>
                <span className="text-sm">4.0 (125 ratings)</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20 flex justify-between">
            <div>
              <span className="text-sm text-gray-300">50% completed</span>
              <div className="h-1 bg-white/20 rounded-full w-32 mt-1">
                <div className="h-1 bg-white rounded-full w-1/2"></div>
              </div>
            </div>
            <button className="px-4 py-1 bg-white text-gray-800 rounded-lg text-sm flex items-center">
              <Play className="h-4 w-4 mr-1" />
              Continue
            </button>
          </div>
        </div>
        
        {/* Course List */}
        <h2 className="font-medium mb-3">All Courses</h2>
        <div className="space-y-4">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="speeko-card"
              >
                <div className="flex">
                  <div className="h-12 w-12 rounded-lg bg-gray-800 flex items-center justify-center mr-4">
                    {course.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{course.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-3">{course.duration}</span>
                      <span>{course.level}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
                  <button className="px-4 py-1 bg-gray-100 text-gray-800 rounded-lg text-sm flex items-center">
                    <Play className="h-4 w-4 mr-1" />
                    Start
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="speeko-card text-center py-6">
              <p className="text-gray-600">No courses match your search criteria.</p>
              <button 
                className="text-gray-800 font-medium mt-2"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CoursesScreen;
