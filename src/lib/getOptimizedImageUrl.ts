export const getOptimizedImageUrl = (supabaseUrl: string, width = 400): string => {
  // You mentioned you don't manage Cloudflare — return the direct Supabase
  // URL so the browser loads the original image and avoids /cdn-cgi/ 404s.
  return supabaseUrl
}
