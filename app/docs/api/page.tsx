import { CodeBlock } from "@/components/code-block"

export const metadata = {
  title: "API Reference — glyde",
}

const configCode = `interface RequestConfig {
  url?: string
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS"
  baseURL?: string
  headers?: Record<string, string>
  params?: Record<string, string | number | boolean>
  data?: unknown
  timeout?: number
  signal?: AbortSignal
  responseType?: "json" | "text" | "blob" | "arrayBuffer" | "stream"
  withCredentials?: boolean
}`

const methodsCode = `const api = plane({ baseURL: "https://api.example.com" })

// GET — no body sent, even if data provided
api.get<User[]>("/users")
api.get("/search", { params: { q: "glyde", page: 1 } })

// POST, PUT, PATCH — second arg is request body
api.post<User>("/users", { name: "Yash" })
api.put("/users/1", updatedUser)
api.patch("/users/1", { name: "New Name" })

// DELETE, HEAD — no body
api.delete("/users/1")
api.head("/health")

// Generic request
api.request({ method: "GET", url: "/custom" })

// File upload — auto-removes Content-Type for correct boundary
api.upload("/files", formData)

// Streaming — returns ReadableStream without consuming body
api.stream("/events")`

const timeoutCode = `// Instance-level timeout
const api = plane({ timeout: 5000 })

// Per-request override
await api.get("/slow", { timeout: 15000 })`

const abortCode = `const controller = new AbortController()

// Pass signal to request
api.get("/data", { signal: controller.signal })

// Cancel it
controller.abort()`

const credentialsCode = `// Default: credentials: "same-origin"
const api = plane()

// Send cookies cross-origin: credentials: "include"
const api = plane({ withCredentials: true })`

const uploadCode = `const form = new FormData()
form.append("file", file)
form.append("name", "avatar")

// Content-Type is automatically removed — browser sets it with boundary
await api.upload("/upload", form)

// URLSearchParams also auto-removes Content-Type
const params = new URLSearchParams({ grant_type: "password" })
await api.post("/token", params)`

const streamCode = `const { data: stream } = await api.stream("/events")
// data is a ReadableStream — body is NOT consumed

const reader = stream.getReader()
while (true) {
  const { done, value } = await reader.read()
  if (done) break
  console.log(new TextDecoder().decode(value))
}`

export default function ApiPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1>API Reference</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Complete reference for all glyde methods and configuration options.
        </p>
      </div>

      <section>
        <h2>plane(config?)</h2>
        <p>
          Creates a new HTTP client instance. Every call returns an independent instance with
          its own config and interceptors. Available as both default and named export.
        </p>
        <CodeBlock code={`import plane from "glyde"\n// or\nimport { plane } from "glyde"`} language="typescript" />
      </section>

      <section>
        <h2>Request Config</h2>
        <CodeBlock code={configCode} language="typescript" />
        <div className="mt-4 overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>baseURL</code></td><td><code>""</code></td><td>Prepended to relative URLs</td></tr>
              <tr><td><code>timeout</code></td><td><code>0</code></td><td>Milliseconds before abort (0 = no timeout)</td></tr>
              <tr><td><code>responseType</code></td><td><code>"json"</code></td><td>How to parse the response body</td></tr>
              <tr><td><code>withCredentials</code></td><td><code>false</code></td><td>If true, sets credentials: "include"</td></tr>
              <tr><td><code>headers</code></td><td>JSON defaults</td><td>Content-Type and Accept set to application/json</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>HTTP Methods</h2>
        <CodeBlock code={methodsCode} language="typescript" />
      </section>

      <section>
        <h2>Timeout</h2>
        <p>
          Set a timeout in milliseconds. When exceeded, a <code>TimeoutError</code> is thrown.
          Internally uses <code>AbortController</code>.
        </p>
        <CodeBlock code={timeoutCode} language="typescript" />
      </section>

      <section>
        <h2>Cancellation</h2>
        <p>Pass an <code>AbortSignal</code> to cancel requests manually.</p>
        <CodeBlock code={abortCode} language="typescript" />
      </section>

      <section>
        <h2>Credentials</h2>
        <CodeBlock code={credentialsCode} language="typescript" />
      </section>

      <section>
        <h2>File Upload</h2>
        <p>
          When body is <code>FormData</code> or <code>URLSearchParams</code>, Content-Type is
          automatically removed so the browser sets the correct multipart boundary.
        </p>
        <CodeBlock code={uploadCode} language="typescript" />
      </section>

      <section>
        <h2>Streaming</h2>
        <p>Returns a <code>ReadableStream</code> without consuming the response body.</p>
        <CodeBlock code={streamCode} language="typescript" />
      </section>
    </div>
  )
}
