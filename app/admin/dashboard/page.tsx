export const dynamic = 'force-dynamic'

import Link from 'next/link'
import AdminNav from '@/components/AdminNav'
import { createClient } from '@/lib/supabase/server'
import { Video } from '@/types/video'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: videos, error } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <AdminNav />

      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-[#f1f1f1]">Dashboard</h1>
            <p className="mt-1 text-sm text-[#aaaaaa]">Manage your uploaded videos.</p>
          </div>

          <Link
            href="/admin/upload"
            className="rounded-full bg-[#3ea6ff] px-4 py-2 text-sm font-medium text-black"
          >
            Upload video
          </Link>
        </div>

        {error && (
          <div className="rounded-xl border border-[#3f3f3f] bg-[#1f1f1f] p-4 text-sm text-red-400">
            Failed to load videos.
          </div>
        )}

        {videos && <DashboardClient initialVideos={videos as Video[]} />}
      </main>
    </div>
  )
}
