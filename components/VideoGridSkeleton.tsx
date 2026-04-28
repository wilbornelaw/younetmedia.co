import VideoCardSkeleton from '@/components/VideoCardSkeleton'

interface VideoGridSkeletonProps {
  count?: number
}

export default function VideoGridSkeleton({ count = 12 }: VideoGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }, (_, index) => (
        <VideoCardSkeleton key={index} />
      ))}
    </div>
  )
}
