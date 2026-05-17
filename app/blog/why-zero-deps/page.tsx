import { BlogPostHeader, BlogPostContent } from "@/components/blog-post"

export const metadata = {
  title: "Why zero dependencies matters in 2026",
}

export default function WhyZeroDepsPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <BlogPostHeader
        title="Why zero dependencies matters in 2026"
        date="2026-05-17"
        tag="Security"
        readTime="5 min read"
      />

      <BlogPostContent>
        <p>
          Every dependency you add is code you trust but never read. In 2026, that trust was
          exploited at scale.
        </p>

        <h2>The axios incident</h2>
        <p>
          In March 2026, a North Korean state actor (tracked as Sapphire Sleet) compromised the axios
          npm package through a social engineering attack on a maintainer. The malicious code ran in
          millions of CI/CD pipelines and production servers before detection.
        </p>
        <p>
          axios has 2 direct dependencies. Those dependencies have their own dependencies. Each one is
          an attack surface. Each maintainer is a target. Each version update is a vector.
        </p>

        <h2>The math of supply chain risk</h2>
        <p>
          A package with N dependencies has N+1 points of failure (including itself). But
          transitive dependencies multiply the surface. <code>got</code> has 11 direct dependencies
          which expand to 20+ when you count transitives. Each one is maintained by a different
          human with different security practices.
        </p>

        <h2>Zero is the only safe number</h2>
        <p>
          glyde has zero runtime dependencies. The entire library is one file of TypeScript that
          compiles to 1.73 KB. There is nothing to compromise because there is nothing to audit
          beyond our own code.
        </p>
        <ul>
          <li>No transitive dependency vulnerabilities</li>
          <li>No maintainer social engineering risk (beyond us)</li>
          <li>No version update surprises</li>
          <li>No abandoned sub-dependency with known CVEs</li>
          <li><code>npm audit</code> will always return clean</li>
        </ul>

        <h2>But isn&apos;t that reinventing the wheel?</h2>
        <p>
          No. glyde delegates to native <code>fetch</code> — the browser and Node.js runtime do the
          heavy lifting. We add a thin layer: config merging, URL building, header management,
          interceptors, and typed errors. All of this is straightforward code that doesn&apos;t need
          external libraries.
        </p>
        <p>
          The &ldquo;reinventing&rdquo; argument only applies when the alternative is complex (crypto, parsers,
          protocols). An HTTP client wrapper is simple enough that the dependency cost outweighs
          the implementation cost.
        </p>

        <h2>Conclusion</h2>
        <p>
          In a post-supply-chain-attack world, every dependency is a liability. Choose libraries that
          minimize your exposure. glyde exists because we believe an HTTP client should ship zero
          liabilities alongside its features.
        </p>
      </BlogPostContent>
    </article>
  )
}
