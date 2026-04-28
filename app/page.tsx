import { Suspense } from 'react'
import CategoryChips from '@/components/CategoryChips'
import HomeSidebar from '@/components/HomeSidebar'
import HomeVideoResults from '@/components/HomeVideoResults'
import PublicHeader from '@/components/PublicHeader'
import VideoGridSkeleton from '@/components/VideoGridSkeleton'
import { HOME_PAGE_SIZE, parsePageParam, parseSearchParam } from '@/lib/utils'

interface HomePageProps {
  searchParams: Promise<{
    page?: string | string[]
    q?: string | string[]
  }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams
  const page = parsePageParam(params.page)
  const query = parseSearchParam(params.q)

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <PublicHeader query={query} />
      <HomeSidebar />

      <main className="md:ml-[72px] lg:ml-[240px]">
        <div className="sticky top-14 z-20 bg-[#0f0f0f] px-4 py-3 md:px-6">
          <CategoryChips />
        </div>

        <div className="px-4 pb-6 md:px-6">
          <Suspense
            key={`${query}:${page}`}
            fallback={<VideoGridSkeleton count={Math.max(HOME_PAGE_SIZE / 2, 8)} />}
          >
            <HomeVideoResults page={page} query={query} />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
