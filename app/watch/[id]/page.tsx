import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import PublicHeader from '@/components/PublicHeader'
import RelatedVideoCard from '@/components/RelatedVideoCard'
import { DislikeIcon, LikeIcon, SaveIcon, ShareIcon } from '@/components/Icons'
import VideoDescription from '@/components/VideoDescription'
import VideoPlayer from '@/components/VideoPlayer'
import { createPublicClient } from '@/lib/supabase/public'
import { formatDate, formatViewCount, getRandomVideoViews, getVideoThumbnailUrl } from '@/lib/utils'
import { Video } from '@/types/video'

interface PageProps {
  params: Promise<{ id: string }>
}

function ActionButton({
  icon,
  label,
}: {
  icon: ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-full bg-[#272727] px-4 py-2 text-sm font-medium text-[#f1f1f1] hover:bg-[#3f3f3f]"
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const supabase = createPublicClient()
  const { data: video } = await supabase.from('videos').select('title').eq('id', id).single()

  return { title: video?.title ?? 'Video not found' }
}

export default async function WatchPage({ params }: PageProps) {
  const { id } = await params
  const supabase = createPublicClient()

  const { data: video, error } = await supabase
    .from('videos')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !video) {
    notFound()
  }

  const { data: related } = await supabase
    .from('videos')
    .select('*')
    .neq('id', id)
    .order('created_at', { ascending: false })
    .limit(8)

  const views = formatViewCount(getRandomVideoViews(video))

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <PublicHeader />

      <main className="mx-auto grid max-w-[1800px] grid-cols-1 gap-6 px-4 py-6 xl:grid-cols-[minmax(0,1fr)_402px]">
        <div>
          <div className="aspect-video overflow-hidden rounded-xl bg-black">
            <VideoPlayer
              hlsUrl={video.hls_ready ? video.hls_url : null}
              videoUrl={video.video_url}
              poster={getVideoThumbnailUrl(video)}
              autoPlay
              muted
            />
          </div>

          <h1 className="mt-3 text-xl font-semibold text-[#f1f1f1]">{video.title}</h1>
          <div className="mt-2 text-sm text-[#aaaaaa]">
            {views} views | {formatDate(video.created_at)}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <ActionButton icon={<LikeIcon className="h-5 w-5" />} label="Like" />
            <ActionButton icon={<DislikeIcon className="h-5 w-5" />} label="Dislike" />
            <ActionButton icon={<ShareIcon className="h-5 w-5" />} label="Share" />
            <ActionButton icon={<SaveIcon className="h-5 w-5" />} label="Save" />
          </div>

          <div className="my-4 border-t border-[#3f3f3f]" />

          <VideoDescription description={video.description} />
        </div>

        <aside className="space-y-3 xl:sticky xl:top-20 xl:self-start">
          <p className="mb-2 text-sm font-semibold text-[#f1f1f1]">Up next</p>
          {related?.map((relatedVideo: Video) => (
            <RelatedVideoCard key={relatedVideo.id} video={relatedVideo} />
          ))}
        </aside>
      </main>
    </div>
  )
}
