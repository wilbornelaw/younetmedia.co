export function formatDuration(seconds: number | null): string {
  if (!seconds) return '0:00'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }
  return `${m}:${String(s).padStart(2, '0')}`
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatDateTimeLocalInput(iso: string): string {
  const date = new Date(iso)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day}T${hours}:${minutes}`
}

function hashString(value: string): number {
  let hash = 0

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0
  }

  return hash
}

export function getRandomVideoViews(video: { id: string }): number {
  const minimumViews = 50_000
  const additionalRange = 2_450_000

  return minimumViews + (hashString(video.id) % (additionalRange + 1))
}

export function formatViewCount(views: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: views >= 1_000_000 ? 1 : 0,
  }).format(views)
}

export const DEFAULT_THUMBNAIL_OFFSET_SECONDS = 2
export const HOME_PAGE_SIZE = 24

export function cloudinaryThumbnail(
  publicId: string,
  cloudName: string,
  seekSeconds = DEFAULT_THUMBNAIL_OFFSET_SECONDS
): string {
  const offset = Number.isFinite(seekSeconds)
    ? Math.max(0, Math.round(seekSeconds))
    : DEFAULT_THUMBNAIL_OFFSET_SECONDS

  return `https://res.cloudinary.com/${cloudName}/video/upload/so_${offset},w_640,h_360,c_fill,f_jpg/${publicId}.jpg`
}

export function cloudinaryHlsUrl(publicId: string, cloudName: string): string {
  return `https://res.cloudinary.com/${cloudName}/video/upload/sp_auto/${publicId}.m3u8`
}

export function getVideoThumbnailUrl(video: {
  cloudinary_public_id: string
  thumbnail_offset_seconds?: number | null
  thumbnail_url: string
}): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  if (!cloudName) {
    return video.thumbnail_url
  }

  return cloudinaryThumbnail(
    video.cloudinary_public_id,
    cloudName,
    video.thumbnail_offset_seconds ?? DEFAULT_THUMBNAIL_OFFSET_SECONDS
  )
}

export function parsePageParam(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value
  const parsed = Number(raw)

  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1
  }

  return Math.floor(parsed)
}

export function parseSearchParam(value: string | string[] | undefined): string {
  const raw = Array.isArray(value) ? value[0] : value
  return raw?.trim() ?? ''
}
