import { CodeBlock } from "@/components/code-block"

export const metadata = {
  title: "Next.js Usage",
  description: "Use glyde with Next.js App Router. Server-side tower pattern, client-side passenger pattern, and middleware token refresh for auth.",
}

const towerCode = `// lib/api/server.ts — "tower" (server-side instance)
import plane from "glyde"
import { cookies } from "next/headers"

export async function tower() {
  const api = plane({ baseURL: process.env.API_BASE_URL })
  const cookieStore = await cookies()

  api.interceptors.request.use((config) => {
    const token = cookieStore.get("access_token")?.value
    if (token) {
      config.headers = { ...config.headers, Authorization: \`Bearer \${token}\` }
    }
    return config
  })

  return api
}`

const passengerCode = `// lib/api/client.ts — "passenger" (client-side instance)
"use client"
import plane from "glyde"

export const passenger = plane({ baseURL: "/api/proxy" })

passenger.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.status === 401) window.location.href = "/login"
    throw error
  }
)`

const routeHandlerCode = `// app/api/users/route.ts
import { tower } from "@/lib/api/server"
import { isHttpError } from "glyde"

export async function GET(request: Request) {
  const api = await tower()

  try {
    const { data } = await api.get("/users/", { signal: request.signal })
    return Response.json(data)
  } catch (err) {
    if (isHttpError(err)) {
      return new Response(null, { status: err.status })
    }
    throw err
  }
}`

const middlewareCode = `// middleware.ts — proactive token refresh before SSR
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const access = request.cookies.get("access_token")?.value
  const refresh = request.cookies.get("refresh_token")?.value

  // If access token is missing/expired but refresh exists — refresh proactively
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
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      })
      return response
    } else {
      // Refresh failed — clear cookies and redirect to login
      const response = NextResponse.redirect(new URL("/login", request.url))
      response.cookies.delete("access_token")
      response.cookies.delete("refresh_token")
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/proxy/:path*"],
}`

export default function NextjsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1>Next.js Usage</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Recommended patterns for using glyde with Next.js App Router.
          Framework-agnostic core, framework-specific patterns.
        </p>
      </div>

      <section className="not-prose">
        <div className="glass rounded-xl p-4 border-l-4 border-primary">
          <p className="text-sm">
            <strong>Key insight:</strong> Server Components cannot write cookies.
            Token refresh must happen in Next.js middleware (before SSR), not in the HTTP client.
            glyde provides the interceptor hooks — you wire the auth logic where it belongs.
          </p>
        </div>
      </section>

      <section>
        <h2>Naming Convention</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr><th>Term</th><th>Where</th><th>Job</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>tower</strong></td><td>Route Handlers, Server Actions</td><td>Calls external API with auth headers from cookies</td></tr>
              <tr><td><strong>passenger</strong></td><td>Client Components, browser</td><td>Calls /api/* proxy routes, redirects on 401</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Server Instance (tower)</h2>
        <CodeBlock code={towerCode} language="typescript" />
      </section>

      <section>
        <h2>Client Instance (passenger)</h2>
        <CodeBlock code={passengerCode} language="typescript" />
      </section>

      <section>
        <h2>Route Handler</h2>
        <CodeBlock code={routeHandlerCode} language="typescript" />
      </section>

      <section>
        <h2>Token Refresh via Middleware</h2>
        <p>
          Since Server Components cannot write cookies, handle token refresh proactively
          in Next.js middleware. This ensures Server Components always have a valid token.
        </p>
        <CodeBlock code={middlewareCode} language="typescript" />
      </section>

      <section>
        <h2>Architecture</h2>
        <div className="not-prose glass rounded-xl p-6">
          <pre className="text-sm font-mono text-muted-foreground whitespace-pre leading-relaxed">
{`Browser (passenger)
    │
    ▼
Next.js Route Handler (/api/proxy/*)
    │  ← tower() adds auth headers
    ▼
External API (Django, FastAPI, etc.)

Middleware runs BEFORE SSR:
  ├── Check access_token cookie
  ├── If expired + refresh_token exists → refresh proactively
  └── Server Components always get fresh token`}
          </pre>
        </div>
      </section>
    </div>
  )
}
