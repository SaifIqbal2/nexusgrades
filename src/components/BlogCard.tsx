import React from 'react'
import { getOptimizedImageUrl } from '../lib/getOptimizedImageUrl'

interface BlogCardProps {
  post: any
  author: string
  readTime: number
  isFirstVisible: boolean
  canEdit: boolean
  onEdit: () => void
  onDelete: (id: string) => void
}

function BlogCard({ post, author, readTime, isFirstVisible, canEdit, onEdit, onDelete }: BlogCardProps) {
  const optimizedImage = post.image_url ? getOptimizedImageUrl(post.image_url, 400) : null

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transform hover:-translate-y-1 transition duration-100">
      <div className="relative">
        {optimizedImage ? (
          <img
            src={optimizedImage}
            alt={post.title}
            className="w-full h-52 object-cover blog-image-placeholder"
            width={400}
            height={208}
            loading={isFirstVisible ? 'eager' : 'lazy'}
            decoding="async"
            fetchpriority={isFirstVisible ? 'high' : 'auto'}
          />
        ) : (
          <div className="w-full h-52 bg-gray-100 flex items-center justify-center text-gray-400">No image</div>
        )}
        {post.category && (
          <span className="absolute top-3 left-3 bg-white/80 text-xs font-semibold text-gray-800 px-2 py-1 rounded-full">{post.category}</span>
        )}
      </div>
      <div className="p-4 flex flex-col h-60">
        <h2 className="text-lg font-bold mb-2 line-clamp-2">{post.title}</h2>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">{post.excerpt || post.content?.replace(/<[^>]+>/g, '').slice(0, 120)}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-gray-500">{readTime} min read</div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>{author}</span>
            <span>{post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}</span>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <a href={`/blog/${post.id}`} className="inline-block bg-[#7C3AED] text-white text-sm px-3 py-1 rounded">Read More</a>
          {canEdit && (
            <>
              <button onClick={onEdit} className="text-sm text-indigo-600">Edit</button>
              <button onClick={() => onDelete(post.id)} className="text-sm text-red-600">Delete</button>
            </>
          )}
        </div>
      </div>
    </article>
  )
}

export default React.memo(BlogCard)
