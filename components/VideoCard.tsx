import Image from 'next/image'
import Link from 'next/link'
import { formatDuration, formatViewCount, getRandomVideoViews, getVideoThumbnailUrl } from '@/lib/utils'
import { Video } from '@/types/video'

function formatRelativeDate(iso: string) {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const diffSeconds = (new Date(iso).getTime() - Date.now()) / 1000
  const divisions: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ['second', 60],
    ['minute', 60],
    ['hour', 24],
    ['day', 7],
    ['week', 4.34524],
    ['month', 12],
  ]

  let value = diffSeconds

  for (const [unit, amount] of divisions) {
    if (Math.abs(value) < amount) {
      return rtf.format(Math.round(value), unit)
    }

    value /= amount
  }

  return rtf.format(Math.round(value), 'year')
}

export default function VideoCard({ video }: { video: Video }) {
  const thumbnailUrl = getVideoThumbnailUrl(video)
  const views = formatViewCount(getRandomVideoViews(video))

  return (
    <Link href={`/watch/${video.id}`} className="group block">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-[#272727]">
        <Image
          src={thumbnailUrl}
          alt={video.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-200 group-hover:brightness-110"
        />
        {video.duration !== null && (
          <span className="absolute bottom-0 right-0 m-1 rounded bg-[#0f0f0f] px-1 py-0.5 text-xs font-medium text-white">
            {formatDuration(video.duration)}
          </span>
        )}
      </div>

      <div className="mt-3 flex gap-3">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
          YM
        </div>

        <div className="min-w-0">
          <h3 className="line-clamp-2 text-sm font-medium text-[#f1f1f1]">
            {video.title}
          </h3>
          <p className="mt-1 text-xs text-[#aaaaaa]">YouNet Media</p>
          <p className="mt-0.5 text-xs text-[#aaaaaa]">
            {views} views | {formatRelativeDate(video.created_at)}
          </p>
        </div>
      </div>
    </Link>
  )
}
