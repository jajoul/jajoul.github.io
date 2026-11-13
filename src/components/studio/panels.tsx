import { useRef, useState } from "react";
import {
  clearDesk,
  DEFAULT_FRAMES,
  DEFAULT_PROFILE,
  DEFAULT_PROJECTS,
  fileToDataUrl,
  hrefFor,
  labelFor,
  monogram,
  type Profile,
  type Project,
  type ViewId,
} from "@/lib/studio-data";

type Mode = "slideshow" | "feed" | "grid";

export function WorkPanel({ projects }: { projects: Project[] }) {
  const [mode, setMode] = useState<Mode>("slideshow");
  const [index, setIndex] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);
  const safe = projects.length > 0 ? projects : DEFAULT_PROJECTS;
  const current = safe[index % safe.length] ?? safe[0];
  const opened = openId ? safe.find((project) => project.id === openId) : null;

  if (!current) {
    return (
      <div className="panel-sheet">
        <p className="empty">No systems on the wall yet. Add one from the desk.</p>
      </div>
    );
  }

  return (
    <div className="work-panel">
      <div className="work-bar">
        <p className="work-kicker">Work · {String(safe.length).padStart(2, "0")} systems</p>
        <div className="modes" role="group" aria-label="Work view">
          {(
            [
              ["slideshow", "Slideshow"],
              ["feed", "Feed"],
              ["grid", "Grid"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={mode === id}
              onClick={() => {
                setMode(id);
                setOpenId(null);
              }}
            >
              <span className="dot" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {opened ? (
        <CaseSheet
          project={opened}
          onBack={() => setOpenId(null)}
        />
      ) : mode === "slideshow" ? (
        <div className="slide">
          <CaseBody project={current} />
          <div className="slide-nav">
            <button
              type="button"
              onClick={() => setIndex((value) => (value - 1 + safe.length) % safe.length)}
            >
              Previous
            </button>
            <span>
              {current.number} / {String(safe.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => setIndex((value) => (value + 1) % safe.length)}
            >
              Next
            </button>
          </div>
        </div>
      ) : mode === "feed" ? (
        <ul className="feed">
          {safe.map((project) => (
            <li key={project.id}>
              <button type="button" className="feed-row" onClick={() => setOpenId(project.id)}>
                <span className="feed-no">{project.number}</span>
                <span>
                  <strong>{project.title}</strong>
                  <em>{project.summary}</em>
                </span>
                <span className="feed-year">{project.year}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="work-grid">
          {safe.map((project) => (
            <li key={project.id}>
              <button type="button" className="work-cell" onClick={() => setOpenId(project.id)}>
                <span className="cell-no">{project.number}</span>
                <span className="cell-title">{project.title}</span>
                <span className="cell-stack">{project.stack}</span>
                <span className="cell-year">{project.year}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CaseSheet({ project, onBack }: { project: Project; onBack: () => void }) {
  return (
    <article className="slide case-open">
      <button type="button" className="back" onClick={onBack}>
        All work
      </button>
      <CaseBody project={project} />
    </article>
  );
}

function CaseBody({ project }: { project: Project }) {
  return (
    <article className="case">
      <p className="case-no">{project.number}</p>
      <h2>{project.title}</h2>
      <p className="case-year">{project.year}</p>
      <p className="case-summary">{project.summary}</p>
      <p className="case-stack">{project.stack}</p>
      <p className="case-outcome">{project.outcome}</p>
    </article>
  );
}

export function StudioPanel({
  profile,
  onDesk,
}: {
  profile: Profile;
  onDesk: () => void;
}) {
  return (
    <article className="panel-sheet prose">
      <p className="eyebrow">Studio</p>
      <h2>The system and the screen.</h2>
      <p>
        Full-stack Django and Python. I design the model, the API, and the interface, then ship them as one
        thing — not a frontend waiting on a backend ticket.
      </p>
      <p>
        The index is the studio wall: a plate, a contact sheet, a ticket from a launch night. Drag a piece
        to move it. Scroll to browse the pile. Work holds the systems behind the prints.
      </p>
      <p className="stack-line">Django · Python · Postgres · Django REST · HTMX · Celery · Redis · Docker</p>
      <p className="quiet">
        Sample studies are standing in until you replace them. Your name, links, and photos stay in this
        browser.
      </p>
      <button type="button" className="text-link" onClick={onDesk}>
        Open the desk
      </button>
      <p className="quiet pages-note">
        GitHub Pages: this studio has no server. Push the repo and run the Pages workflow — it publishes a
        static snapshot at the site root. Put your real name on the prints before you do.
      </p>
    </article>
  );
}

export function ContactPanel({ profile }: { profile: Profile }) {
  const mark = monogram(profile.name);
  const links = [
    { label: "Email", value: profile.email, href: hrefFor(profile.email) },
    { label: "GitHub", value: labelFor(profile.github), href: hrefFor(profile.github) },
    { label: "LinkedIn", value: labelFor(profile.linkedin), href: hrefFor(profile.linkedin) },
  ];
  return (
    <div className="contact-layout">
      <article className="face card-face card-large">
        <p className="card-mark">{mark}</p>
        <div className="card-lines">
          <p>{profile.name}</p>
          <p>{profile.discipline}</p>
          <p>{profile.place} studio</p>
        </div>
      </article>
      <ul className="link-list">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href}>
              <span>{link.label}</span>
              <strong>{link.value}</strong>
            </a>
          </li>
        ))}
      </ul>
      <p className="quiet">No form. A static card, so the page can live on GitHub Pages.</p>
    </div>
  );
}

export function DeskPanel({
  profile,
  projects,
  onProfile,
  onProjects,
  onPolaroid,
  onFrame,
  onResetLayout,
  onClose,
}: {
  profile: Profile;
  projects: Project[];
  onProfile: (profile: Profile) => void;
  onProjects: (projects: Project[]) => void;
  onPolaroid: (src: string | null) => void;
  onFrame: (index: number, src: string | null) => void;
  onResetLayout: () => void;
  onClose: () => void;
}) {
  const [error, setError] = useState<string | null>(null);

  async function take(file: File | undefined, apply: (src: string) => void) {
    if (!file) return;
    try {
      setError(null);
      apply(await fileToDataUrl(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not read that image.");
    }
  }

  function patchProject(id: string, patch: Partial<Project>) {
    onProjects(projects.map((project) => (project.id === id ? { ...project, ...patch } : project)));
  }

  return (
    <div className="desk">
      <div className="work-bar">
        <p className="work-kicker">Desk · this browser only</p>
        <button type="button" className="text-link" onClick={onClose}>
          Back to the wall
        </button>
      </div>
      <p className="quiet">
        Rename the studio, swap the photographs, and edit the six studies. Nothing here is sent to a server.
      </p>
      {error ? <p className="form-error">{error}</p> : null}

      <div className="desk-grid">
        <Field label="Studio name" value={profile.name} onChange={(name) => onProfile({ ...profile, name })} />
        <Field
          label="Discipline"
          value={profile.discipline}
          onChange={(discipline) => onProfile({ ...profile, discipline })}
        />
        <Field label="Place line" value={profile.place} onChange={(place) => onProfile({ ...profile, place })} />
        <Field label="Email" value={profile.email} onChange={(email) => onProfile({ ...profile, email })} />
        <Field label="GitHub URL" value={profile.github} onChange={(github) => onProfile({ ...profile, github })} />
        <Field
          label="LinkedIn URL"
          value={profile.linkedin}
          onChange={(linkedin) => onProfile({ ...profile, linkedin })}
        />
        <Field
          label="Polaroid caption"
          value={profile.polaroidCaption}
          onChange={(polaroidCaption) => onProfile({ ...profile, polaroidCaption })}
        />
        <Field
          label="Plate line"
          value={profile.posterKicker}
          onChange={(posterKicker) => onProfile({ ...profile, posterKicker })}
        />
        <Field
          label="Plate date"
          value={profile.posterDate}
          onChange={(posterDate) => onProfile({ ...profile, posterDate })}
        />
        <Field
          label="Footer"
          value={profile.years}
          onChange={(years) => onProfile({ ...profile, years })}
        />
      </div>

      <div className="upload-row">
        <Upload label="Replace polaroid" onFile={(file) => void take(file, (src) => onPolaroid(src))} />
        <button type="button" className="text-link" onClick={() => onPolaroid(null)}>
          Use the lake
        </button>
        <button type="button" className="text-link" onClick={onResetLayout}>
          Reset the pile
        </button>
      </div>

      <div className="frame-uploads">
        {DEFAULT_FRAMES.map((frame, index) => (
          <Upload
            key={frame.n}
            label={`Frame ${frame.n}`}
            onFile={(file) => void take(file, (src) => onFrame(index, src))}
          />
        ))}
        <button
          type="button"
          className="text-link"
          onClick={() => DEFAULT_FRAMES.forEach((_, index) => onFrame(index, null))}
        >
          Restore contact sheet
        </button>
      </div>

      <div className="project-editor">
        {projects.map((project) => (
          <fieldset key={project.id}>
            <legend>
              {project.number} {project.title || "Untitled"}
            </legend>
            <Field label="Title" value={project.title} onChange={(title) => patchProject(project.id, { title })} />
            <Field label="Year" value={project.year} onChange={(year) => patchProject(project.id, { year })} />
            <Field label="Stack" value={project.stack} onChange={(stack) => patchProject(project.id, { stack })} />
            <Area
              label="Summary"
              value={project.summary}
              onChange={(summary) => patchProject(project.id, { summary })}
            />
            <Area
              label="Outcome"
              value={project.outcome}
              onChange={(outcome) => patchProject(project.id, { outcome })}
            />
          </fieldset>
        ))}
      </div>

      <div className="upload-row">
        <button
          type="button"
          className="text-link"
          onClick={() => {
            clearDesk();
            onProfile(DEFAULT_PROFILE);
            onProjects(DEFAULT_PROJECTS.map((project) => ({ ...project })));
            onPolaroid(null);
            DEFAULT_FRAMES.forEach((_, index) => onFrame(index, null));
            onResetLayout();
          }}
        >
          Restore the sample studio
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function Area({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <textarea rows={3} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function Upload({ label, onFile }: { label: string; onFile: (file: File | undefined) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <button type="button" className="text-link" onClick={() => ref.current?.click()}>
        {label}
      </button>
      <input
        ref={ref}
        className="file-input"
        type="file"
        accept="image/*"
        onChange={(event) => {
          onFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
    </>
  );
}

export function viewTitle(view: ViewId): string {
  if (view === "index") return "Index";
  if (view === "work") return "Work";
  if (view === "studio") return "Studio";
  if (view === "contact") return "Contact";
  return "Desk";
}
