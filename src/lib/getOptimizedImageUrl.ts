export const getOptimizedImageUrl = (supabaseUrl: string, width = 400): string => {
  return `https://nexusgrades.com/cdn-cgi/image/width=${width},quality=75,format=webp/${supabaseUrl}`
}
