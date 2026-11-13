export type ViewId = "index" | "work" | "studio" | "contact" | "desk";

export type PieceId = "sheet" | "contact" | "poster" | "card" | "polaroid" | "ticket";

export type PieceLayout = {
  id: PieceId;
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
  z: number;
};

export type Project = {
  id: string;
  number: string;
  title: string;
  year: string;
  stack: string;
  summary: string;
  outcome: string;
};

export type Profile = {
  name: string;
  discipline: string;
  place: string;
  email: string;
  github: string;
  linkedin: string;
  polaroidCaption: string;
  posterKicker: string;
  posterDate: string;
  sheetPlace: string;
  sheetStock: string;
  sheetNote: string;
  ticketWhen: string;
  ticketVenue: string;
  ticketSeat: string;
  years: string;
};

export type FrameShot = {
  src: string;
  pos: string;
  n: string;
  f: string;
  ring?: boolean;
};

export const FRAME_W = 768;
export const FRAME_H = 432;
export const PAGE_COUNT = 14;

/** Measured against the 768×432 reference. Page 02 is this pile. */
export const CANON: PieceLayout[] = [
  { id: "sheet", x: 186, y: 326, w: 246, h: 46, r: -0.6, z: 1 },
  { id: "contact", x: 224, y: 24, w: 456, h: 304, r: 2.2, z: 2 },
  { id: "poster", x: 200, y: 82, w: 272, h: 268, r: -0.35, z: 3 },
  { id: "card", x: 574, y: 66, w: 164, h: 80, r: 7.2, z: 4 },
  { id: "polaroid", x: 92, y: 214, w: 154, h: 174, r: -8.2, z: 5 },
  { id: "ticket", x: 386, y: 294, w: 352, h: 100, r: -1.7, z: 6 },
];

export const DEFAULT_PROFILE: Profile = {
  name: "Nord & Stack",
  discipline: "Django & Python",
  place: "Full-stack",
  email: "hello@nordandstack.studio",
  github: "https://github.com/nordandstack",
  linkedin: "https://www.linkedin.com/in/nordandstack",
  polaroidCaption: "install week, may '24",
  posterKicker: "Ledgerline · Django REST",
  posterDate: "07/12",
  sheetPlace: "Build, May 2024",
  sheetStock: "Ilford HP5",
  sheetNote: "→ 12 for the poster, crop tight",
  ticketWhen: "07.11 · 19:00",
  ticketVenue: "Hall B",
  ticketSeat: "Row 4 · 12",
  years: "Selected work 2021—2026",
};

export const DEFAULT_FRAMES: FrameShot[] = [
  { src: "/prints/flowers.jpg", pos: "50% 28%", n: "08", f: "f/4" },
  { src: "/prints/flowers.jpg", pos: "62% 70%", n: "11", f: "f/8" },
  { src: "/prints/coast.jpg", pos: "58% 42%", n: "12", f: "f/11", ring: true },
  { src: "/prints/flowers.jpg", pos: "30% 48%", n: "14", f: "f/5.6" },
  { src: "/prints/field.jpg", pos: "50% 40%", n: "15", f: "f/8" },
  { src: "/prints/coast.jpg", pos: "40% 72%", n: "18", f: "f/16" },
];

export const DEFAULT_POLAROID = "/prints/lake.jpg";

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: "ledgerline",
    number: "01",
    title: "Ledgerline",
    year: "2024",
    stack: "Django · DRF · Postgres · Celery",
    summary:
      "Billing for small studios. Usage goes in, invoices come out, and Stripe webhooks stay idempotent.",
    outcome: "14k invoices reconciled without a second billing product.",
  },
  {
    id: "harbor",
    number: "02",
    title: "Harbor Queue",
    year: "2023",
    stack: "Django · HTMX · Postgres",
    summary:
      "A dock board for a cold store. Floor and office watch the same trucks, with different permissions.",
    outcome: "Intake fell from about 18 minutes to under 6.",
  },
  {
    id: "fieldnote",
    number: "03",
    title: "Fieldnote",
    year: "2024",
    stack: "Django · Postgres · object storage",
    summary:
      "A press CMS. Editors preview an issue and publish it without opening a ticket.",
    outcome: "One full issue cycle ran with no engineering in the loop.",
  },
  {
    id: "atelier",
    number: "04",
    title: "Atelier Gate",
    year: "2025",
    stack: "Django · Postgres",
    summary:
      "Client-portal login. Organizations, invitations, and sessions that rotate when a role changes.",
    outcome: "Six client teams, one login, no shared passwords.",
  },
  {
    id: "kiln",
    number: "05",
    title: "Kiln",
    year: "2022",
    stack: "Django · Celery · Redis",
    summary:
      "A desk over the worker fleet. Retries, dead letters, and a night view that stays quiet unless a job is actually stuck.",
    outcome: "Failed jobs live in one place instead of three logs.",
  },
  {
    id: "saltbox",
    number: "06",
    title: "Saltbox",
    year: "2021",
    stack: "Django · HTMX · Postgres",
    summary:
      "A storefront in the same app as the warehouse count. The cart is HTMX. Inventory is Postgres.",
    outcome: "One deploy and one database. No headless split.",
  },
];

