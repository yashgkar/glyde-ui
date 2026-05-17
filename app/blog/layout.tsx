export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-40 w-80 h-80 rounded-full bg-pastel-orange opacity-30 blur-3xl" />
        <div className="absolute top-96 -left-40 w-96 h-96 rounded-full bg-pastel-purple opacity-20 blur-3xl" />
        <div className="absolute bottom-40 right-10 w-72 h-72 rounded-full bg-pastel-blue opacity-20 blur-3xl" />
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
