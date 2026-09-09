import { createFileRoute } from "@tanstack/react-router";
import {
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "School Alumni Meet 2023–2024 | Invitation" },
      {
        name: "description",
        content:
          "A premium digital invitation to the School Alumni Meet for the batch of 2023–2024.",
      },
      { property: "og:title", content: "School Alumni Meet 2023–2024" },
      {
        property: "og:description",
        content: "Old friends. Shared memories. New beginnings. Your invitation awaits.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AlumniInvitation,
});

const highlights = [
  ["01", "Reconnect", "Meet the friends who made school unforgettable."],
  ["02", "Reminisce", "Relive the moments we still talk about."],
  ["03", "Meet teachers", "Reconnect with the mentors who shaped us."],
  ["04", "Celebrate", "Celebrate where our journey has taken us."],
  ["05", "Capture", "Create one more memory together."],
];

const eventDetails: Array<[string, string, string]> = [
  ["calendar", "Date", "Add Date Here"],
  ["clock", "Time", "Add Time Here"],
  ["pin", "Venue", "School Auditorium"],
  ["people", "Batch", "2023 – 2024"],
];

function LineIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    calendar: <><path d="M5 3v3M15 3v3M3 8h14M4 5h12a1 1 0 0 1 1 1v11H3V6a1 1 0 0 1 1-1Z"/><path d="M7 11h2M11 11h2M7 14h2"/></>,
    clock: <><circle cx="10" cy="10" r="7"/><path d="M10 6v4l3 2"/></>,
    pin: <><path d="M15.5 8.5c0 4-5.5 8.5-5.5 8.5S4.5 12.5 4.5 8.5a5.5 5.5 0 1 1 11 0Z"/><circle cx="10" cy="8.5" r="1.6"/></>,
    people: <><circle cx="7" cy="7" r="2.5"/><circle cx="14" cy="8" r="2"/><path d="M2.5 17c.4-3.2 2-5 4.5-5s4.1 1.8 4.5 5M12 13c2.8-.7 4.7.7 5.5 3"/></>,
  };
  return <svg viewBox="0 0 20 20" aria-hidden="true">{paths[name]}</svg>;
}

