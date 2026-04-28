import Link from 'next/link'
import { HistoryIcon, HomeIcon, LibraryIcon, SettingsIcon } from '@/components/Icons'

const items = [
  { href: '/', label: 'Home', icon: HomeIcon, active: true },
  { href: '/', label: 'Library', icon: LibraryIcon },
  { href: '/', label: 'History', icon: HistoryIcon },
  { href: '/admin/login', label: 'Admin', icon: SettingsIcon },
]

export default function HomeSidebar() {
  return (
    <aside className="fixed inset-y-14 left-0 z-20 hidden border-r border-[#3f3f3f] bg-[#0f0f0f] md:flex md:w-[72px] md:flex-col lg:w-[240px]">
      <nav className="flex flex-col gap-1 p-3">
        {items.map((item) => {
          const Icon = item.icon

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex h-10 items-center rounded-xl px-3 text-sm text-[#f1f1f1] hover:bg-[#272727] md:justify-center lg:justify-start ${
                item.active ? 'bg-[#272727]' : ''
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="ml-6 hidden lg:block">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
