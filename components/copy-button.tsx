"use client"

import { useState } from "react"

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={copy}
      className="absolute top-2.5 right-2.5 text-xs font-medium px-2.5 py-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-black/5 transition-colors opacity-0 group-hover:opacity-100"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  )
}
