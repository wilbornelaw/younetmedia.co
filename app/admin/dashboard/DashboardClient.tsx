'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  formatDate,
  formatDateTimeLocalInput,
  formatDuration,
  formatViewCount,
  getRandomVideoViews,
  getVideoThumbnailUrl,
} from '@/lib/utils'
import { Video } from '@/types/video'

interface Props {
  initialVideos: Video[]
}

export default function DashboardClient({ initialVideos }: Props) {
  const [videos, setVideos] = useState<Video[]>(initialVideos)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editCreatedAt, setEditCreatedAt] = useState('')
  const [savingId, setSavingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  function startEdit(video: Video) {
    setEditingId(video.id)
    setEditTitle(video.title)
    setEditDescription(video.description ?? '')
    setEditCreatedAt(formatDateTimeLocalInput(video.created_at))
  }

  function cancelEdit() {
    setEditingId(null)
  }

  async function saveEdit(id: string) {
    if (!editCreatedAt) {
      alert('Upload date is required.')
      return
    }

    setSavingId(id)

    const res = await fetch(`/api/videos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: editTitle,
        description: editDescription,
        created_at: new Date(editCreatedAt).toISOString(),
      }),
    })

    if (res.ok) {
      const updated: Video = await res.json()
      setVideos((prev) => prev.map((video) => (video.id === id ? updated : video)))
      setEditingId(null)
    } else {
      alert('Failed to save changes.')
    }

    setSavingId(null)
  }

  async function deleteVideo(id: string) {
    if (!confirm('Delete this video? This cannot be undone.')) return

    setDeletingId(id)
    const res = await fetch(`/api/videos/${id}`, { method: 'DELETE' })

    if (res.ok) {
      setVideos((prev) => prev.filter((video) => video.id !== id))
    } else {
      alert('Failed to delete video.')
    }

    setDeletingId(null)
  }

  if (videos.length === 0) {
    return (
      <div className="rounded-xl border border-[#3f3f3f] bg-[#1f1f1f] p-8 text-center text-[#aaaaaa]">
        <p>No videos yet.</p>
        <Link href="/admin/upload" className="mt-3 inline-block text-sm text-[#3ea6ff]">
          Upload your first video
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {videos.map((video) => (
        <div key={video.id} className="rounded-xl border border-[#3f3f3f] bg-[#1f1f1f] p-4">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#121212] lg:w-64 lg:flex-shrink-0">
              <Image
                src={getVideoThumbnailUrl(video)}
                alt={video.title}
                fill
                sizes="(max-width: 1024px) 100vw, 256px"
                className="object-cover"
              />
              {video.duration !== null && (
                <span className="absolute bottom-0 right-0 m-1 rounded bg-[#0f0f0f] px-1 py-0.5 text-xs font-medium text-white">
                  {formatDuration(video.duration)}
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              {editingId === video.id ? (
                <div className="space-y-3">
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full rounded-lg border border-[#3f3f3f] bg-[#121212] px-3 py-2 text-sm text-white outline-none"
                    placeholder="Title"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows={3}
                    className="w-full resize-none rounded-lg border border-[#3f3f3f] bg-[#121212] px-3 py-2 text-sm text-white outline-none"
                    placeholder="Description (optional)"
                  />
                  <div>
                    <label
                      htmlFor={`created-at-${video.id}`}
                      className="mb-2 block text-sm font-medium text-[#f1f1f1]"
                    >
                      Upload date
                    </label>
                    <input
                      id={`created-at-${video.id}`}
                      type="datetime-local"
                      value={editCreatedAt}
                      onChange={(e) => setEditCreatedAt(e.target.value)}
                      className="w-full rounded-lg border border-[#3f3f3f] bg-[#121212] px-3 py-2 text-sm text-white outline-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(video.id)}
                      disabled={savingId === video.id}
                      className="rounded-full bg-[#3ea6ff] px-4 py-2 text-xs font-medium text-black disabled:opacity-60"
                    >
                      {savingId === video.id ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="rounded-full bg-[#272727] px-4 py-2 text-xs font-medium text-[#f1f1f1] hover:bg-[#3f3f3f]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate text-lg font-semibold text-[#f1f1f1]">
                        {video.title}
                      </h2>
                      <p className="mt-1 text-sm text-[#aaaaaa]">
                        {formatViewCount(getRandomVideoViews(video))} views | {formatDate(video.created_at)}
                        {video.duration !== null && ` | ${formatDuration(video.duration)}`}
                      </p>
                    </div>
                    <span className="text-xs text-[#aaaaaa]">
                      {video.hls_ready ? 'HLS ready' : 'Preparing HLS'}
                    </span>
                  </div>

                  {video.description && (
                    <p className="mt-3 line-clamp-2 text-sm text-[#aaaaaa]">
                      {video.description}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={`/watch/${video.id}`}
                      className="rounded-full bg-[#272727] px-4 py-2 text-xs font-medium text-[#f1f1f1] hover:bg-[#3f3f3f]"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => startEdit(video)}
                      className="rounded-full bg-[#3ea6ff] px-4 py-2 text-xs font-medium text-black"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteVideo(video.id)}
                      disabled={deletingId === video.id}
                      className="rounded-full border border-red-500 px-4 py-2 text-xs font-medium text-red-400 disabled:opacity-60"
                    >
                      {deletingId === video.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
