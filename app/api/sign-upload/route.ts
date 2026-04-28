import { NextResponse } from 'next/server'
import { configureCloudinary, getCloudinaryWebhookUrl } from '@/lib/cloudinary'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const cloudinary = configureCloudinary()

  const timestamp = Math.round(Date.now() / 1000)
  const eager = 'sp_auto'
  const eager_async = true
  const eager_notification_url = getCloudinaryWebhookUrl(request)
  const signature = cloudinary.utils.api_sign_request(
    { eager, eager_async, eager_notification_url, folder: 'videos', timestamp },
    process.env.CLOUDINARY_API_SECRET!
  )

  return NextResponse.json({
    signature,
    timestamp,
    eager,
    eager_async,
    eager_notification_url,
    api_key: process.env.CLOUDINARY_API_KEY,
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  })
}
