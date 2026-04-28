'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import YouNetMediaLogo from '@/components/YouNetMediaLogo'

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const items = [
    { href: '/admin/dashboard', label: 'Dashboard' },
    { href: '/admin/upload', label: 'Upload' },
  ]

  return (
    <header className="sticky top-0 z-40 h-14 border-b border-[#3f3f3f] bg-[#0f0f0f]">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between gap-4 px-4">
        <YouNetMediaLogo href="/" />

        <div className="hidden flex-1 justify-center md:flex">
          <div className="text-sm text-[#aaaaaa]">Admin</div>
        </div>

        <div className="flex items-center gap-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                pathname === item.href
                  ? 'bg-[#3ea6ff] text-black'
                  : 'bg-[#272727] text-[#f1f1f1] hover:bg-[#3f3f3f]'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-full border border-red-500 px-4 py-2 text-sm font-medium text-red-400"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  )
}
