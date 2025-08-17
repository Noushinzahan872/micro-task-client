import React from "react";

const Blog = () => {
  const blogs = [
    {
      id: 1,
      title: "How to Become a Successful Freelancer",
      description:
        "Freelancing can give you freedom and flexibility. Learn how to start, build your profile, and land your first client.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 2,
      title: "Top 5 Productivity Tools for Developers",
      description:
        "Boost your efficiency with these amazing tools every developer should use in 2025.",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 3,
      title: "Why Remote Work is the Future",
      description:
        "Discover why remote jobs are increasing and how to prepare yourself for remote opportunities.",
      image:
        "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 4,
      title: "Mastering Time Management",
      description:
        "Time is money! Learn how to manage your time effectively and increase productivity.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Latest Blog Posts
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-gray-600 text-sm">{blog.description}</p>
              <button className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
