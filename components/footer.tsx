import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/50 mt-24">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <span className="text-lg font-bold gradient-text-subtle">✈️ glyde</span>
            <p className="mt-2 text-sm text-muted-foreground">
              A lightweight HTTP client built on native fetch. Zero dependencies.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-3">Documentation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/docs" className="hover:text-foreground transition-colors">Getting Started</Link></li>
              <li><Link href="/docs/api" className="hover:text-foreground transition-colors">API Reference</Link></li>
              <li><Link href="/docs/interceptors" className="hover:text-foreground transition-colors">Interceptors</Link></li>
              <li><Link href="/docs/errors" className="hover:text-foreground transition-colors">Error Handling</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/comparison" className="hover:text-foreground transition-colors">Comparison</Link></li>
              <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><a href="https://github.com/yashgkar/glyde" className="hover:text-foreground transition-colors">GitHub</a></li>
              <li><a href="https://www.npmjs.com/package/glyde" className="hover:text-foreground transition-colors">npm</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-3">Community</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="https://github.com/yashgkar/glyde/issues" className="hover:text-foreground transition-colors">Issues</a></li>
              <li><a href="https://github.com/yashgkar/glyde/discussions" className="hover:text-foreground transition-colors">Discussions</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>MIT License &copy; {new Date().getFullYear()} Yash Garudkar</p>
        </div>
      </div>
    </footer>
  )
}
