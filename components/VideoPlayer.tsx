'use client'

import { useEffect, useRef } from 'react'
import Hls from 'hls.js'

interface VideoPlayerProps {
  hlsUrl?: string | null
  videoUrl: string
  poster?: string
  autoPlay?: boolean
  muted?: boolean
}

export default function VideoPlayer({
  hlsUrl,
  videoUrl,
  poster,
  autoPlay = false,
  muted = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    video.muted = muted

    const playVideo = () => {
      if (autoPlay) {
        void video.play().catch(() => {})
      }
    }

    const fallbackToMp4 = () => {
      if (video.src !== videoUrl) {
        video.src = videoUrl
        video.load()
        playVideo()
      }
    }

    if (hlsUrl && Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true })
      hls.loadSource(hlsUrl)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, playVideo)
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          fallbackToMp4()
          hls.destroy()
        }
      })

      return () => hls.destroy()
    }

    if (hlsUrl && video.canPlayType('application/vnd.apple.mpegurl')) {
      const handleNativeHlsError = () => {
        fallbackToMp4()
        video.removeEventListener('error', handleNativeHlsError)
      }

      video.addEventListener('error', handleNativeHlsError)
      video.src = hlsUrl
      video.load()
      playVideo()

      return () => video.removeEventListener('error', handleNativeHlsError)
    }

    video.src = videoUrl
    video.load()
    playVideo()
  }, [autoPlay, hlsUrl, muted, videoUrl])

  return (
    <video
      ref={videoRef}
      controls
      poster={poster}
      autoPlay={autoPlay}
      muted={muted}
      className="block h-full w-full bg-black"
      playsInline
    />
  )
}
