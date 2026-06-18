import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

const CATEGORY_OPTIONS = [
  'Cybersecurity',
  'Study Tips',
  'Academic Writing',
  'IT & Networking',
  'Programming',
]

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export default function BlogEditor({ post, onSaved, onCancel }) {
  const [title, setTitle] = useState(post?.title || '')
  const [slug, setSlug] = useState(post?.slug || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [content, setContent] = useState(post?.content || '')
  const [category, setCategory] = useState(post?.category || CATEGORY_OPTIONS[0])
  const [tags, setTags] = useState((post?.tags && post.tags.join(', ')) || '')
  const [status, setStatus] = useState(post?.status === 'published')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(post?.image_url || null)
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [readTime, setReadTime] = useState(post?.read_time || 1)

  const contentRef = React.useRef(null)

  useEffect(() => {
    if (contentRef.current && content) {
      contentRef.current.innerHTML = content
    }
  }, [])

  const compressImage = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        const img = new Image()
        img.src = event.target.result
        img.onload = () => {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height
          
          if (width > 1200) {
            height = (height * 1200) / width
            width = 1200
          }
          
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, width, height)
          
          canvas.toBlob((blob) => {
            resolve(new File([blob], file.name, { type: 'image/jpeg' }))
          }, 'image/jpeg', 0.8)
        }
      }
    })
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadProgress(10)
      const compressed = await compressImage(file)
      setImageFile(compressed)
      setImagePreview(URL.createObjectURL(compressed))
      setUploadProgress(0)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    setUploadProgress(20)
    try {
      const user = supabase.auth.getUser ? (await supabase.auth.getUser()).data.user : null
      const user_id = user?.id || null
      let imageUrl = null

      // Upload image to Supabase if new file selected
      if (imageFile) {
        try {
          const fileName = `${Date.now()}_${imageFile.name}`
          
          setUploadProgress(40)
          // Upload file
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('blog-images')
            .upload(fileName, imageFile, { upsert: false })
          
          if (uploadError) {
            console.error('Upload error:', uploadError.message)
            throw uploadError
          }
          
          console.log('File uploaded:', uploadData)
          
          setUploadProgress(70)
          // Get public URL
          const { data: urlData } = supabase.storage
            .from('blog-images')
            .getPublicUrl(fileName)
          
          imageUrl = urlData.publicUrl
          console.log('Generated URL:', imageUrl)
        } catch (imgErr) {
          console.error('Image handling error:', imgErr)
        }
      }

      setUploadProgress(80)
      // Get HTML content from contentEditable div
      const htmlContent = contentRef.current?.innerHTML || content
      const plainText = htmlContent.replace(/<[^>]*>/g, '')
      const read_time_calc = Math.max(1, Math.ceil((plainText || '').split(/\s+/).filter(Boolean).length / 200))
      setReadTime(read_time_calc)

      let dataToSave = {
        title,
        slug: slug || slugify(title),
        excerpt,
        content: htmlContent,
        category,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        read_time: read_time_calc,
        status: status ? 'published' : 'draft',
      }
      if (imageUrl) {
        dataToSave.image_url = imageUrl
      }

      if (post?.id) {
        // Update
        const { error } = await supabase.from('posts').update(dataToSave).eq('id', post.id)
        if (error) throw error
        console.log('Post updated successfully')
      } else {
        // Insert
        dataToSave.user_id = user_id
        const { error, data } = await supabase.from('posts').insert([dataToSave]).select()
        if (error) throw error
        console.log('Post created successfully:', data)
      }
      
      setUploadProgress(100)
      onSaved && onSaved()
    } catch (err) {
      console.error('Save error:', err)
      alert(err.message || 'Save failed')
    } finally {
      setLoading(false)
      setUploadProgress(0)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-1 text-gray-700">Title</label>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              setSlug(slugify(e.target.value))
            }}
            className="w-full px-3 py-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
            placeholder="Post title"
            disabled={loading}
          />

          <label className="block text-sm font-semibold mb-1 text-gray-700">Slug</label>
          <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full px-3 py-2 border rounded mb-3" placeholder="auto-generated slug" disabled={loading} />

          <label className="block text-sm font-semibold mb-1 text-gray-700">Excerpt</label>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value.slice(0,150))} rows={3} className="w-full px-3 py-2 border rounded mb-1" placeholder="Short description (max 150 chars)" disabled={loading} />
          <div className="text-xs text-gray-500 mb-3">{excerpt.length}/150</div>

          <label className="block text-sm font-semibold mb-1 text-gray-700">Content (Rich Text - paste formatted content here)</label>
          <div 
            ref={contentRef}
            contentEditable={!loading}
            suppressContentEditableWarning
            className="w-full px-3 py-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] min-h-96 bg-white overflow-y-auto"
            style={{
              outline: 'none',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word'
            }}
            onInput={(e) => setContent(e.currentTarget.innerHTML)}
          />
          <p className="text-xs text-gray-500">Paste formatted content here - bold, tables, lists, images will be preserved</p>
        </div>

        <div className="md:col-span-1">
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1 text-gray-700">Featured Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full mb-2" disabled={loading} />
            {imagePreview && (
              <img src={imagePreview} alt="preview" className="w-full h-40 object-cover rounded border" />
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1 text-gray-700">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border rounded mb-2" disabled={loading}>
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1 text-gray-700">Tags (comma-separated)</label>
            <input value={tags} onChange={(e) => setTags(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="e.g. react,javascript,study" disabled={loading} />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1 text-gray-700">Read Time</label>
            <div className="px-3 py-2 border rounded bg-gray-50">{readTime} min read</div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1 text-gray-700">Status</label>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setStatus(false)} className={`px-3 py-1 rounded ${!status ? 'bg-[#7C3AED] text-white' : 'border'}`}>Draft</button>
              <button type="button" onClick={() => setStatus(true)} className={`px-3 py-1 rounded ${status ? 'bg-[#7C3AED] text-white' : 'border'}`}>Published</button>
            </div>
          </div>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mb-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#7C3AED] h-2 rounded-full transition-all" style={{ width: `${uploadProgress}%` }}></div>
              </div>
              <p className="text-xs text-gray-600 mt-1">{uploadProgress}% uploading...</p>
            </div>
          )}

          <div className="flex gap-2 mt-4">
            <button onClick={handleSave} disabled={loading} className="bg-[#7C3AED] hover:bg-[#6a28c8] text-white px-4 py-2 rounded disabled:opacity-50">{loading ? 'Saving...' : 'Save'}</button>
            <button onClick={onCancel} disabled={loading} className="px-4 py-2 border rounded disabled:opacity-50">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}
