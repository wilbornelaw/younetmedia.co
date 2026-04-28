'use client'

import { useState } from 'react'

interface VideoDescriptionProps {
  description: string | null
}

export default function VideoDescription({ description }: VideoDescriptionProps) {
  const [expanded, setExpanded] = useState(false)
  const text = description ?? 'No description provided.'
  const showToggle = text.length > 180 || text.includes('\n')

  return (
    <div className="mt-2 rounded-xl bg-[#272727] p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
          YM
        </div>
        <div className="min-w-0">
          <p className="font-medium text-[#f1f1f1]">YouNet Media</p>
        </div>
        <button
          type="button"
          className="ml-auto rounded-full bg-[#ff0000] px-4 py-2 text-sm font-medium text-white"
        >
          Subscribe
        </button>
      </div>

      <div className="mt-4">
        <p
          className={`whitespace-pre-wrap text-sm leading-6 text-[#f1f1f1] ${
            expanded ? '' : 'line-clamp-3'
          }`}
        >
          {text}
        </p>
        {showToggle && (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="mt-2 text-sm font-medium text-[#f1f1f1]"
          >
            {expanded ? 'Show less' : '...more'}
          </button>
        )}
      </div>
    </div>
  )
}
