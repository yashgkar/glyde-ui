import { CodeBlock } from "@/components/code-block"

export const metadata = {
  title: "Getting Started — glyde",
}

const installCode = `npm install glyde`

const basicUsage = `import plane from "glyde"

// Create an instance with base config
const api = plane({
  baseURL: "https://api.example.com/v1",
  timeout: 5000,
  headers: { "X-App": "myapp" },
})

// GET request with typed response
const { data, status } = await api.get<User[]>("/users")

// POST with body
const { data: newUser } = await api.post<User>("/users", {
  name: "Yash",
  email: "yash@example.com",
})

// Query params
await api.get("/search", { params: { q: "glyde", page: 1 } })`

const responseShape = `// Every method returns Promise<GlydeResponse<T>>
interface GlydeResponse<T> {
  data: T                          // parsed response body
  status: number                   // HTTP status code
  statusText: string               // status text
  headers: Record<string, string>  // response headers
  config: RequestConfig            // the config that was sent
}`

export default function DocsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1>Getting Started</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Install glyde and make your first HTTP request in under a minute.
        </p>
      </div>

      <section>
        <h2>Installation</h2>
        <CodeBlock code={installCode} language="bash" />
        <p className="mt-4">
          glyde has <strong>zero dependencies</strong>. It works anywhere native <code>fetch</code> is
          available: browsers, Node.js 18+, Bun, Deno, and Cloudflare Workers.
        </p>
      </section>

      <section>
        <h2>Basic Usage</h2>
        <p>
          The <code>plane()</code> factory creates an independent HTTP client instance with its own
          config and interceptors.
        </p>
        <CodeBlock code={basicUsage} language="typescript" />
      </section>

      <section>
        <h2>Response Shape</h2>
        <p>Every request returns a typed response object:</p>
        <CodeBlock code={responseShape} language="typescript" />
      </section>

      <section>
        <h2>Key Concepts</h2>
        <div className="grid sm:grid-cols-2 gap-4 not-prose mt-4">
          <div className="glass rounded-xl p-4">
            <h3 className="font-semibold">Instances are independent</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Each <code className="bg-muted px-1 rounded text-xs">plane()</code> call creates a new client
              with its own config and interceptors. No shared global state.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-semibold">Methods are bound</h3>
            <p className="text-sm text-muted-foreground mt-1">
              You can destructure methods without losing context:
              <code className="bg-muted px-1 rounded text-xs block mt-1">{"const { get, post } = plane()"}</code>
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-semibold">Headers merge automatically</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Instance defaults → per-request headers. Later values override earlier ones.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-semibold">GET/HEAD never send body</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Even if you pass <code className="bg-muted px-1 rounded text-xs">data</code>, it won't be sent on GET or HEAD requests.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
