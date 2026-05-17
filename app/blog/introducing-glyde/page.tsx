import { CodeBlock } from "@/components/code-block"
import { BlogPostHeader, BlogPostContent } from "@/components/blog-post"

export const metadata = {
  title: "Introducing glyde — HTTP requests that glyde",
}

const quickStart = `import plane from "glyde"

const api = plane({
  baseURL: "https://api.example.com",
  timeout: 5000,
})

// Typed GET
const { data } = await api.get<User[]>("/users")

// POST with body
await api.post("/users", { name: "Yash", role: "admin" })

// Interceptors for auth
api.interceptors.request.use((config) => ({
  ...config,
  headers: { ...config.headers, Authorization: \`Bearer \${token}\` },
}))

// Typed error handling
import { isHttpError } from "glyde"

try {
  await api.get("/protected")
} catch (err) {
  if (isHttpError(err)) {
    console.log(err.status, err.response?.data)
  }
}`

export default function IntroducingGlydePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <BlogPostHeader
        title="Introducing glyde — HTTP requests that glyde"
        date="2026-05-17"
        tag="Announcement"
        readTime="4 min read"
      />

      <BlogPostContent>
        <p>
          Today we are releasing <strong>glyde</strong> — a lightweight, TypeScript-first HTTP client
          built on native fetch with zero runtime dependencies.
        </p>

        <h2>Why another HTTP client?</h2>
        <p>
          In March 2026, axios suffered a supply chain attack by a North Korean state actor (Sapphire Sleet).
          This affected millions of projects overnight. The root cause? Transitive dependencies that no one audits.
        </p>
        <p>
          We wanted an HTTP client that is:
        </p>
        <ul>
          <li><strong>Zero dependencies</strong> — nothing to compromise</li>
          <li><strong>TypeScript-first</strong> — not types bolted onto JavaScript</li>
          <li><strong>Tiny</strong> — 1.73 KB gzipped, 97% smaller than axios</li>
          <li><strong>Modern</strong> — built on native fetch, not legacy XHR</li>
          <li><strong>Practical</strong> — interceptors, typed errors, streaming</li>
        </ul>

        <h2>Quick start</h2>
        <CodeBlock code={quickStart} language="typescript" />

        <h2>What makes glyde different</h2>

        <h3>Typed error hierarchy</h3>
        <p>
          Instead of catching generic errors and checking status codes, glyde throws specific error
          types with TypeScript type guards. <code>isHttpError(err)</code> narrows the type and gives
          you access to <code>err.status</code>, <code>err.response</code>, and <code>err.config</code>.
        </p>

        <h3>Async interceptors</h3>
        <p>
          Unlike most libraries that only support synchronous transforms, glyde interceptors are fully
          async. Refresh a token, fetch config from an API, log to an external service — all before
          the request fires.
        </p>

        <h3>Universal runtime</h3>
        <p>
          glyde works anywhere fetch exists: browsers, Node.js 18+, Bun, Deno, Cloudflare Workers,
          Vercel Edge Functions. One library, every environment.
        </p>

        <h2>What&apos;s next</h2>
        <p>
          glyde v0.1.0 is available on npm today. Install it with <code>npm install glyde</code> and
          start making requests. We are actively working on retry plugins, request deduplication,
          and more interceptor examples.
        </p>
      </BlogPostContent>
    </article>
  )
}
