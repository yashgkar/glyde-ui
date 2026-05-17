import Link from "next/link"
import { Calendar, ArrowLeft, Clock } from "lucide-react"

export function BlogPostHeader({
  title,
  date,
  tag,
  readTime,
}: {
  title: string
  date: string
  tag: string
  readTime: string
}) {
  return (
    <div className="mb-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to blog
      </Link>

      <div className="flex items-center gap-3 mb-5">
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
          {tag}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" /> {date}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" /> {readTime}
        </span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
        {title}
      </h1>
    </div>
  )
}

export function BlogPostContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose prose-lg prose-neutral max-w-none
      prose-headings:font-bold prose-headings:tracking-tight prose-headings:mt-12 prose-headings:mb-4
      prose-h2:text-2xl prose-h2:border-b prose-h2:border-border/50 prose-h2:pb-3
      prose-h3:text-xl
      prose-p:leading-relaxed prose-p:text-muted-foreground
      prose-li:text-muted-foreground
      prose-strong:text-foreground
      prose-code:before:content-none prose-code:after:content-none
      prose-code:bg-primary/10 prose-code:text-primary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-medium
      prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-2xl prose-pre:shadow-sm
      prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
      prose-ul:space-y-2
      prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:px-4
      prose-blockquote:not-italic prose-blockquote:text-muted-foreground
    ">
      {children}
    </div>
  )
}
