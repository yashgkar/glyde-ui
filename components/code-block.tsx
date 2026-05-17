import { codeToHtml } from "shiki"

export async function CodeBlock({
  code,
  language = "typescript",
}: {
  code: string
  language?: string
}) {
  const html = await codeToHtml(code, {
    lang: language,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  })

  return (
    <div
      className="rounded-xl overflow-hidden text-sm [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:bg-transparent! [&_.shiki]:bg-transparent!"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
