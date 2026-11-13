import type { FrameShot, Profile } from "@/lib/studio-data";
import { monogram } from "@/lib/studio-data";

export function PosterFace({ profile }: { profile: Profile }) {
  return (
    <article className="face paper poster-face">
      <div className="poster-top">
        <span className="numero">
          N<span className="deg">°</span>
        </span>
        <span className="reg" aria-hidden="true" />
      </div>
      <p className="numeral" aria-hidden="true">
        7
      </p>
      <footer className="poster-foot">
        <span>{profile.posterKicker}</span>
        <span className="poster-date">{profile.posterDate}</span>
      </footer>
    </article>
  );
}

export function ContactFace({
  profile,
  frames,
  mark,
}: {
  profile: Profile;
  frames: FrameShot[];
  mark: string;
}) {
  return (
    <article className="face paper contact-face">
      <header className="contact-head">
        <span>
          {mark} · Contact sheet 03
        </span>
        <span>{profile.sheetPlace}</span>
        <span>{profile.sheetStock}</span>
      </header>
      <div className="frames">
        {frames.map((frame) => (
          <figure key={frame.n} className="film">
            <div className="film-img">
              <img src={frame.src} alt="" style={{ objectPosition: frame.pos }} />
              {frame.ring ? <span className="ring" aria-hidden="true" /> : null}
            </div>
            <figcaption>
              <span>{frame.n}</span>
              <span>{frame.f}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="sheet-note">{profile.sheetNote}</p>
    </article>
  );
}

export function CardFace({ profile }: { profile: Profile }) {
  const mark = monogram(profile.name);
  return (
    <article className="face card-face">
      <p className="card-mark">{mark}</p>
      <div className="card-lines">
        <p>{profile.name}</p>
        <p>{profile.discipline}</p>
        <p>{profile.place} studio</p>
      </div>
    </article>
  );
}

export function PolaroidFace({ profile, src }: { profile: Profile; src: string }) {
  return (
    <article className="face polaroid-face">
      <div className="polaroid-img">
        <img src={src} alt="Black and white lake between mountains, install week." />
      </div>
      <p className="polaroid-cap">{profile.polaroidCaption}</p>
    </article>
  );
}

export function TicketFace({ profile }: { profile: Profile }) {
  const mark = monogram(profile.name);
  return (
    <article className="face ticket-face">
      <div className="stub">
        <span>{mark}</span>
      </div>
      <div className="ticket-main">
        <h2 className="admit">Admit one</h2>
        <div className="ticket-meta">
          <p>
            <span>Opening night</span>
            <strong>{profile.ticketWhen}</strong>
          </p>
          <p>
            <span>Venue</span>
            <strong>{profile.ticketVenue}</strong>
          </p>
          <p>
            <span>Seat</span>
            <strong>{profile.ticketSeat}</strong>
          </p>
        </div>
      </div>
      <div className="barcode" aria-hidden="true">
        <Barcode />
        <p className="serial">0 8 7 1 1 2 4 1 0</p>
      </div>
    </article>
  );
}

export function SheetFace() {
  return (
    <article className="face paper sheet-face">
      <p>Roll 03 / 07 — Roll 7 install, document the hall before doors.</p>
    </article>
  );
}

function Barcode() {
  const bits = [2, 1, 3, 1, 2, 1, 1, 4, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 4, 1, 2, 1, 1, 3];
  let x = 0;
  const width = bits.reduce((sum, bit) => sum + bit, 0);
  const rects = bits.map((bit, index) => {
    const rect =
      index % 2 === 0 ? (
        <rect key={index} x={x} y="0" width={bit} height="48" />
      ) : null;
    x += bit;
    return rect;
  });
  return (
    <svg className="barcode-svg" viewBox={`0 0 ${width} 48`} role="img" aria-label="">
      {rects}
    </svg>
  );
}
