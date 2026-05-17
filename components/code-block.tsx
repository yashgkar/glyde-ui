import { codeToHtml } from "shiki"
import { CopyButton } from "./copy-button"

export async function CodeBlock({
  code,
  language = "typescript",
}: {
  code: string
  language?: string
}) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: "github-light",
  })

  return (
    <div
      className="group relative rounded-xl  overflow-hidden"
      style={{ backgroundColor: "#ffffff" }}
    >
      <CopyButton code={code} />
      <div
        className="text-sm [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:bg-transparent! [&_.shiki]:bg-transparent! font-mono [&_.shiki]:border-none!"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
