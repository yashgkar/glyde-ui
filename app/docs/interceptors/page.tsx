import { CodeBlock } from "@/components/code-block"

export const metadata = {
  title: "Interceptors — glyde",
}

const requestInterceptor = `// Add auth header to every request
api.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: \`Bearer \${getToken()}\`,
  },
}))`

const responseInterceptor = `// Unwrap nested API responses
api.interceptors.response.use((response) => ({
  ...response,
  data: response.data.result,
}))`

const asyncInterceptor = `// Async interceptors are awaited automatically
api.interceptors.request.use(async (config) => {
  const token = await refreshTokenIfNeeded()
  return {
    ...config,
    headers: { ...config.headers, Authorization: \`Bearer \${token}\` },
  }
})`

const errorHandler = `// Second argument is an error handler
api.interceptors.request.use(
  (config) => {
    throw new Error("something went wrong")
  },
  (error) => {
    console.error("Interceptor failed:", error)
    // Error is caught — request continues without this interceptor's changes
  }
)`

const ejectCode = `// Register returns an ID
const id = api.interceptors.request.use(myInterceptor)

// Remove by ID
api.interceptors.request.eject(id)`

const orderCode = `// Interceptors run in registration order (FIFO)
api.interceptors.request.use(first)   // runs 1st
api.interceptors.request.use(second)  // runs 2nd
api.interceptors.request.use(third)   // runs 3rd

// Each receives the output of the previous one`

const loggingExample = `// Logging interceptor
api.interceptors.response.use((response) => {
  console.log(\`[\${response.status}] \${response.config.method} \${response.config.url}\`)
  return response
})`

export default function InterceptorsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1>Interceptors</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Add middleware to the request/response pipeline. Auth, logging, transforms — all async-aware.
        </p>
      </div>

      <section>
        <h2>Request Interceptors</h2>
        <p>
          Run <strong>before</strong> fetch. Each receives the config and must return it (modified or not).
        </p>
        <CodeBlock code={requestInterceptor} language="typescript" />
      </section>

      <section>
        <h2>Response Interceptors</h2>
        <p>
          Run <strong>after</strong> fetch and parsing. Each receives the response and must return it.
        </p>
        <CodeBlock code={responseInterceptor} language="typescript" />
      </section>

      <section>
        <h2>Async Interceptors</h2>
        <p>
          Interceptors can be async functions — they are awaited automatically in sequence.
        </p>
        <CodeBlock code={asyncInterceptor} language="typescript" />
      </section>

      <section>
        <h2>Error Handlers</h2>
        <p>
          <code>use()</code> accepts an optional second argument — an error handler that catches
          if the interceptor throws.
        </p>
        <CodeBlock code={errorHandler} language="typescript" />
      </section>

      <section>
        <h2>Ejecting</h2>
        <p>Remove a registered interceptor by its ID.</p>
        <CodeBlock code={ejectCode} language="typescript" />
      </section>

      <section>
        <h2>Execution Order</h2>
        <p>Multiple interceptors run in registration order. Each passes its result to the next.</p>
        <CodeBlock code={orderCode} language="typescript" />
      </section>

      <section>
        <h2>Example: Logging</h2>
        <CodeBlock code={loggingExample} language="typescript" />
      </section>
    </div>
  )
}
