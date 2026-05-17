"use client"

import { useState } from "react"

const managers = [
  { label: "npm", command: "npm install glyde" },
  { label: "pnpm", command: "pnpm add glyde" },
  { label: "yarn", command: "yarn add glyde" },
]

export function InstallBlock() {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(managers[active].command)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div
      className="rounded-xl border border-border overflow-hidden"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="flex items-center gap-1 px-3 pt-3">
        {managers.map((m, i) => (
          <button
            key={m.label}
            onClick={() => {
              setActive(i)
              setCopied(false)
            }}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              i === active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between px-4 py-3">
        <code className="font-mono text-sm text-foreground">
          <span className="text-muted-foreground select-none">$ </span>
          {managers[active].command}
        </code>
        <button
          onClick={copy}
          className="ml-4 shrink-0 text-xs font-medium px-2.5 py-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-black/5 transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  )
}
