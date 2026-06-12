import BottomNav from './BottomNav.jsx'
import Navbar from './Navbar.jsx'

export default function Layout({ activeTab, children, query, setActiveTab, setQuery }) {
  return (
    <div className="min-h-screen bg-bg pb-28 text-text-primary">
      <Navbar query={query} setQuery={setQuery} />
      <main className="mx-auto w-full max-w-[1680px] px-4 py-6 sm:px-6 xl:px-10">
        {children}
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
