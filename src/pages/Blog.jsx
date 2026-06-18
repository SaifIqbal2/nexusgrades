import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import BlogEditor from '../components/BlogEditor'

const CATEGORY_OPTIONS = ['All', 'Cybersecurity', 'Study Tips', 'Academic Writing', 'IT & Networking', 'Programming']

function stripHtml(html = '') {
  if (!html) return ''
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(null)
  const [user, setUser] = useState(null)
  const [filter, setFilter] = useState('All')
  const [authors, setAuthors] = useState({})

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
    if (error) {
      console.error(error)
      setPosts([])
      setLoading(false)
      return
    }
    const posts = data || []
    setPosts(posts)

    // attempt to fetch author profiles if table exists
    const userIds = Array.from(new Set(posts.map(p => p.user_id).filter(Boolean)))
    if (userIds.length > 0) {
      try {
        const { data: profs } = await supabase.from('profiles').select('id, full_name, username').in('id', userIds)
        const map = {}
        (profs || []).forEach(r => { map[r.id] = r })
        setAuthors(map)
      } catch (e) {
        // profiles table may not exist; ignore
        setAuthors({})
      }
    }

    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return
    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (error) alert(error.message)
    else fetchPosts()
  }

  const filtered = posts.filter(p => filter === 'All' ? true : (p.category || '') === filter)

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Our Blog</h1>
        {user ? (
          <div className="text-sm text-slate-600">Signed in: {user.email}</div>
        ) : (
          <div className="text-sm text-slate-600">Please sign in to post</div>
        )}
      </div>

      <div className="mb-6 flex items-center gap-3 flex-wrap">
        {CATEGORY_OPTIONS.map(c => (
          <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1 rounded-full text-sm ${filter===c ? 'bg-[#7C3AED] text-white' : 'bg-gray-100 text-gray-700'}`}>{c}</button>
        ))}
      </div>

      <div className="mb-8">
        {user ? (
          <button onClick={() => setEditing({})} className="bg-[#7C3AED] text-white px-4 py-2 rounded">New Post</button>
        ) : null}
      </div>

      {editing && (
        <div className="mb-6">
          <BlogEditor post={editing} onSaved={() => { setEditing(null); fetchPosts() }} onCancel={() => setEditing(null)} />
        </div>
      )}

      {loading ? <div>Loading posts...</div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => {
            const text = p.excerpt || stripHtml(p.content || '')
            const excerpt = text.split('\n').join(' ').trim()
            const words = (stripHtml(p.content || '') || '').split(/\s+/).filter(Boolean).length
            const readTime = p.read_time || Math.max(1, Math.ceil(words / 200))
            const author = (authors && authors[p.user_id]) ? (authors[p.user_id].full_name || authors[p.user_id].username) : (p.user_id ? p.user_id.slice ? p.user_id.slice(0,8) : 'Author' : 'Author')

            return (
              <article key={p.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transform hover:-translate-y-1 transition">
                <div className="relative">
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.title} className="w-full h-52 object-cover" loading="lazy" />
                  ) : (
                    <div className="w-full h-52 bg-gray-100 flex items-center justify-center text-gray-400">No image</div>
                  )}
                  {p.category && (
                    <span className="absolute top-3 left-3 bg-white/80 text-xs font-semibold text-gray-800 px-2 py-1 rounded-full">{p.category}</span>
                  )}
                </div>
                <div className="p-4 flex flex-col h-60">
                  <h2 className="text-lg font-bold mb-2 line-clamp-2">{p.title}</h2>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">{excerpt}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs text-gray-500">{readTime} min read</div>
                    <div className="flex items-center gap-3">
                      <div className="text-xs text-gray-500">{author}</div>
                      <div className="text-xs text-gray-400">{p.created_at ? new Date(p.created_at).toLocaleDateString() : ''}</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <a href={`/blog/${p.id}`} className="inline-block bg-[#7C3AED] text-white text-sm px-3 py-1 rounded">Read More</a>
                    {user && user.id === p.user_id && (
                      <div className="inline-flex gap-2 ml-3">
                        <button onClick={() => setEditing(p)} className="text-sm text-indigo-600">Edit</button>
                        <button onClick={() => handleDelete(p.id)} className="text-sm text-red-600">Delete</button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
