import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Blog — glyde",
}

const posts = [
  {
    slug: "introducing-glyde",
    title: "Introducing glyde — HTTP requests that glyde",
    excerpt:
      "Why we built a 1.73 KB HTTP client with zero dependencies, typed errors, and async interceptors.",
    date: "2026-05-17",
    tag: "Announcement",
  },
  {
    slug: "why-zero-deps",
    title: "Why zero dependencies matters in 2026",
    excerpt:
      "The axios supply chain attack proved that every dependency is a liability. Here's how glyde eliminates that risk entirely.",
    date: "2026-05-17",
    tag: "Security",
  },
  {
    slug: "nextjs-auth-patterns",
    title: "Auth patterns for Next.js App Router with glyde",
    excerpt:
      "Server Components can't write cookies. Here's the tower/passenger pattern with middleware refresh that actually works.",
    date: "2026-05-17",
    tag: "Guide",
  },
]

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="relative">
        <div className="absolute -top-20 -left-40 w-80 h-80 rounded-full bg-pastel-orange opacity-30 blur-3xl pointer-events-none" />

        <div className="relative">
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Updates, guides, and deep dives from the glyde team.
          </p>

          <div className="mt-12 grid gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass rounded-2xl p-6 hover:scale-[1.01] transition-transform group block"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                    {post.tag}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                </div>
                <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-medium">
                  Read more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
