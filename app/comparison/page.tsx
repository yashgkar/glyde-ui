import { CodeBlock } from "@/components/code-block"
import { Check, X, Minus } from "lucide-react"

export const metadata = {
  title: "Comparison — glyde vs axios, ky, wretch, got",
}

const glydeExample = `import plane from "glyde"

const api = plane({ baseURL: "https://api.example.com" })
const { data } = await api.get<User[]>("/users")`

const axiosExample = `import axios from "axios"

const api = axios.create({ baseURL: "https://api.example.com" })
const { data } = await api.get<User[]>("/users")`

export default function ComparisonPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-40 w-96 h-96 rounded-full bg-pastel-green opacity-30 blur-3xl" />
        <div className="absolute bottom-40 -left-40 w-80 h-80 rounded-full bg-pastel-purple opacity-30 blur-3xl" />
      </div>

      <div className="relative space-y-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold">How glyde compares</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A transparent look at how glyde stacks up against popular HTTP clients.
          </p>
        </div>

        {/* Size comparison */}
        <section className="glass rounded-3xl p-8 lg:p-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Bundle Size (min+gzip)</h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            <SizeBar name="glyde" size="1.73 KB" percent={3} highlight />
            <SizeBar name="ky" size="3.4 KB" percent={6} />
            <SizeBar name="wretch" size="4.3 KB" percent={8} />
            <SizeBar name="redaxios" size="1.0 KB" percent={2} />
            <SizeBar name="axios" size="53 KB" percent={100} />
            <SizeBar name="got" size="48 KB" percent={90} />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Lower is better. glyde is 97% smaller than axios.
          </p>
        </section>

        {/* Feature table */}
        <section>
          <h2 className="text-2xl font-bold mb-8 text-center">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>glyde</th>
                  <th>axios</th>
                  <th>ky</th>
                  <th>wretch</th>
                  <th>got</th>
                </tr>
              </thead>
              <tbody>
                <FeatureRow feature="Zero dependencies" glyde wretch />
                <FeatureRow feature="TypeScript-first" glyde ky wretch />
                <FeatureRow feature="Native fetch" glyde ky wretch />
                <FeatureRow feature="Request interceptors" glyde axios />
                <FeatureRow feature="Response interceptors" glyde axios />
                <FeatureRow feature="Typed error hierarchy" glyde />
                <FeatureRow feature="Type guard functions" glyde />
                <FeatureRow feature="Streaming support" glyde axios ky got />
                <FeatureRow feature="Timeout (AbortController)" glyde axios ky wretch got />
                <FeatureRow feature="FormData auto-boundary" glyde axios ky wretch />
                <FeatureRow feature="Browser + Node.js" glyde axios ky wretch />
                <FeatureRow feature="ESM + CJS" glyde axios ky wretch got />
                <FeatureRow feature="Node.js only" got />
              </tbody>
            </table>
          </div>
        </section>

        {/* Dependency count */}
        <section className="glass rounded-3xl p-8 lg:p-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Dependency Count</h2>
          <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            <DepCard name="glyde" count={0} highlight />
            <DepCard name="ky" count={0} />
            <DepCard name="wretch" count={0} />
            <DepCard name="redaxios" count={0} />
            <DepCard name="axios" count={2} />
            <DepCard name="got" count={11} />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Zero dependencies = zero supply chain risk. The axios supply chain attack (March 2026) affected millions of projects.
          </p>
        </section>

        {/* Code comparison */}
        <section>
          <h2 className="text-2xl font-bold mb-8 text-center">Same API, smaller package</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">glyde (1.73 KB)</p>
              <div className="glass rounded-2xl p-1">
                <CodeBlock code={glydeExample} language="typescript" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">axios (53 KB)</p>
              <div className="glass rounded-2xl p-1">
                <CodeBlock code={axiosExample} language="typescript" />
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Near-identical API surface. 97% less code shipped to your users.
          </p>
        </section>

        {/* Why not X */}
        <section>
          <h2 className="text-2xl font-bold mb-8 text-center">Why not...</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <WhyNotCard
              name="axios"
              reasons={[
                "53 KB gzipped — 30x larger than glyde",
                "Uses legacy XHR, not native fetch",
                "Supply chain attack in March 2026 (Sapphire Sleet)",
                "2 runtime dependencies",
              ]}
            />
            <WhyNotCard
              name="got"
              reasons={[
                "Node.js only — doesn't work in browsers",
                "11 runtime dependencies",
                "48 KB gzipped",
                "Over-engineered for most use cases",
              ]}
            />
            <WhyNotCard
              name="ky"
              reasons={[
                "No request/response interceptor system",
                "No typed error hierarchy with type guards",
                "Hooks API is less flexible than interceptors",
              ]}
            />
            <WhyNotCard
              name="wretch"
              reasons={[
                "No interceptor chain (uses addons/middleware pattern)",
                "Fluent/chaining API — different paradigm",
                "No typed error classes with type guards",
              ]}
            />
          </div>
        </section>
      </div>
    </div>
  )
}

function SizeBar({
  name,
  size,
  percent,
  highlight = false,
}: {
  name: string
  size: string
  percent: number
  highlight?: boolean
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-20 text-sm font-medium shrink-0">{name}</span>
      <div className="flex-1 h-8 bg-muted/50 rounded-lg overflow-hidden">
        <div
          className={`h-full rounded-lg flex items-center px-3 transition-all ${
            highlight ? "bg-primary/80" : "bg-muted-foreground/20"
          }`}
          style={{ width: `${Math.max(percent, 4)}%` }}
        >
          <span className="text-xs font-medium whitespace-nowrap">{size}</span>
        </div>
      </div>
    </div>
  )
}

function FeatureRow({
  feature,
  glyde,
  axios,
  ky,
  wretch,
  got,
}: {
  feature: string
  glyde?: boolean
  axios?: boolean
  ky?: boolean
  wretch?: boolean
  got?: boolean
}) {
  return (
    <tr>
      <td>{feature}</td>
      <td className="text-center">{glyde ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <Minus className="h-4 w-4 text-muted-foreground/40 mx-auto" />}</td>
      <td className="text-center">{axios ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <Minus className="h-4 w-4 text-muted-foreground/40 mx-auto" />}</td>
      <td className="text-center">{ky ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <Minus className="h-4 w-4 text-muted-foreground/40 mx-auto" />}</td>
      <td className="text-center">{wretch ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <Minus className="h-4 w-4 text-muted-foreground/40 mx-auto" />}</td>
      <td className="text-center">{got ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <Minus className="h-4 w-4 text-muted-foreground/40 mx-auto" />}</td>
    </tr>
  )
}

function DepCard({ name, count, highlight = false }: { name: string; count: number; highlight?: boolean }) {
  return (
    <div className={`rounded-xl p-4 ${highlight ? "bg-primary/10 border border-primary/30" : "bg-muted/50"}`}>
      <p className="text-2xl font-bold">{count}</p>
      <p className="text-sm text-muted-foreground">{name}</p>
    </div>
  )
}

function WhyNotCard({ name, reasons }: { name: string; reasons: string[] }) {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="font-semibold text-lg mb-3">{name}</h3>
      <ul className="space-y-2">
        {reasons.map((reason, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <X className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
            {reason}
          </li>
        ))}
      </ul>
    </div>
  )
}
