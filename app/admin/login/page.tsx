'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import YouNetMediaLogo from '@/components/YouNetMediaLogo'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    router.push('/admin/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <header className="h-14 border-b border-[#3f3f3f] bg-[#0f0f0f]">
        <div className="mx-auto flex h-full max-w-[1400px] items-center px-4">
          <YouNetMediaLogo href="/" />
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl border border-[#3f3f3f] bg-[#1f1f1f] p-6">
          <h1 className="text-2xl font-semibold text-[#f1f1f1]">Sign in</h1>
          <p className="mt-2 text-sm text-[#aaaaaa]">Access the YouNet Media admin tools.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm text-[#f1f1f1]">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-[#3f3f3f] bg-[#121212] px-3 py-2 text-white outline-none"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm text-[#f1f1f1]">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-[#3f3f3f] bg-[#121212] px-3 py-2 text-white outline-none"
                placeholder="Password"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#3ea6ff] px-4 py-2 text-sm font-medium text-black disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <Link href="/" className="mt-6 inline-block text-sm text-[#aaaaaa] hover:text-[#f1f1f1]">
            Back to site
          </Link>
        </div>
      </main>
    </div>
  )
}
