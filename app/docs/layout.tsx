import { DocsSidebar } from "@/components/docs-sidebar"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex gap-10">
        <DocsSidebar />
        <article className="flex-1 min-w-0 prose prose-neutral max-w-none
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
          prose-code:before:content-none prose-code:after:content-none
          prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm
          prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-xl
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        ">
          {children}
        </article>
      </div>
    </div>
  )
}
