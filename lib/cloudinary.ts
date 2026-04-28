import { v2 as cloudinary } from 'cloudinary'

let isConfigured = false

export function configureCloudinary() {
  if (isConfigured) {
    return cloudinary
  }

  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  isConfigured = true

  return cloudinary
}

export function getCloudinaryWebhookUrl(request: Request) {
  if (process.env.CLOUDINARY_EAGER_NOTIFICATION_URL) {
    return process.env.CLOUDINARY_EAGER_NOTIFICATION_URL
  }

  return new URL('/api/cloudinary/webhook', request.url).toString()
}
