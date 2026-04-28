import type { SVGProps } from 'react'

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}

export function MicIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <path d="M12 18v3" />
    </svg>
  )
}

export function UploadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H15l6 4.5V18a2 2 0 0 1-2 2H5.5A2.5 2.5 0 0 1 3 17.5z" />
      <path d="M12 9v6" />
      <path d="M9 12h6" />
    </svg>
  )
}

export function BellIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M6 9a6 6 0 1 1 12 0c0 4 2 5 2 5H4s2-1 2-5" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  )
}

export function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 4 3 11h2v8h5v-5h4v5h5v-8h2z" />
    </svg>
  )
}

export function LibraryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4 5h14v2H4zm0 6h14v2H4zm0 6h14v2H4zm16-12h2v14h-2z" />
    </svg>
  )
}

export function HistoryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13 3a9 9 0 1 0 8.94 10H20a7 7 0 1 1-2.05-4.95L15 11h7V4l-2.62 2.62A8.97 8.97 0 0 0 13 3m-1 5h2v5l4 2-1 1.73-5-2.73z" />
    </svg>
  )
}

export function SettingsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="m19.43 12.98.04-.32-.04-.32 2.11-1.65a.5.5 0 0 0 .12-.64l-2-3.46a.5.5 0 0 0-.6-.22l-2.49 1a7.5 7.5 0 0 0-.56-.32l-.38-2.65A.5.5 0 0 0 15.14 4h-4a.5.5 0 0 0-.49.42l-.38 2.65q-.285.135-.56.32l-2.49-1a.5.5 0 0 0-.6.22l-2 3.46a.5.5 0 0 0 .12.64l2.11 1.65-.04.32.04.32-2.11 1.65a.5.5 0 0 0-.12.64l2 3.46a.5.5 0 0 0 .6.22l2.49-1q.27.18.56.32l.38 2.65a.5.5 0 0 0 .49.42h4a.5.5 0 0 0 .49-.42l.38-2.65q.285-.135.56-.32l2.49 1a.5.5 0 0 0 .6-.22l2-3.46a.5.5 0 0 0-.12-.64zM13.14 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
    </svg>
  )
}

export function LikeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M7 10v10" />
      <path d="M14 4 9 10v10h8.1a2 2 0 0 0 2-1.65l1-6A2 2 0 0 0 18.12 10H14z" />
      <path d="M7 10H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3" />
    </svg>
  )
}

export function DislikeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M7 14V4" />
      <path d="m14 20-5-6V4h8.1a2 2 0 0 1 2 1.65l1 6A2 2 0 0 1 18.12 14H14z" />
      <path d="M7 14H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3" />
    </svg>
  )
}

export function ShareIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
      <path d="m12 16 0-12" />
      <path d="m7 9 5-5 5 5" />
    </svg>
  )
}

export function SaveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M6 4h12a1 1 0 0 1 1 1v15l-7-4-7 4V5a1 1 0 0 1 1-1z" />
    </svg>
  )
}
