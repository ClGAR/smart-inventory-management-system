import { NAV_TABS } from '../../constants/index.js'

export default function BottomNav({ activeTab, setActiveTab }) {
  return (
    <nav className="fixed inset-x-0 bottom-4 z-30 px-4">
      <div className="mx-auto grid max-w-[980px] grid-cols-4 gap-2 overflow-hidden rounded-full border border-[#DED2C4] bg-[#FFFDF9]/95 p-2 shadow-[0_8px_24px_rgba(61,47,40,0.14)] backdrop-blur">
        {NAV_TABS.map((tab) => {
          const Icon = tab.icon
          const active = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex h-8 min-w-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-2 font-mono text-[8px] font-black uppercase tracking-[0.06em] transition sm:gap-2 sm:px-4 sm:text-[10px] lg:text-[11px] ${
                active
                  ? 'bg-[#8A7A6B] text-white shadow-[0_2px_5px_rgba(61,47,40,0.18)]'
                  : 'text-[#7A6D61] hover:bg-[#F8F2EA] hover:text-text-primary'
              }`}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {tab.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
