import Image from 'next/image'
import Link from 'next/link'
import {
  formatDate,
  formatDuration,
  formatViewCount,
  getRandomVideoViews,
  getVideoThumbnailUrl,
} from '@/lib/utils'
import { Video } from '@/types/video'

export default function RelatedVideoCard({ video }: { video: Video }) {
  const views = formatViewCount(getRandomVideoViews(video))

  return (
    <Link href={`/watch/${video.id}`} className="group flex gap-2 rounded-xl p-1 hover:bg-[#272727]">
      <div className="relative aspect-video w-40 flex-shrink-0 overflow-hidden rounded-lg bg-[#272727]">
        <Image
          src={getVideoThumbnailUrl(video)}
          alt={video.title}
          fill
          sizes="160px"
          className="object-cover"
        />
        {video.duration !== null && (
          <span className="absolute bottom-0 right-0 m-1 rounded bg-[#0f0f0f] px-1 py-0.5 text-[11px] font-medium text-white">
            {formatDuration(video.duration)}
          </span>
        )}
      </div>

      <div className="min-w-0 pt-0.5">
        <h3 className="line-clamp-2 text-sm font-medium text-[#f1f1f1]">
          {video.title}
        </h3>
        <p className="mt-1 text-xs text-[#aaaaaa]">YouNet Media</p>
        <p className="mt-0.5 text-xs text-[#aaaaaa]">
          {views} views | {formatDate(video.created_at)}
        </p>
      </div>
    </Link>
  )
}
