export default function WatchPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <div className="sticky top-0 z-30 h-14 border-b border-[#3f3f3f] bg-[#0f0f0f]" />
      <main className="mx-auto grid max-w-[1800px] grid-cols-1 gap-6 px-4 py-6 xl:grid-cols-[minmax(0,1fr)_402px]">
        <div className="animate-pulse">
          <div className="aspect-video rounded-xl bg-[#272727]" />
          <div className="mt-4 h-7 w-3/4 rounded bg-[#272727]" />
          <div className="mt-3 h-4 w-1/3 rounded bg-[#272727]" />
          <div className="mt-4 flex gap-2">
            <div className="h-10 w-24 rounded-full bg-[#272727]" />
            <div className="h-10 w-24 rounded-full bg-[#272727]" />
            <div className="h-10 w-24 rounded-full bg-[#272727]" />
            <div className="h-10 w-24 rounded-full bg-[#272727]" />
          </div>
          <div className="my-4 border-t border-[#3f3f3f]" />
          <div className="rounded-xl bg-[#272727] p-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-[#3f3f3f]" />
              <div className="h-4 w-28 rounded bg-[#3f3f3f]" />
              <div className="ml-auto h-9 w-24 rounded-full bg-[#ff0000]" />
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-4 w-full rounded bg-[#3f3f3f]" />
              <div className="h-4 w-5/6 rounded bg-[#3f3f3f]" />
              <div className="h-4 w-2/3 rounded bg-[#3f3f3f]" />
            </div>
          </div>
        </div>

        <aside className="space-y-3">
          <div className="h-4 w-16 animate-pulse rounded bg-[#272727]" />
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="flex animate-pulse gap-2">
              <div className="aspect-video w-40 rounded-lg bg-[#272727]" />
              <div className="flex-1 space-y-2 pt-1">
                <div className="h-4 w-full rounded bg-[#272727]" />
                <div className="h-3 w-2/3 rounded bg-[#272727]" />
                <div className="h-3 w-1/2 rounded bg-[#272727]" />
              </div>
            </div>
          ))}
        </aside>
      </main>
    </div>
  )
}
