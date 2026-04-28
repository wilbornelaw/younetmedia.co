export interface Video {
  id: string
  title: string
  description: string | null
  cloudinary_public_id: string
  video_url: string
  hls_url: string | null
  hls_ready: boolean
  thumbnail_url: string
  thumbnail_offset_seconds: number
  duration: number | null
  created_at: string
}
