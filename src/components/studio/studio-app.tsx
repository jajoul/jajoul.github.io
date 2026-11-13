import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import {
  CardFace,
  ContactFace,
  PolaroidFace,
  PosterFace,
  SheetFace,
  TicketFace,
} from "@/components/studio/pieces";
import { ContactPanel, DeskPanel, StudioPanel, WorkPanel } from "@/components/studio/panels";
import {
  CANON,
  DEFAULT_FRAMES,
  DEFAULT_POLAROID,
  DEFAULT_PROFILE,
  DEFAULT_PROJECTS,
  FRAME_H,
  FRAME_W,
  PAGE_COUNT,
  layoutFor,
  loadDesk,
  monogram,
  padPage,
  saveDesk,
  type FrameShot,
  type PieceId,
  type PieceLayout,
  type Profile,
  type Project,
  type ViewId,
} from "@/lib/studio-data";

const NAV: { id: Exclude<ViewId, "desk">; label: string }[] = [
  { id: "index", label: "Index" },
  { id: "work", label: "Work" },
  { id: "studio", label: "Studio" },
  { id: "contact", label: "Contact" },
];

const PIECE_COPY: Record<PieceId, string> = {
  poster: "Plate seven",
  contact: "Contact sheet",
  card: "Studio card",
  polaroid: "Install week photograph",
  ticket: "Admit one ticket",
  sheet: "Install slip",
};

function readView(): ViewId {
  const hash = window.location.hash.replace("#", "");
  if (hash === "work" || hash === "studio" || hash === "contact" || hash === "desk") return hash;
  return "index";
}

function wideScreen() {
  return window.matchMedia("(min-width: 768px)").matches;
}

