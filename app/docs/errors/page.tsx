import { CodeBlock } from "@/components/code-block"

export const metadata = {
  title: "Error Handling — glyde",
}

const hierarchyCode = `// Error hierarchy
GlydeError (base)
├── HttpError      — non-2xx response (has status, response, config)
├── TimeoutError   — request exceeded timeout
└── NetworkError   — fetch failed (DNS, offline, CORS)`

const usageCode = `import { isHttpError, isTimeoutError, isGlydeError } from "glyde"

try {
  await api.get("/data")
} catch (err) {
  if (isHttpError(err)) {
    console.log(err.status)         // 404
    console.log(err.response?.data) // parsed response body
    console.log(err.config.url)     // "/data"
    console.log(err.message)        // "HTTP 404: Not Found"
  }

  if (isTimeoutError(err)) {
    // Request was aborted after timeout
    console.log(err.message) // "Request timed out after 5000ms"
  }

  if (isGlydeError(err)) {
    // Catches ALL glyde errors (network, timeout, http)
  }
}`

const httpErrorCode = `class HttpError extends GlydeError {
  status: number              // e.g. 404
  response?: GlydeResponse   // full response with parsed data
  config: RequestConfig       // what was requested
  message: string             // "HTTP 404: Not Found"
}`

const typeGuardsCode = `// Type guards work across module boundaries (safer than instanceof)
import { isGlydeError, isHttpError, isTimeoutError } from "glyde"

// Each narrows the type:
if (isHttpError(err)) {
  err.status        // TypeScript knows this exists
  err.response.data // TypeScript knows this exists
}`

const retryExample = `// Retry pattern with interceptors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (isHttpError(error) && error.status === 429) {
      // Rate limited — wait and retry
      await new Promise(r => setTimeout(r, 1000))
      return api.request(error.config)
    }
    throw error
  }
)`

export default function ErrorsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1>Error Handling</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Typed errors with type guards. Catch by type, not by string matching.
        </p>
      </div>

      <section>
        <h2>Error Hierarchy</h2>
        <p>All errors extend <code>GlydeError</code>, which extends native <code>Error</code>:</p>
        <CodeBlock code={hierarchyCode} language="text" />
      </section>

      <section>
        <h2>Usage</h2>
        <CodeBlock code={usageCode} language="typescript" />
      </section>

      <section>
        <h2>HttpError</h2>
        <p>Thrown when the server responds with a non-2xx status. Contains the full response:</p>
        <CodeBlock code={httpErrorCode} language="typescript" />
      </section>

      <section>
        <h2>Type Guards</h2>
        <p>
          Use type guards instead of <code>instanceof</code> — they work across module boundaries
          and provide proper TypeScript narrowing.
        </p>
        <CodeBlock code={typeGuardsCode} language="typescript" />
      </section>

      <section>
        <h2>Example: Retry on 429</h2>
        <CodeBlock code={retryExample} language="typescript" />
      </section>

      <section>
        <h2>When each error is thrown</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Error</th>
                <th>When</th>
                <th>Has response?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>HttpError</code></td>
                <td>Server returned non-2xx status</td>
                <td>Yes — full parsed response</td>
              </tr>
              <tr>
                <td><code>TimeoutError</code></td>
                <td>Request exceeded configured timeout</td>
                <td>No</td>
              </tr>
              <tr>
                <td><code>NetworkError</code></td>
                <td>fetch() itself failed (DNS, offline, CORS)</td>
                <td>No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
