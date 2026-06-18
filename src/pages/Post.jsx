import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function Post() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const load = async () => {
      setLoading(true)
      const resp = await supabase.from('posts').select('*').eq('id', id).single()
      console.log('Post fetch response:', resp)
      const { data, error } = resp
      if (error) {
        console.error('Error loading post', error)
        setPost(null)
      } else {
        setPost(data)
      }
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) return <div className="max-w-4xl mx-auto py-12 px-4">Loading post...</div>
  if (!post) return <div className="max-w-4xl mx-auto py-12 px-4">Post not found.</div>

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <button onClick={() => navigate(-1)} className="mb-4 text-sm text-[#7C3AED]">&larr; Back</button>

      {post.image_url && (
        <img src={post.image_url} alt={post.title} className="w-full h-64 object-cover rounded mb-6" />
      )}

      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="text-sm text-gray-500 mb-4">{post.read_time ? `${post.read_time} min read` : ''} • {post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}</div>

      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  )
}