function AlumniInvitation() {
  const [introDone, setIntroDone] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const stageRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroDone(true), 2850);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.16 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const firstInput = dialogRef.current?.querySelector<HTMLInputElement>("input");
    firstInput?.focus();
    document.body.classList.add("modal-active");
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModalOpen(false);
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button, input"));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("modal-active");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalOpen]);

  const moveCard = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!stageRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    stageRef.current.style.setProperty("--tilt-x", `${-y * 1.4}deg`);
    stageRef.current.style.setProperty("--tilt-y", `${x * 1.8}deg`);
    stageRef.current.style.setProperty("--glow-x", `${(x + 0.5) * 100}%`);
    stageRef.current.style.setProperty("--glow-y", `${(y + 0.5) * 100}%`);
  };

  const resetCard = () => {
    stageRef.current?.style.setProperty("--tilt-x", "0deg");
    stageRef.current?.style.setProperty("--tilt-y", "0deg");
  };

  const addRipple = (event: ReactMouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    ripple.className = "ripple";
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    button.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 700);
    setModalOpen(true);
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors: Record<string, string> = {};
    if (!String(data.get("name") || "").trim()) nextErrors["name"] = "Please enter your full name.";
    const email = String(data.get("email") || "").trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors["email"] = "Please enter a valid email address.";
    if (!String(data.get("phone") || "").trim()) nextErrors["phone"] = "Please enter your phone number.";
    if (!data.get("attendance")) nextErrors["attendance"] = "Please select an attendance option.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  };

  return (
    <main className={`experience ${introDone ? "experience-ready" : ""}`}>
      <div className="ambient" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/></div>

      <section className="opening" aria-label="Invitation opening">
        <div className="opening-mark" aria-hidden="true">
          <span className="mark-roof"/><span className="mark-book"/><span className="mark-star">✦</span>
        </div>
        <p className="opening-line opening-line-one">The memories begin again</p>
        <h1 className="opening-title">School Alumni Meet</h1>
        <p className="opening-line opening-line-three">Batch 2023 – 2024</p>
      </section>

      <div className="invitation-wrap">
        <div className="folio-label" aria-hidden="true"><span>01</span><i/> Invitation <b>02 / RSVP</b></div>
        <div
          className="invitation-stage"
          ref={stageRef}
          onMouseMove={moveCard}
          onMouseLeave={resetCard}
        >
          <article className="invitation-card" aria-label="School Alumni Meet invitation">
            <section className="page left-page" aria-labelledby="event-title">
              <div className="page-frame" aria-hidden="true"/>
              <header className="left-header">
                <p className="eyebrow">An evening to remember</p>
                <h2 id="event-title"><span>School</span><span>Alumni</span><span>Meet</span></h2>
                <p className="batch">Batch 2023 – 2024</p>
              </header>

              <div className="memory-art" aria-label="Illustration of classmates returning to their school">
                <div className="art-halo"/>
                <svg viewBox="0 0 600 330" role="img" aria-label="A nostalgic school, graduation cap, books, and reunited classmates">
                  <defs>
                    <linearGradient id="schoolGlow" x1="0" y1="0" x2="1" y2="1"><stop stopColor="currentColor" stopOpacity=".08"/><stop offset="1" stopColor="currentColor" stopOpacity=".3"/></linearGradient>
                  </defs>
                  <path className="line-sun" d="M232 199a83 83 0 0 1 166 0"/>
                  <path className="school-fill" d="M207 195 300 122l93 73v82H207Z"/>
                  <path className="school-line" d="M187 195 300 106l113 89M207 195v82h186v-82M258 277v-48h84v48M231 215h25v25h-25zM344 215h25v25h-25zM286 170h28v27h-28zM300 106V74M300 74l42 16-42 16"/>
                  <path className="ground-line" d="M138 278h324"/>
                  <g className="friends">
                    <circle cx="151" cy="222" r="18"/><path d="M118 278c3-30 14-43 33-43s30 13 33 43M151 244v34"/>
                    <circle cx="449" cy="222" r="18"/><path d="M416 278c3-30 14-43 33-43s30 13 33 43M449 244v34"/>
                    <path d="m126 203 25-14 25 14-25 13Z M151 189v-8M424 203l25-14 25 14-25 13Z M449 189v-8"/>
                  </g>
                  <path className="friend-line" d="M178 248c18-17 29-20 46-22M422 248c-18-17-29-20-46-22"/>
                  <g className="sparkles"><path d="M127 134v20M117 144h20M465 148v18M456 157h18M176 92v13M169 98h14M432 95v12M426 101h12"/></g>
                </svg>
                <span className="float-note note-one">Class of ’24</span>
                <span className="float-note note-two">Remember this?</span>
              </div>

              <div className="tagline"><span>Old Friends.</span><span>Shared Memories.</span><span>New Beginnings.</span></div>
              <footer className="left-footer"><i/>Once classmates, always connected.<i/></footer>
            </section>

            <section className="page right-page" aria-labelledby="invitation-title">
              <div className="right-inner">
                <header className="right-header reveal">
                  <p className="eyebrow navy">You are invited</p>
                  <h2 id="invitation-title">Come back<br/>to where<br/><em>it all began</em></h2>
                  <p className="invitation-copy">Years may pass, but the memories we created together never fade. Come back to the place where our journey began, reconnect with old friends, meet our teachers, and celebrate the journey we started together.</p>
                </header>

                <section className="details-grid reveal" aria-label="Event information">
                  {eventDetails.map(([icon, label, value]) => (
                    <div className="detail" key={label}>
                      <span className="detail-icon"><LineIcon name={icon}/></span>
                      <div><small>{label}</small><strong>{value}</strong></div>
                    </div>
                  ))}
                </section>

                <section className="awaits reveal" aria-labelledby="awaits-title">
                  <div className="section-label"><span>What awaits you</span><i/></div>
                  <h3 id="awaits-title">Five reasons to return.</h3>
                  <div className="highlight-grid">
                    {highlights.map(([number, title, text], index) => (
                      <article className="highlight" style={{ "--order": index } as React.CSSProperties} key={number}>
                        <span>{number}</span><h4>{title}</h4><p>{text}</p>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="rsvp-strip reveal">
                  <div><small>Your seat is waiting</small><p>Let us save a place for you.</p></div>
                  <button className="rsvp-button" onClick={addRipple}><span>RSVP now</span><b aria-hidden="true">↗</b></button>
                </section>
              </div>
            </section>
          </article>
        </div>
      </div>


      {modalOpen && (
        <div className="modal-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setModalOpen(false)}>
          <div className="dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="rsvp-title">
            <button className="dialog-close" onClick={() => setModalOpen(false)} aria-label="Close RSVP form">×</button>
            {!submitted ? (
              <>
                <p className="eyebrow">Reserve your place</p>
                <h2 id="rsvp-title">Come make<br/><em>another memory.</em></h2>
                <p className="dialog-intro">A familiar room. Familiar faces. One unforgettable evening.</p>
                <form onSubmit={submitForm} noValidate>
                  <label>Full Name<input name="name" autoComplete="name" aria-invalid={Boolean(errors["name"])}/>{errors["name"] && <small>{errors["name"]}</small>}</label>
                  <div className="field-row">
                    <label>Email<input name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors["email"])}/>{errors["email"] && <small>{errors["email"]}</small>}</label>
                    <label>Phone Number<input name="phone" type="tel" autoComplete="tel" aria-invalid={Boolean(errors["phone"])}/>{errors["phone"] && <small>{errors["phone"]}</small>}</label>
                  </div>
                  <fieldset><legend>Attendance</legend><div className="attendance-options">
                    <label><input type="radio" name="attendance" value="yes"/><span>Yes, I’ll be there</span></label>
                    <label><input type="radio" name="attendance" value="no"/><span>Sorry, can’t make it</span></label>
                  </div>{errors["attendance"] && <small>{errors["attendance"]}</small>}</fieldset>
                  <button className="confirm-button" type="submit">Confirm attendance <span>→</span></button>
                </form>
              </>
            ) : (
              <div className="success" role="status">
                <div className="success-check"><svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="27"/><path d="m18 30 8 8 17-19"/></svg></div>
                <p className="eyebrow">Attendance confirmed</p>
                <h2 id="rsvp-title">You’re on<br/><em>the list!</em></h2>
                <p>Thank you for being part of our story.</p>
                <button className="confirm-button" onClick={() => setModalOpen(false)}>Return to invitation <span>→</span></button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}