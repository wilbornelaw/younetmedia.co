import Link from 'next/link'
import VideoCard from '@/components/VideoCard'
import { createPublicClient } from '@/lib/supabase/public'
import { HOME_PAGE_SIZE } from '@/lib/utils'
import { Video } from '@/types/video'

interface HomeVideoResultsProps {
  page: number
  query: string
}

export default async function HomeVideoResults({
  page,
  query,
}: HomeVideoResultsProps) {
  const supabase = createPublicClient()
  const visibleCount = page * HOME_PAGE_SIZE

  let request = supabase
    .from('videos')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(0, visibleCount - 1)

  if (query) {
    request = request.ilike('title', `%${query}%`)
  }

  const { data: videos, error, count } = await request

  if (error) {
    return <p className="text-sm text-red-400">Failed to load videos.</p>
  }

  if (!videos?.length) {
    return (
      <div className="py-12 text-center text-sm text-[#aaaaaa]">
        {query ? `No videos found for "${query}".` : 'No videos yet.'}
      </div>
    )
  }

  const hasMore = (count ?? videos.length) > videos.length
  const loadMoreParams = new URLSearchParams()

  if (query) {
    loadMoreParams.set('q', query)
  }

  loadMoreParams.set('page', String(page + 1))

  return (
    <section id="videos" className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((video: Video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <Link
            href={`/?${loadMoreParams.toString()}`}
            scroll={false}
            className="rounded-full bg-[#272727] px-4 py-2 text-sm font-medium text-[#f1f1f1] hover:bg-[#3f3f3f]"
          >
            Load more
          </Link>
        </div>
      )}
    </section>
  )
}
