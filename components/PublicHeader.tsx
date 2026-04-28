'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { BellIcon, MicIcon, SearchIcon, UploadIcon } from '@/components/Icons'
import YouNetMediaLogo from '@/components/YouNetMediaLogo'

interface PublicHeaderProps {
  query?: string
}

export default function PublicHeader({ query = '' }: PublicHeaderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    let mounted = true

    supabase.auth.getUser().then(({ data }) => {
      if (mounted) {
        setIsAuthenticated(Boolean(data.user))
      }
    })

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setIsAuthenticated(Boolean(session?.user))
      }
    })

    return () => {
      mounted = false
      subscription.subscription.unsubscribe()
    }
  }, [])

  return (
    <header className="sticky top-0 z-40 h-14 border-b border-[#3f3f3f] bg-[#0f0f0f]">
      <div className="mx-auto flex h-full max-w-[1800px] items-center gap-4 px-4">
        <div className={`flex min-w-0 items-center ${mobileSearchOpen ? 'hidden md:flex' : 'flex'}`}>
          <YouNetMediaLogo href="/" />
        </div>

        <div className="hidden flex-1 justify-center md:flex">
          <div className="flex w-full max-w-[720px] items-center gap-3">
            <form action="/" method="get" className="flex w-full">
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Search"
                className="h-10 w-full rounded-l-full border border-[#3f3f3f] bg-[#121212] px-4 text-sm text-[#f1f1f1] outline-none placeholder:text-[#aaaaaa]"
              />
              <button
                type="submit"
                className="flex h-10 w-16 items-center justify-center rounded-r-full border border-l-0 border-[#3f3f3f] bg-[#222222] text-[#f1f1f1] hover:bg-[#3f3f3f]"
              >
                <SearchIcon className="h-5 w-5" />
              </button>
            </form>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#272727] text-[#f1f1f1] hover:bg-[#3f3f3f]"
            >
              <MicIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className={`ml-auto flex items-center gap-1 ${mobileSearchOpen ? 'hidden md:flex' : 'flex'}`}>
          <button
            type="button"
            onClick={() => setMobileSearchOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#f1f1f1] hover:bg-[#272727] md:hidden"
          >
            <SearchIcon className="h-5 w-5" />
          </button>

          {isAuthenticated ? (
            <>
              <Link
                href="/admin/upload"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#f1f1f1] hover:bg-[#272727]"
              >
                <UploadIcon className="h-5 w-5" />
              </Link>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#f1f1f1] hover:bg-[#272727]"
              >
                <BellIcon className="h-5 w-5" />
              </button>
              <Link
                href="/admin/dashboard"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3ea6ff] text-[11px] font-semibold text-[#0f0f0f]"
              >
                YM
              </Link>
            </>
          ) : (
            <Link
              href="/admin/login"
              className="rounded-full border border-[#3ea6ff] px-4 py-2 text-sm font-medium text-[#3ea6ff] hover:bg-[#263850]"
            >
              Sign in
            </Link>
          )}
        </div>

        {mobileSearchOpen && (
          <div className="absolute inset-x-0 top-0 flex h-14 items-center gap-2 border-b border-[#3f3f3f] bg-[#0f0f0f] px-2 md:hidden">
            <button
              type="button"
              onClick={() => setMobileSearchOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#f1f1f1] hover:bg-[#272727]"
            >
              <span className="text-xl leading-none">&larr;</span>
            </button>
            <form action="/" method="get" className="flex flex-1">
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Search"
                className="h-10 w-full rounded-l-full border border-[#3f3f3f] bg-[#121212] px-4 text-sm text-[#f1f1f1] outline-none placeholder:text-[#aaaaaa]"
              />
              <button
                type="submit"
                className="flex h-10 w-14 items-center justify-center rounded-r-full border border-l-0 border-[#3f3f3f] bg-[#222222] text-[#f1f1f1]"
              >
                <SearchIcon className="h-5 w-5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  )
}
