export default function Modal({ children }) {
  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">{children}</div>
}