export function StudioApp() {
  const slotRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    id: PieceId;
    px: number;
    py: number;
    ox: number;
    oy: number;
    moved: boolean;
  } | null>(null);
  const [scale, setScale] = useState(1);
  const [view, setView] = useState<ViewId>("index");
  const [page, setPage] = useState(2);
  const [layout, setLayout] = useState<PieceLayout[]>(() => CANON.map((piece) => ({ ...piece })));
  const [dirty, setDirty] = useState(false);
  const [dragging, setDragging] = useState<PieceId | null>(null);
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [polaroid, setPolaroid] = useState<string | null>(null);
  const [frameOverrides, setFrameOverrides] = useState<(string | null)[]>(() =>
    DEFAULT_FRAMES.map(() => null),
  );
  const [ready, setReady] = useState(false);
  const scaleRef = useRef(1);
  scaleRef.current = scale;

  useEffect(() => {
    const saved = loadDesk();
    if (saved) {
      setProfile(saved.profile);
      setProjects(saved.projects);
      if (saved.layout) {
        setLayout(saved.layout);
        setDirty(true);
      }
      setPolaroid(saved.polaroid);
      setFrameOverrides(DEFAULT_FRAMES.map((_, index) => saved.frames[index] ?? null));
    }
    setView(readView());
    setReady(true);
    const onHash = () => setView(readView());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveDesk({
      profile,
      projects,
      layout: dirty ? layout : null,
      frames: frameOverrides.map((src) => src ?? ""),
      polaroid,
    });
  }, [ready, profile, projects, layout, dirty, frameOverrides, polaroid]);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;
    const apply = () => {
      if (!wideScreen()) {
        setScale(1);
        return;
      }
      const rect = slot.getBoundingClientRect();
      const next = Math.min(rect.width / FRAME_W, rect.height / FRAME_H);
      setScale(Number.isFinite(next) && next > 0 ? next : 1);
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(slot);
    window.addEventListener("resize", apply);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let locked = false;
    const onWheel = (event: WheelEvent) => {
      if (!wideScreen() || view !== "index" || dirty || locked) return;
      if (Math.abs(event.deltaY) < 8) return;
      event.preventDefault();
      locked = true;
      const dir = event.deltaY > 0 ? 1 : -1;
      setPage((current) => {
        const next = ((current - 1 + dir + PAGE_COUNT) % PAGE_COUNT) + 1;
        setLayout(layoutFor(next));
        return next;
      });
      window.setTimeout(() => {
        locked = false;
      }, 480);
    };
    frame.addEventListener("wheel", onWheel, { passive: false });
    return () => frame.removeEventListener("wheel", onWheel);
  }, [view, dirty]);

  function go(next: ViewId) {
    setView(next);
    const hash = next === "index" ? "" : `#${next}`;
    const url = `${window.location.pathname}${window.location.search}${hash}`;
    window.history.replaceState(null, "", url);
  }

  function bringToFront(id: PieceId) {
    setLayout((current) => {
      const max = Math.max(...current.map((piece) => piece.z));
      return current.map((piece) => (piece.id === id ? { ...piece, z: max + 1 } : piece));
    });
  }

  function nudge(id: PieceId, dx: number, dy: number) {
    setDirty(true);
    setLayout((current) =>
      current.map((piece) =>
        piece.id === id ? { ...piece, x: piece.x + dx, y: piece.y + dy } : piece,
      ),
    );
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>, id: PieceId) {
    if (!wideScreen() || event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const piece = layout.find((item) => item.id === id);
    if (!piece) return;
    dragRef.current = {
      id,
      px: event.clientX,
      py: event.clientY,
      ox: piece.x,
      oy: piece.y,
      moved: false,
    };
    setDragging(id);
    bringToFront(id);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.currentTarget.dataset.piece) return;
    const dx = (event.clientX - drag.px) / scaleRef.current;
    const dy = (event.clientY - drag.py) / scaleRef.current;
    if (!drag.moved && Math.hypot(dx, dy) < 3) return;
    drag.moved = true;
    setDirty(true);
    setLayout((current) =>
      current.map((piece) =>
        piece.id === drag.id ? { ...piece, x: drag.ox + dx, y: drag.oy + dy } : piece,
      ),
    );
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (dragRef.current?.id === event.currentTarget.dataset.piece) {
      dragRef.current = null;
      setDragging(null);
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>, id: PieceId) {
    if (!wideScreen()) return;
    const step = event.shiftKey ? 24 : 8;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      nudge(id, -step, 0);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      nudge(id, step, 0);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      nudge(id, 0, -step);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      nudge(id, 0, step);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      bringToFront(id);
    }
  }

  function shuffle() {
    setDirty(true);
    setLayout((current) => {
      const sprinkled = current.map((piece) => ({
        ...piece,
        x: Math.round(90 + Math.random() * 440),
        y: Math.round(16 + Math.random() * 240),
        r: Math.round((Math.random() - 0.5) * 20 * 10) / 10,
        roll: Math.random(),
      }));
      sprinkled.sort((a, b) => a.roll - b.roll);
      return sprinkled.map((piece, index) => ({
        id: piece.id,
        x: piece.x,
        y: piece.y,
        w: piece.w,
        h: piece.h,
        r: piece.r,
        z: index + 1,
      }));
    });
  }

  function resetPile() {
    setDirty(false);
    setPage(2);
    setLayout(CANON.map((piece) => ({ ...piece })));
  }

  const frames: FrameShot[] = DEFAULT_FRAMES.map((frame, index) => ({
    ...frame,
    src: frameOverrides[index] || frame.src,
  }));
  const mark = monogram(profile.name);
  const polaroidSrc = polaroid || DEFAULT_POLAROID;

  return (
    <div className="studio">
      <h1 className="sr">
        {profile.name}, {profile.discipline}
      </h1>
      <div className="frame-slot" ref={slotRef}>
        <div
          className="frame-sizer"
          style={{
            width: `calc(${FRAME_W}px * ${scale})`,
            height: `calc(${FRAME_H}px * ${scale})`,
          }}
        >
          <div
            className="frame"
            ref={frameRef}
            data-view={view}
            style={{ transform: `scale(${scale})` }}
          >
            <nav className="rail" aria-label="Studio">
              <p className="brand">{profile.name}</p>
              <p className="brand-sub">
                {profile.discipline},
                <br />
                {profile.place}
              </p>
              <div className="rail-nav">
                {NAV.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="nav-btn"
                    aria-current={view === item.id ? "page" : undefined}
                    onClick={() => go(item.id)}
                  >
                    <span className="dot" aria-hidden="true" />
                    {item.label}
                  </button>
                ))}
              </div>
            </nav>

            {layout.map((piece) => (
              <div
                key={piece.id}
                className={`piece piece-${piece.id}${dragging === piece.id ? " is-drag" : ""}`}
                data-piece={piece.id}
                role="group"
                tabIndex={0}
                aria-label={`${PIECE_COPY[piece.id]}. Drag to move, or press Enter to bring it forward.`}
                style={
                  {
                    "--x": `${piece.x}px`,
                    "--y": `${piece.y}px`,
                    "--w": `${piece.w}px`,
                    "--h": `${piece.h}px`,
                    "--r": `${piece.r}deg`,
                    zIndex: piece.z,
                  } as CSSProperties
                }
                onPointerDown={(event) => onPointerDown(event, piece.id)}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onKeyDown={(event) => onKeyDown(event, piece.id)}
              >
                {piece.id === "poster" ? <PosterFace profile={profile} /> : null}
                {piece.id === "contact" ? (
                  <ContactFace profile={profile} frames={frames} mark={mark} />
                ) : null}
                {piece.id === "card" ? <CardFace profile={profile} /> : null}
                {piece.id === "polaroid" ? <PolaroidFace profile={profile} src={polaroidSrc} /> : null}
                {piece.id === "ticket" ? <TicketFace profile={profile} /> : null}
                {piece.id === "sheet" ? <SheetFace /> : null}
              </div>
            ))}

            {view !== "index" ? (
              <div className="panel">
                {view === "work" ? <WorkPanel projects={projects} /> : null}
                {view === "studio" ? <StudioPanel profile={profile} onDesk={() => go("desk")} /> : null}
                {view === "contact" ? <ContactPanel profile={profile} /> : null}
                {view === "desk" ? (
                  <DeskPanel
                    profile={profile}
                    projects={projects}
                    onProfile={setProfile}
                    onProjects={setProjects}
                    onPolaroid={setPolaroid}
                    onFrame={(index, src) =>
                      setFrameOverrides((current) =>
                        current.map((item, itemIndex) => (itemIndex === index ? src : item)),
                      )
                    }
                    onResetLayout={resetPile}
                    onClose={() => go("index")}
                  />
                ) : null}
              </div>
            ) : null}

            <div className="meta-left">
              <p className="page-no">
                <span>{padPage(page)}</span>
                <span className="slash"> / {padPage(PAGE_COUNT)}</span>
              </p>
              {dirty ? (
                <button type="button" className="hint-btn" onClick={resetPile}>
                  Reset the pile
                </button>
              ) : (
                <p className="scroll-hint">Scroll to browse ↓</p>
              )}
              <p className="copy">© {new Date().getFullYear()}</p>
            </div>
            <p className="meta-right">{profile.years}</p>

            {view === "index" ? (
              <div className="tools">
                <button type="button" onClick={shuffle}>
                  Shuffle
                </button>
                <button type="button" onClick={resetPile}>
                  Reset
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
