import Link from "next/link"
import {
  ArrowRight,
  Zap,
  Shield,
  Layers,
  Timer,
  Code,
  Package,
  Server,
} from "lucide-react"
import { CodeBlock } from "@/components/code-block"
import { StatsSection } from "@/components/stats-section"

const heroCode = `import plane from "glyde"

const api = plane({ baseURL: "https://api.example.com" })

// Typed responses, zero config
const { data } = await api.get<User[]>("/users")

// Interceptors for auth, logging, anything
api.interceptors.request.use((config) => ({
  ...config,
  headers: { ...config.headers, Authorization: \`Bearer \${token}\` },
}))`

const nextjsServerCode = `// lib/api/server.ts — "tower" (server-side)
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

const nextjsClientCode = `// lib/api/client.ts — "passenger" (browser)
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

export default function Home() {
  return (
    <div className="relative">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-pastel-purple opacity-40 blur-3xl" />
        <div className="absolute top-60 -left-40 w-96 h-96 rounded-full bg-pastel-blue opacity-40 blur-3xl" />
        <div className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-pastel-pink opacity-30 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-6 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground mb-6">
              <Package className="h-3.5 w-3.5" />
              ✈️ v0.1.0 &mdash; now on npm
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              HTTP requests that <span className="gradient-text">glyde</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              A lightweight, TypeScript-first HTTP client built on native fetch.
              Zero dependencies. Typed errors. Async interceptors. 1.73 KB
              gzipped.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="glass rounded-xl px-5 py-3 font-mono text-sm flex items-center gap-2">
                <span className="text-muted-foreground">$</span>
                npm install glyde
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-1">
            <CodeBlock code={heroCode} language="typescript" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsSection />

      {/* Features */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">Why developers choose glyde</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Built for the modern stack. No legacy XHR, no bloated abstractions,
            no supply chain risk.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Zap className="h-5 w-5" />}
            title="Zero Dependencies"
            description="No transitive vulnerabilities. No supply chain attacks. Just your code and native fetch."
            color="pastel-yellow"
          />
          <FeatureCard
            icon={<Code className="h-5 w-5" />}
            title="TypeScript-First"
            description="Full generic inference on every request. Typed errors you can catch precisely. No any types."
            color="pastel-purple"
          />
          <FeatureCard
            icon={<Layers className="h-5 w-5" />}
            title="Async Interceptors"
            description="Request and response pipelines with full async/await support. Add auth, logging, transforms."
            color="pastel-blue"
          />
          <FeatureCard
            icon={<Shield className="h-5 w-5" />}
            title="Typed Error Hierarchy"
            description="HttpError, TimeoutError, NetworkError — catch by type with type guards, not string matching."
            color="pastel-green"
          />
          <FeatureCard
            icon={<Timer className="h-5 w-5" />}
            title="Tiny & Fast"
            description="5.25 KB minified, 1.73 KB gzipped. Ships ESM + CJS. Tree-shakeable. No bundler magic needed."
            color="pastel-pink"
          />
          <FeatureCard
            icon={<Package className="h-5 w-5" />}
            title="Universal Runtime"
            description="Works in browsers, Node.js 18+, Bun, Deno, Cloudflare Workers — anywhere fetch exists."
            color="pastel-orange"
          />
        </div>
      </section>

      {/* Next.js Showcase */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-primary mb-4">
            <Server className="h-3.5 w-3.5" />
            Next.js App Router ready
          </div>
          <h2 className="text-3xl font-bold">First-class Next.js support</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            glyde was designed with Next.js App Router in mind — Server
            Components, Route Handlers, middleware token refresh. But it works
            just as well with Express, Nuxt, SvelteKit, or plain Node.js.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium mb-2 text-muted-foreground">
              Server-side (tower)
            </p>
            <div className="glass rounded-2xl p-1">
              <CodeBlock code={nextjsServerCode} language="typescript" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-2 text-muted-foreground">
              Client-side (passenger)
            </p>
            <div className="glass rounded-2xl p-1">
              <CodeBlock code={nextjsClientCode} language="typescript" />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Works everywhere fetch exists — not just Next.js
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Next.js",
              "Express",
              "Nuxt",
              "SvelteKit",
              "Bun",
              "Deno",
              "Cloudflare Workers",
              "Node.js",
            ].map((fw) => (
              <span
                key={fw}
                className="glass rounded-lg px-3 py-1.5 text-xs font-medium"
              >
                {fw}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/docs/nextjs"
            className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
          >
            Read the Next.js guide <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Quick comparison */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="glass rounded-3xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            The numbers speak
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <ComparisonStat
              label="vs axios"
              stat="97% smaller"
              detail="1.73 KB vs 53 KB gzipped"
            />
            <ComparisonStat
              label="Dependencies"
              stat="0"
              detail="axios has 2"
            />
            <ComparisonStat
              label="TypeScript"
              stat="100%"
              detail="Written in TS, not bolted on"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-7xl px-6 py-24 text-center">
        <h2 className="text-3xl font-bold">Ready to glyde?</h2>
        <p className="mt-4 text-muted-foreground">
          Start making HTTP requests the modern way. One install, zero config.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            Read the Docs
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/comparison"
            className="inline-flex items-center gap-2 glass px-6 py-3 rounded-xl font-medium hover:scale-[1.02] transition-transform"
          >
            See Comparisons
          </Link>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}) {
  return (
    <div className="glass rounded-2xl p-6 hover:scale-[1.02] transition-transform">
      <div
        className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-${color} mb-4`}
      >
        {icon}
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}

function ComparisonStat({
  label,
  stat,
  detail,
}: {
  label: string
  stat: string
  detail: string
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="text-3xl font-bold gradient-text-subtle mt-1">{stat}</p>
      <p className="text-sm text-muted-foreground mt-1">{detail}</p>
    </div>
  )
}
