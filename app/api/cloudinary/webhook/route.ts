import { NextRequest, NextResponse } from 'next/server'
import { configureCloudinary } from '@/lib/cloudinary'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: NextRequest) {
  const cloudinary = configureCloudinary()
  const signature = request.headers.get('x-cld-signature')
  const timestampHeader = request.headers.get('x-cld-timestamp')

  if (!signature || !timestampHeader) {
    return NextResponse.json({ error: 'Missing webhook signature' }, { status: 401 })
  }

  const timestamp = Number(timestampHeader)

  if (!Number.isFinite(timestamp)) {
    return NextResponse.json({ error: 'Invalid webhook timestamp' }, { status: 401 })
  }

  const body = await request.text()
  const isValidSignature = cloudinary.utils.verifyNotificationSignature(
    body,
    timestamp,
    signature
  )

  if (!isValidSignature) {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 })
  }

  let payload: {
    eager?: Array<{ secure_url?: string }>
    public_id?: string
  }

  try {
    payload = JSON.parse(body)
  } catch {
    return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 })
  }

  if (!payload.public_id) {
    return NextResponse.json({ success: true })
  }

  const eagerHlsUrl = payload.eager?.find((resource) =>
    resource.secure_url?.endsWith('.m3u8')
  )?.secure_url

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('videos')
    .update({
      hls_ready: true,
      ...(eagerHlsUrl ? { hls_url: eagerHlsUrl } : {}),
    })
    .eq('cloudinary_public_id', payload.public_id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
