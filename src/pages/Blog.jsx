import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import BlogEditor from '../components/BlogEditor'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchPosts()
    const init = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data?.user || null)
    }
    init()
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  const fetchPosts = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
    if (error) console.error(error)
    else setPosts(data || [])
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return
    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (error) alert(error.message)
    else fetchPosts()
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Blog</h1>
        {user ? (
          <div className="text-sm text-slate-600">Signed in: {user.email}</div>
        ) : (
          <div className="text-sm text-slate-600">Please sign in to post</div>
        )}
      </div>

      <div className="mb-8">
        {user ? (
          <button onClick={() => setEditing({})} className="bg-violet-600 text-white px-4 py-2 rounded">New Post</button>
        ) : null}
      </div>

      {editing && (
        <div className="mb-6">
          <BlogEditor post={editing} onSaved={() => { setEditing(null); fetchPosts() }} onCancel={() => setEditing(null)} />
        </div>
      )}

      {loading ? <div>Loading posts...</div> : (
        <div className="space-y-6">
          {posts.map(p => (
            <article key={p.id} className="bg-white p-4 rounded shadow">
              {p.image_url && (
                <img src={p.image_url} alt={p.title} className="w-full h-64 object-cover rounded mb-4" loading="lazy" />
              )}
              <h2 className="text-xl font-bold mb-2">{p.title}</h2>
              <div className="prose max-w-none mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: p.content }} />
              <div className="flex justify-between items-center">
                <div className="text-xs text-slate-500">{new Date(p.created_at).toLocaleString()}</div>
                <div className="flex gap-2">
                  {user && user.id === p.user_id && (
                    <>
                      <button onClick={() => setEditing(p)} className="text-sm text-indigo-600">Edit</button>
                      <button onClick={() => handleDelete(p.id)} className="text-sm text-red-600">Delete</button>
                    </>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
