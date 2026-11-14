import React from 'react';
import { BLOG_POSTS } from '../constants.tsx';
import { BlogPost } from '../types.ts';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  if (post.size === 'large') {
    return (
      <a
        href={`/blog/${post.href}`}
        className="block group col-span-1 lg:col-span-2 row-span-2 relative rounded-2xl overflow-hidden min-h-[380px] lg:h-auto cursor-pointer shadow-xs hover:shadow-xl transition-all border border-slate-200"
      >
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-aruna-950/90 via-aruna-950/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 sm:p-8 text-white">
          <div className="flex items-center gap-3 mb-3">
            <span className="py-1 px-3 bg-aruna-600/90 text-white rounded-lg text-xs font-bold shadow-xs">
              {post.category}
            </span>
            <span className="text-xs text-slate-300 font-mono">{post.date}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold leading-snug group-hover:text-aruna-200 transition-colors">
            {post.title}
          </h3>
        </div>
      </a>
    );
  }

  return (
    <a
      href={`/blog/${post.href}`}
      className="block group relative rounded-2xl overflow-hidden aspect-[16/10] cursor-pointer shadow-xs hover:shadow-xl transition-all border border-slate-200"
    >
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-aruna-950/90 via-aruna-950/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-5 text-white">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="py-0.5 px-2.5 bg-aruna-600/90 text-white rounded-md text-[10px] font-bold">
            {post.category}
          </span>
          <span className="text-[11px] text-slate-300 font-mono">{post.date}</span>
        </div>
        <h3 className="text-sm sm:text-base font-bold leading-tight group-hover:text-aruna-200 transition-colors">
          {post.title}
        </h3>
      </div>
    </a>
  );
};

interface BlogSectionProps {
  posts?: BlogPost[];
}

const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  const displayPosts = posts || BLOG_POSTS;
  return (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block py-1.5 px-3.5 bg-aruna-100 text-aruna-800 rounded-full text-xs font-bold tracking-wide uppercase mb-3">
            Wawasan Industri
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-aruna-900 tracking-tight mb-3">
            Edukasi Rantai Dingin & Pengolahan Ikan
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Panduan teknis bagi executive chef, purchasing manager, dan pelaku bisnis kuliner untuk memaksimalkan efisiensi bahan baku olahan laut.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-6">
          {displayPosts.map((post, index) => (
            <BlogCard key={index} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
