import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { FixedSizeGrid } from 'react-window'
import { supabase } from '../lib/supabaseClient'
import BlogCard from '../components/BlogCard'
const BlogEditor = React.lazy(() => import('../components/BlogEditor'))

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
  const [containerWidth, setContainerWidth] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(800)
  const containerRef = useRef(null)

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

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry?.contentRect?.width) {
        setContainerWidth(entry.contentRect.width)
      }
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    const handleResize = () => {
      setViewportHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', handleResize)
      sub.subscription?.unsubscribe()
    }
  }, [])

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
    if (error) {
      console.error(error)
      setPosts([])
      setLoading(false)
      return
    }

    const fetchedPosts = data || []
    setPosts(fetchedPosts)

    const userIds = Array.from(new Set(fetchedPosts.map((p) => p.user_id).filter(Boolean)))
    if (userIds.length > 0) {
      try {
        const { data: profs } = await supabase.from('profiles').select('id, full_name, username').in('id', userIds)
        const map = {}
        ;(profs || []).forEach((r) => {
          map[r.id] = r
        })
        setAuthors(map)
      } catch (e) {
        setAuthors({})
      }
    }

    setLoading(false)
  }, [])

  const handleDelete = useCallback(
    async (id) => {
      if (!confirm('Delete this post?')) return
      const { error } = await supabase.from('posts').delete().eq('id', id)
      if (error) {
        alert(error.message)
      } else {
        fetchPosts()
      }
    },
    [fetchPosts]
  )

  const filtered = useMemo(
    () => posts.filter((p) => (filter === 'All' ? true : (p.category || '') === filter)),
    [filter, posts]
  )

  const columnCount = useMemo(() => {
    if (containerWidth >= 1024) return 3
    if (containerWidth >= 640) return 2
    return 1
  }, [containerWidth])

  const rowCount = Math.ceil(filtered.length / columnCount)
  const gridHeight = Math.min(Math.max(680, viewportHeight - 240), rowCount * 520)

  const renderCard = useCallback(
    (post, index) => {
      const text = post.excerpt || stripHtml(post.content || '')
      const excerpt = text.split('\n').join(' ').trim()
      const words = (stripHtml(post.content || '') || '').split(/\s+/).filter(Boolean).length
      const readTime = post.read_time || Math.max(1, Math.ceil(words / 200))
      const authorData = authors[post.user_id]
      const author = authorData
        ? authorData.full_name || authorData.username
        : post.user_id
        ? post.user_id.slice(0, 8)
        : 'Author'

      return (
        <BlogCard
          key={post.id}
          post={post}
          author={author}
          readTime={readTime}
          isFirstVisible={index === 0}
          canEdit={Boolean(user && user.id === post.user_id)}
          onEdit={() => setEditing(post)}
          onDelete={handleDelete}
        />
      )
    },
    [authors, handleDelete, user]
  )

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const itemIndex = rowIndex * columnCount + columnIndex
    if (itemIndex >= filtered.length) {
      return null
    }
    return (
      <div style={style} className="p-3">
        {renderCard(filtered[itemIndex], itemIndex)}
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4" ref={containerRef}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Our Blog</h1>
        {user ? (
          <div className="text-sm text-slate-600">Signed in: {user.email}</div>
        ) : (
          <div className="text-sm text-slate-600">Please sign in to post</div>
        )}
      </div>

      <div className="mb-6 flex items-center gap-3 flex-wrap">
        {CATEGORY_OPTIONS.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-3 py-1 rounded-full text-sm ${filter === c ? 'bg-[#7C3AED] text-white' : 'bg-gray-100 text-gray-700'} transition-[background-color,color] duration-100`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mb-8">
        {user ? (
          <button onClick={() => setEditing({})} className="bg-[#7C3AED] text-white px-4 py-2 rounded transition-[background-color,color] duration-100">
            New Post
          </button>
        ) : null}
      </div>

      {editing && (
        <div className="mb-6">
          <React.Suspense fallback={<div className="text-center text-slate-600">Loading editor…</div>}>
            <BlogEditor post={editing} onSaved={() => { setEditing(null); fetchPosts() }} onCancel={() => setEditing(null)} />
          </React.Suspense>
        </div>
      )}

      {loading ? (
        <div>Loading posts...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-slate-600">No posts available yet.</div>
      ) : filtered.length > 20 && containerWidth > 0 ? (
        <FixedSizeGrid
          columnCount={columnCount}
          rowCount={rowCount}
          columnWidth={Math.floor(containerWidth / columnCount)}
          rowHeight={520}
          height={gridHeight}
          width={containerWidth}
          itemKey={({ columnIndex, rowIndex }) => rowIndex * columnCount + columnIndex}
          className="overflow-auto"
          overscanRowCount={3}
        >
          {Cell}
        </FixedSizeGrid>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, index) => renderCard(post, index))}
        </div>
      )}
    </div>
  )
}
