import { CodeBlock } from "@/components/code-block"
import { BlogPostHeader, BlogPostContent } from "@/components/blog-post"

export const metadata = {
  title: "Auth patterns for Next.js App Router with glyde",
  description: "How to handle authentication in Next.js App Router with glyde. Middleware token refresh, tower/passenger pattern, and httpOnly cookie security.",
}

const middlewareCode = `// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const access = request.cookies.get("access_token")?.value
  const refresh = request.cookies.get("refresh_token")?.value

  if (!access && refresh) {
    const res = await fetch(\`\${process.env.API_BASE_URL}/auth/refresh\`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    })

    if (res.ok) {
      const { access: newToken } = await res.json()
      const response = NextResponse.next()
      response.cookies.set("access_token", newToken, {
        httpOnly: true, secure: true, sameSite: "lax", path: "/",
      })
      return response
    }

    // Refresh failed — session is dead
    const response = NextResponse.redirect(new URL("/login", request.url))
    response.cookies.delete("access_token")
    response.cookies.delete("refresh_token")
    return response
  }

  return NextResponse.next()
}`

export default function NextjsAuthPatternsPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <BlogPostHeader
        title="Auth patterns for Next.js App Router with glyde"
        date="2026-05-17"
        tag="Guide"
        readTime="6 min read"
      />

      <BlogPostContent>
        <p>
          The Next.js App Router introduced a constraint that breaks most auth libraries:
          <strong> Server Components cannot write cookies.</strong> Only Route Handlers and Server
          Actions can modify the cookie jar.
        </p>
        <p>
          This means if your Server Component calls an API, gets a 401, refreshes the token, and tries
          to save the new token — it fails silently. The refresh succeeds but the cookie never updates.
        </p>

        <h2>The solution: proactive refresh in middleware</h2>
        <p>
          Instead of reacting to 401s, check the token <em>before</em> the page renders. Next.js
          middleware runs before every request, can read AND write cookies, and can make fetch calls.
        </p>

        <CodeBlock code={middlewareCode} language="typescript" />

        <h2>The tower/passenger pattern</h2>
        <p>
          With middleware handling refresh, your glyde instances become simple:
        </p>
        <ul>
          <li><strong>tower</strong> (server) — reads cookies, adds Authorization header via interceptor</li>
          <li><strong>passenger</strong> (client) — calls /api/proxy routes, redirects on 401</li>
        </ul>
        <p>
          Neither instance needs to know about token refresh. Middleware handles it transparently
          before any code runs.
        </p>

        <h2>Why this is better than built-in refresh</h2>
        <ul>
          <li>No cookie-writing constraint — middleware can write cookies</li>
          <li>No double-request penalty — token is fresh before SSR starts</li>
          <li>No mutex/queue complexity — one refresh per request cycle</li>
          <li>Framework-aligned — uses Next.js primitives, not library hacks</li>
        </ul>

        <h2>Key takeaway</h2>
        <p>
          Don&apos;t fight the framework. Next.js middleware exists precisely for this use case.
          Let glyde handle the HTTP layer (interceptors, errors, types) and let middleware handle
          the auth lifecycle (refresh, redirect, cookie management).
        </p>
      </BlogPostContent>
    </article>
  )
}
