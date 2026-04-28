export const dynamic = 'force-dynamic'

import AdminNav from '@/components/AdminNav'
import UploadForm from './UploadForm'

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <AdminNav />

      <main className="mx-auto max-w-4xl px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#f1f1f1]">Upload video</h1>
          <p className="mt-1 text-sm text-[#aaaaaa]">
            Add a new video and configure its metadata.
          </p>
        </div>

        <div className="rounded-xl border border-[#3f3f3f] bg-[#1f1f1f] p-6">
          <UploadForm />
        </div>
      </main>
    </div>
  )
}
