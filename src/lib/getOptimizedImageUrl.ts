export const getOptimizedImageUrl = (supabaseUrl: string, width = 400): string => {
  // Encode the remote URL so Cloudflare Image Resize accepts it reliably
  try {
    const encoded = encodeURIComponent(supabaseUrl)
    return `https://nexusgrades.com/cdn-cgi/image/width=${width},quality=75,format=webp/${encoded}`
  } catch (e) {
    return `https://nexusgrades.com/cdn-cgi/image/width=${width},quality=75,format=webp/${supabaseUrl}`
  }
}
