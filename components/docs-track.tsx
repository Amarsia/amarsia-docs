"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"

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
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const meta = TRACK_META[current]

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener("mousedown", onMouseDown)
    return () => document.removeEventListener("mousedown", onMouseDown)
  }, [open])

  return (
    <div className="am-track-banner" ref={wrapRef}>
      <button
        className="am-track-banner-btn"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <TrackIcon icon={meta.icon} label={meta.label} />
        <span className="am-track-banner-label">{meta.label}</span>
        <svg
          className={`am-track-chevron${open ? "is-open" : ""}`}
          width="10"
          height="10"
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

      {open && (
        <div className="am-track-banner-panel" role="listbox">
          {TRACKS.map((t) => {
            const m = TRACK_META[t]
            const active = t === current
            return (
              <button
                key={t}
                role="option"
                aria-selected={active}
                className={`am-track-banner-item${active ? "is-active" : ""}`}
                onClick={() => {
                  setTrack(t)
                  setOpen(false)
                }}
              >
                <TrackIcon icon={m.icon} label={m.label} />
                <span className="am-track-banner-item-label">{m.label}</span>
                {active && (
                  <svg
                    className="am-track-check"
                    width="12"
                    height="12"
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
                )}
              </button>
            )
          })}
        </div>
      )}
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
  const wrapRef = useRef<HTMLDivElement>(null)
  const meta = TRACK_META[track]

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener("mousedown", onMouseDown)
    return () => document.removeEventListener("mousedown", onMouseDown)
  }, [open])

  return (
    <div className="am-track-wrap" ref={wrapRef}>
      <button
        className="am-track-btn"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <TrackIcon icon={meta.icon} label={meta.label} />
        <span className="am-track-label">{meta.label}</span>
        <svg
          className={`am-track-chevron${open ? "is-open" : ""}`}
          width="10"
          height="10"
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

      {open && (
        <div className="am-track-panel" role="listbox">
          {TRACKS.map((t) => {
            const m = TRACK_META[t]
            const active = t === track
            return (
              <button
                key={t}
                role="option"
                aria-selected={active}
                className={`am-track-item${active ? "is-active" : ""}`}
                onClick={() => {
                  setTrack(t)
                  setOpen(false)
                }}
              >
                <TrackIcon icon={m.icon} label={m.label} />
                <span className="am-track-label">{m.label}</span>
                {active && (
                  <svg
                    className="am-track-check"
                    width="12"
                    height="12"
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
                )}
              </button>
            )
          })}
        </div>
      )}
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
