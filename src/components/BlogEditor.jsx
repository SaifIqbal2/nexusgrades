import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function BlogEditor({ post, onSaved, onCancel }) {
  const [title, setTitle] = useState(post?.title || '')
  const [content, setContent] = useState(post?.content || '')
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

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
          
          // Resize if too large
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
          }, 'image/jpeg', 0.8) // 80% quality
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
      // Prepare data
      let dataToSave = { title, content }
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
    <div className="bg-white p-4 rounded-lg shadow-md">
      <label className="block text-sm font-medium mb-1">Title</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border rounded mb-3" placeholder="Post title" disabled={loading} />
      
      <label className="block text-sm font-medium mb-1">Content</label>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} className="w-full px-3 py-2 border rounded mb-3" placeholder="Post content" disabled={loading} />
      
      <label className="block text-sm font-medium mb-1">Image</label>
      <input type="file" accept="image/*" onChange={handleImageChange} className="w-full px-3 py-2 border rounded mb-3" disabled={loading} />
      {imageFile && <p className="text-sm text-slate-600 mb-3">✓ Image selected: {imageFile.name}</p>}
      
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="mb-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-violet-600 h-2 rounded-full transition-all" style={{ width: `${uploadProgress}%` }}></div>
          </div>
          <p className="text-xs text-slate-600 mt-1">{uploadProgress}% uploading...</p>
        </div>
      )}
      
      <div className="flex gap-2">
        <button onClick={handleSave} disabled={loading} className="bg-violet-600 text-white px-4 py-2 rounded disabled:opacity-50">{loading ? 'Saving...' : 'Save'}</button>
        <button onClick={onCancel} disabled={loading} className="px-4 py-2 border rounded disabled:opacity-50">Cancel</button>
      </div>
    </div>
  )
}