const STORAGE_KEY = "nord-stack-desk-v1";

export type DeskSave = {
  profile: Profile;
  projects: Project[];
  layout: PieceLayout[] | null;
  frames: string[];
  polaroid: string | null;
};

export function monogram(name: string): string {
  const raw = name.trim();
  if (!raw) return "N&S";
  if (raw.includes("&")) {
    const [a, b] = raw.split("&").map((part) => part.trim());
    const left = a.replace(/[^A-Za-z]/g, "")[0] ?? "N";
    const right = (b ?? "").replace(/[^A-Za-z]/g, "")[0] ?? "S";
    return `${left}&${right}`.toUpperCase();
  }
  const bits = raw.split(/\s+/).filter(Boolean);
  const letters = bits
    .map((bit) => bit.replace(/[^A-Za-z]/g, "")[0] ?? "")
    .join("")
    .slice(0, 3);
  return (letters || "NS").toUpperCase();
}

export function padPage(page: number): string {
  return String(page).padStart(2, "0");
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function layoutFor(page: number): PieceLayout[] {
  if (page === 2) return CANON.map((piece) => ({ ...piece }));
  const rnd = mulberry32(page * 9973 + 11);
  const pieces = CANON.map((piece) => ({ ...piece }));
  const order = pieces.map((piece, index) => ({ piece, index, n: rnd() }));
  order.sort((a, b) => a.n - b.n);
  return order.map((entry, z) => {
    const base = entry.piece;
    return {
      ...base,
      x: Math.round(96 + rnd() * 430),
      y: Math.round(18 + rnd() * 230),
      r: Math.round((rnd() - 0.5) * 18 * 10) / 10,
      z: z + 1,
    };
  });
}

export function loadDesk(): DeskSave | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<DeskSave>;
    if (!parsed || typeof parsed !== "object") return null;
    return {
      profile: { ...DEFAULT_PROFILE, ...(parsed.profile ?? {}) },
      projects:
        Array.isArray(parsed.projects) && parsed.projects.length > 0
          ? parsed.projects.map((project, index) => ({
              ...DEFAULT_PROJECTS[index % DEFAULT_PROJECTS.length],
              ...project,
            }))
          : DEFAULT_PROJECTS,
      layout: Array.isArray(parsed.layout) ? sanitizeLayout(parsed.layout) : null,
      frames: Array.isArray(parsed.frames) ? parsed.frames.map(String) : [],
      polaroid: typeof parsed.polaroid === "string" ? parsed.polaroid : null,
    };
  } catch {
    return null;
  }
}

function sanitizeLayout(value: unknown[]): PieceLayout[] | null {
  const ids: PieceId[] = ["sheet", "contact", "poster", "card", "polaroid", "ticket"];
  const next = CANON.map((piece) => ({ ...piece }));
  let seen = 0;
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const row = item as Partial<PieceLayout>;
    if (!row.id || !ids.includes(row.id)) continue;
    const target = next.find((piece) => piece.id === row.id);
    if (!target) continue;
    if (typeof row.x === "number") target.x = row.x;
    if (typeof row.y === "number") target.y = row.y;
    if (typeof row.r === "number") target.r = row.r;
    if (typeof row.z === "number") target.z = row.z;
    seen += 1;
  }
  return seen > 0 ? next : null;
}

export function saveDesk(data: DeskSave) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearDesk() {
  window.localStorage.removeItem(STORAGE_KEY);
}

export async function fileToDataUrl(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const max = 1100;
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not read that image.");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.72);
}

export function hrefFor(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "#";
  if (trimmed.startsWith("mailto:") || trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  if (trimmed.includes("@") && !trimmed.includes("/")) return `mailto:${trimmed}`;
  return `https://${trimmed.replace(/^\/\//, "")}`;
}

export function labelFor(value: string): string {
  return value
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/^mailto:/, "")
    .replace(/\/$/, "");
}
