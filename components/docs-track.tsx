"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "fumadocs-ui/components/ui/popover"

/* ─────────────────────────────────────────────────── track model */

const STORAGE_KEY = "amarsia-docs-track"
const TRACKS = ["sdk", "react", "rest-api"] as const
export type DocTrack = (typeof TRACKS)[number]

const TRACK_META: Record<
  DocTrack,
  { label: string; icon: string | null; description: string; npmUrl?: string }
> = {
  sdk: {
    label: "JavaScript SDK",
    icon: "https://storage.googleapis.com/amarsia-assets/JavaScript.png",
    description:
      "Official TypeScript/JavaScript SDK for run, stream, and conversation flows.",
    npmUrl: "https://www.npmjs.com/package/@amarsia/sdk",
  },
  react: {
    label: "React / Next.js",
    icon: "https://storage.googleapis.com/amarsia-assets/React.png",
    description:
      "React hooks built on the SDK for chat UIs and client components.",
    npmUrl: "https://www.npmjs.com/package/@amarsia/react",
  },
  "rest-api": {
    label: "REST API",
    icon: null,
    description: "Plain HTTP endpoints with curl and fetch examples.",
  },
}

function isTrack(v: unknown): v is DocTrack {
  return typeof v === "string" && (TRACKS as readonly string[]).includes(v)
}

/* ─────────────────────────────────────────────────── context */

type TrackCtx = {
  track: DocTrack
  setTrack: (t: DocTrack) => void
  mounted: boolean
}

const TrackContext = createContext<TrackCtx>({
  track: "sdk",
  setTrack: () => {},
  mounted: false,
})

export function TrackProvider({ children }: { children: ReactNode }) {
  const [track, setTrackState] = useState<DocTrack>("sdk")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isTrack(stored)) setTrackState(stored)
    setMounted(true)
  }, [])

  const setTrack = useCallback((t: DocTrack) => {
    setTrackState(t)
    localStorage.setItem(STORAGE_KEY, t)
  }, [])

  const value = useMemo(
    () => ({ track: mounted ? track : "sdk", setTrack, mounted }),
    [track, setTrack, mounted],
  )

  return <TrackContext.Provider value={value}>{children}</TrackContext.Provider>
}

export function useTrack() {
  return useContext(TrackContext)
}

/* ─────────────────────────────────────────────────── full-width sidebar banner */

export function TrackBannerBar() {
  const { track, setTrack, mounted } = useTrack()
  const current = mounted ? track : "sdk"
  const meta = TRACK_META[current]
  const [open, setOpen] = useState(false)

  return (
    <div className="am-track-banner px-2.5 py-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="bg-fd-secondary/50 text-fd-secondary-foreground hover:bg-fd-accent data-[state=open]:bg-fd-accent data-[state=open]:text-fd-accent-foreground flex w-full items-center gap-2 rounded-lg border p-2 text-start transition-colors"
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <TrackIcon icon={meta.icon} label={meta.label} />
            <div className="min-w-0">
              <p className="text-sm font-medium">{meta.label}</p>
            </div>
            <svg
              className={`text-fd-muted-foreground ms-auto size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
              width="16"
              height="16"
              viewBox="0 0 10 10"
              fill="none"
              aria-hidden
            >
              <path
                d="M2 3.5L5 6.5L8 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={4}
          className="am-track-banner-panel flex w-[var(--radix-popover-trigger-width)] flex-col gap-1 overflow-hidden p-1"
        >
          {TRACKS.map((t) => {
            const m = TRACK_META[t]
            const active = t === current
            return (
              <button
                type="button"
                key={t}
                role="option"
                aria-selected={active}
                className={`hover:bg-fd-accent hover:text-fd-accent-foreground flex items-center gap-2 rounded-lg p-1.5 text-start transition-colors ${active ? "bg-fd-accent text-fd-accent-foreground" : ""}`}
                onClick={() => {
                  setTrack(t)
                  setOpen(false)
                }}
              >
                <TrackIcon icon={m.icon} label={m.label} />
                <div className="min-w-0">
                  <p className="text-sm font-medium">{m.label}</p>
                </div>
                <svg
                  className={`text-fd-primary ms-auto size-3.5 shrink-0 ${active ? "" : "invisible"}`}
                  width="14"
                  height="14"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2 6L5 9L10 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )
          })}
        </PopoverContent>
      </Popover>
    </div>
  )
}

/* ─────────────────────────────────────────────────── track icon */

function TrackIcon({ icon, label }: { icon: string | null; label: string }) {
  if (icon) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={icon}
        alt={label}
        width={16}
        height={16}
        className="am-track-icon"
      />
    )
  }
  return <span className="am-track-icon-code">&lt;/&gt;</span>
}

/* ─────────────────────────────────────────────────── IDE-style nav dropdown */

export function TrackDropdown() {
  const { track, setTrack } = useTrack()
  const [open, setOpen] = useState(false)
  const meta = TRACK_META[track]

  return (
    <div className="am-track-wrap">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="bg-fd-secondary/50 text-fd-secondary-foreground hover:bg-fd-accent data-[state=open]:bg-fd-accent data-[state=open]:text-fd-accent-foreground flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-start transition-colors"
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <TrackIcon icon={meta.icon} label={meta.label} />
            <span className="text-sm">{meta.label}</span>
            <svg
              className={`text-fd-muted-foreground size-3.5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
              width="14"
              height="14"
              viewBox="0 0 10 10"
              fill="none"
              aria-hidden
            >
              <path
                d="M2 3.5L5 6.5L8 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={4}
          className="flex min-w-[230px] flex-col gap-1 overflow-hidden p-1"
        >
          {TRACKS.map((t) => {
            const m = TRACK_META[t]
            const active = t === track
            return (
              <button
                type="button"
                key={t}
                role="option"
                aria-selected={active}
                className={`hover:bg-fd-accent hover:text-fd-accent-foreground flex items-center gap-2 rounded-lg p-1.5 text-start transition-colors ${active ? "bg-fd-accent text-fd-accent-foreground" : ""}`}
                onClick={() => {
                  setTrack(t)
                  setOpen(false)
                }}
              >
                <TrackIcon icon={m.icon} label={m.label} />
                <span className="text-sm font-medium">{m.label}</span>
                <svg
                  className={`text-fd-primary ms-auto size-3.5 shrink-0 ${active ? "" : "invisible"}`}
                  width="14"
                  height="14"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2 6L5 9L10 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )
          })}
        </PopoverContent>
      </Popover>
    </div>
  )
}

/* ─────────────────────────────────────────────────── MDX helpers */

export function TrackContent({
  track,
  children,
}: {
  track: DocTrack
  children: ReactNode
}) {
  const { track: current, mounted } = useTrack()
  const show = mounted ? current === track : track === "sdk"
  if (!show) return null
  return <>{children}</>
}

/** Kept for backward compat in MDX but intentionally renders nothing now.
 *  The global nav dropdown replaces inline track hints. */
export function TrackHint() {
  return null
}

/** @deprecated use TrackDropdown in nav instead */
export function TrackSelector({}: {
  compact?: boolean
  showDescriptions?: boolean
}) {
  return null
}
