'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { cloudinaryHlsUrl, cloudinaryThumbnail } from '@/lib/utils'

interface CloudinaryUploadResult {
  public_id: string
  secure_url: string
  duration?: number
}

interface UploadSignature {
  signature: string
  timestamp: number
  api_key: string
  cloud_name: string
  eager: string
  eager_async: boolean
  eager_notification_url: string
}

export default function UploadForm() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [thumbnailOffsetSeconds, setThumbnailOffsetSeconds] = useState(2)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<'idle' | 'uploading' | 'saving' | 'done' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0]
    if (!selected) return

    setFile(selected)

    if (!title) {
      setTitle(selected.name.replace(/\.[^/.]+$/, ''))
    }
  }

  async function getSignature() {
    const res = await fetch('/api/sign-upload')

    if (!res.ok) {
      throw new Error('Failed to get upload signature')
    }

    return res.json() as Promise<UploadSignature>
  }

  async function uploadToCloudinary(
    fileToUpload: File,
    sig: UploadSignature
  ): Promise<CloudinaryUploadResult> {
    const formData = new FormData()
    formData.append('file', fileToUpload)
    formData.append('api_key', sig.api_key)
    formData.append('timestamp', String(sig.timestamp))
    formData.append('signature', sig.signature)
    formData.append('folder', 'videos')
    formData.append('resource_type', 'video')
    formData.append('eager', sig.eager)
    formData.append('eager_async', String(sig.eager_async))
    formData.append('eager_notification_url', sig.eager_notification_url)

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${sig.cloud_name}/video/upload`)

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setProgress(Math.round((event.loaded / event.total) * 100))
        }
      }

      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          reject(new Error('Cloudinary upload failed'))
        }
      }

      xhr.onerror = () => reject(new Error('Network error during upload'))
      xhr.send(formData)
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!file || !title.trim()) {
      return
    }

    setStatus('uploading')
    setErrorMsg('')
    setProgress(0)

    try {
      const sig = await getSignature()
      const result = await uploadToCloudinary(file, sig)

      const thumbnailUrl = cloudinaryThumbnail(
        result.public_id,
        sig.cloud_name,
        thumbnailOffsetSeconds
      )
      const hlsUrl = cloudinaryHlsUrl(result.public_id, sig.cloud_name)

      setStatus('saving')

      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
          cloudinary_public_id: result.public_id,
          video_url: result.secure_url,
          hls_url: hlsUrl,
          thumbnail_url: thumbnailUrl,
          thumbnail_offset_seconds: thumbnailOffsetSeconds,
          duration: result.duration ? Math.round(result.duration) : null,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Failed to save video')
      }

      setStatus('done')
      setTimeout(() => router.push('/admin/dashboard'), 1000)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Upload failed')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-[#f1f1f1]">Video file</label>
        <div
          className="cursor-pointer rounded-xl border border-dashed border-[#3f3f3f] bg-[#121212] p-8 text-center hover:bg-[#1a1a1a]"
          onClick={() => fileInputRef.current?.click()}
        >
          {file ? (
            <div>
              <p className="text-sm font-medium text-[#f1f1f1]">{file.name}</p>
              <p className="mt-2 text-xs text-[#aaaaaa]">Ready for upload</p>
            </div>
          ) : (
            <div>
              <p className="text-sm font-medium text-[#f1f1f1]">Click to select a video file</p>
              <p className="mt-2 text-xs text-[#aaaaaa]">Video uploads are sent to Cloudinary.</p>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div>
        <label htmlFor="title" className="mb-2 block text-sm font-medium text-[#f1f1f1]">
          Title <span className="text-red-400">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full rounded-lg border border-[#3f3f3f] bg-[#121212] px-3 py-2 text-white outline-none"
          placeholder="Video title"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-2 block text-sm font-medium text-[#f1f1f1]">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full resize-none rounded-lg border border-[#3f3f3f] bg-[#121212] px-3 py-2 text-white outline-none"
          placeholder="Optional description"
        />
      </div>

      <div>
        <label htmlFor="thumbnailOffsetSeconds" className="mb-2 block text-sm font-medium text-[#f1f1f1]">
          Thumbnail timestamp (seconds)
        </label>
        <input
          id="thumbnailOffsetSeconds"
          type="number"
          min={0}
          step={1}
          value={thumbnailOffsetSeconds}
          onChange={(e) => setThumbnailOffsetSeconds(Math.max(0, Number(e.target.value) || 0))}
          className="w-full rounded-lg border border-[#3f3f3f] bg-[#121212] px-3 py-2 text-white outline-none"
        />
        <p className="mt-2 text-xs text-[#aaaaaa]">
          New uploads default to 2 seconds so the thumbnail skips black intro frames.
        </p>
      </div>

      {status === 'uploading' && (
        <div className="rounded-xl border border-[#3f3f3f] bg-[#121212] p-4">
          <div className="mb-2 flex justify-between text-xs text-[#aaaaaa]">
            <span>Uploading to Cloudinary...</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#272727]">
            <div
              className="h-2 rounded-full bg-[#3ea6ff] transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {status === 'saving' && <p className="text-sm text-[#3ea6ff]">Saving metadata...</p>}
      {status === 'done' && <p className="text-sm text-green-400">Upload complete! Redirecting...</p>}
      {status === 'error' && <p className="text-sm text-red-400">{errorMsg}</p>}

      <button
        type="submit"
        disabled={!file || !title.trim() || status === 'uploading' || status === 'saving' || status === 'done'}
        className="rounded-full bg-[#3ea6ff] px-4 py-2 text-sm font-medium text-black disabled:opacity-60"
      >
        {status === 'uploading'
          ? `Uploading... ${progress}%`
          : status === 'saving'
            ? 'Saving...'
            : 'Upload video'}
      </button>
    </form>
  )
}
