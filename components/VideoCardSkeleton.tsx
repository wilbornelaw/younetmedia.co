export default function VideoCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-video rounded-xl bg-[#272727]" />
      <div className="mt-3 flex gap-3">
        <div className="h-9 w-9 rounded-full bg-[#272727]" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-4 w-[70%] rounded bg-[#272727]" />
          <div className="h-3 w-[50%] rounded bg-[#272727]" />
        </div>
      </div>
    </div>
  )
}
