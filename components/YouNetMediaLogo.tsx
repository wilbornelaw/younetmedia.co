import Link from 'next/link'

interface YouNetMediaLogoProps {
  href: string
}

export default function YouNetMediaLogo({ href }: YouNetMediaLogoProps) {
  return (
    <Link href={href} className="flex items-center gap-3" aria-label="YouNet Media home">
      <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#304a66] bg-[linear-gradient(135deg,#14263b_0%,#0f1724_100%)] shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 8.5 16 16l9-7.5M16 16v8"
            stroke="#f1f1f1"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="7" cy="8.5" r="2.2" fill="#3ea6ff" />
          <circle cx="16" cy="16" r="2.2" fill="#8ab4f8" />
          <circle cx="25" cy="8.5" r="2.2" fill="#3ea6ff" />
          <circle cx="16" cy="24" r="2.2" fill="#34d399" />
        </svg>
      </span>
      <span className="text-lg font-bold tracking-tight text-[#f1f1f1]">YouNet Media</span>
    </Link>
  )
}
