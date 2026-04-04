// ============================================================================
// Wedding Website — React App
// All editable content lives in config.js. Components here consume it.
// ============================================================================

const { useState, useEffect, useRef, useMemo, useCallback } = React;
const CFG = window.WEDDING_CONFIG;

// ---------------------------------------------------------------------------
// Hook: fade/slide-in on scroll via IntersectionObserver
// ---------------------------------------------------------------------------
function useReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, ...options }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, as: Tag = "div", className = "" }) {
  const [ref, visible] = useReveal();
  const style = { transitionDelay: `${delay}ms` };
  return (
    <Tag
      ref={ref}
      style={style}
      className={`transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

// ---------------------------------------------------------------------------
// Header — sticky, smooth-scroll nav
// ---------------------------------------------------------------------------
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-md shadow-sm border-b border-sage/10"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-6xl mx-auto flex items-center justify-between px-5 md:px-8 h-16"
        aria-label="Primary"
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-serif text-lg md:text-xl tracking-wide text-forest hover:text-rose transition-colors"
          aria-label="Back to top"
        >
          {CFG.couple.one.charAt(0)} <span className="text-rose">&</span>{" "}
          {CFG.couple.two.charAt(0)}
        </button>

        <ul className="hidden md:flex items-center gap-7 text-sm uppercase tracking-[0.15em] text-forest/80">
          {CFG.nav.map((n) => (
            <li key={n.id}>
              <button
                onClick={() => scrollTo(n.id)}
                className="hover:text-rose transition-colors"
              >
                {n.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-forest p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-cream border-t border-sage/15">
          <ul className="flex flex-col py-2">
            {CFG.nav.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => scrollTo(n.id)}
                  className="w-full text-left px-6 py-3 text-forest uppercase text-sm tracking-[0.15em] hover:bg-sage/10"
                >
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

// ---------------------------------------------------------------------------
// Hero — big names, countdown, parallax
// ---------------------------------------------------------------------------
function Countdown() {
  const target = useMemo(() => new Date(CFG.weddingDate).getTime(), []);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  const cells = [
    { n: d, l: "Days" },
    { n: h, l: "Hours" },
    { n: m, l: "Minutes" },
    { n: s, l: "Seconds" },
  ];
  return (
    <div className="flex justify-center gap-3 md:gap-6 mt-10">
      {cells.map((c) => (
        <div
          key={c.l}
          className="bg-cream/70 backdrop-blur-sm border border-gold/40 rounded-lg px-4 md:px-6 py-3 md:py-4 min-w-[72px] md:min-w-[96px] shadow-sm"
        >
          <div className="font-serif text-2xl md:text-4xl text-forest tabular-nums">
            {String(c.n).padStart(2, "0")}
          </div>
          <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-forest/60 mt-1">
            {c.l}
          </div>
        </div>
      ))}
    </div>
  );
}

function Hero() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.3);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Layered, animated background */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${offset}px)`,
          background:
            "radial-gradient(ellipse at top, #f5e3de 0%, #faf6ef 45%, #e8efe3 100%)",
        }}
        aria-hidden="true"
      />
      {/* Decorative blobs */}
      <div
        className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-sage/20 blur-3xl animate-pulse-slow"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -right-10 w-96 h-96 rounded-full bg-rose/20 blur-3xl animate-pulse-slow"
        aria-hidden="true"
      />

      <div className="relative text-center px-6 animate-fade-in-up">
        <p className="uppercase tracking-[0.35em] text-sm md:text-base text-forest/60 mb-6">
          {CFG.hero.intro}
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl text-forest leading-[0.95]">
          {CFG.couple.one}
          <span className="block my-2 md:my-4 text-rose italic text-4xl sm:text-5xl md:text-7xl">
            &amp;
          </span>
          {CFG.couple.two}
        </h1>
        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="h-px w-12 md:w-20 bg-gold" />
          <p className="font-serif text-lg md:text-2xl text-forest tracking-wide">
            {CFG.weddingDateDisplay}
          </p>
          <span className="h-px w-12 md:w-20 bg-gold" />
        </div>
        <p className="mt-4 text-forest/70 italic text-base md:text-lg">
          {CFG.venue.name} · {CFG.venue.cityState}
        </p>
        <p className="mt-3 text-forest/60 max-w-md mx-auto">
          {CFG.hero.tagline}
        </p>
        <Countdown />
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-forest/50 animate-bounce-slow"
        aria-hidden="true"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section heading helper
// ---------------------------------------------------------------------------
function SectionHeading({ title, subtitle }) {
  return (
    <Reveal className="text-center max-w-2xl mx-auto mb-14">
      <h2 className="font-serif text-4xl md:text-5xl text-forest">{title}</h2>
      <div className="flex items-center justify-center gap-3 mt-4">
        <span className="h-px w-10 bg-gold" />
        <span className="text-gold">❦</span>
        <span className="h-px w-10 bg-gold" />
      </div>
      {subtitle && (
        <p className="mt-4 text-forest/65 text-base md:text-lg">{subtitle}</p>
      )}
    </Reveal>
  );
}

// ---------------------------------------------------------------------------
// Our Story — timeline
// ---------------------------------------------------------------------------
function Story() {
  const { heading, subheading, milestones } = CFG.story;
  return (
    <section id="story" className="py-24 md:py-32 bg-cream">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading title={heading} subtitle={subheading} />

        <div className="relative">
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gold/40 md:-translate-x-1/2"
            aria-hidden="true"
          />
          <ul className="space-y-12">
            {milestones.map((m, i) => {
              const leftSide = i % 2 === 0;
              return (
                <Reveal as="li" key={i} delay={i * 120}>
                  <div
                    className={`relative md:grid md:grid-cols-2 md:gap-12 items-center`}
                  >
                    <div
                      className={`pl-12 md:pl-0 ${
                        leftSide ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12"
                      }`}
                    >
                      <div className="text-xs uppercase tracking-[0.25em] text-rose font-medium mb-2">
                        {m.date}
                      </div>
                      <h3 className="font-serif text-2xl md:text-3xl text-forest mb-3">
                        {m.title}
                      </h3>
                      <p className="text-forest/70 leading-relaxed">{m.body}</p>
                    </div>
                    {/* Dot */}
                    <div
                      className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold border-4 border-cream shadow-md"
                      aria-hidden="true"
                    />
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Event Details
// ---------------------------------------------------------------------------
function Details() {
  const d = CFG.details;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    d.mapsQuery
  )}`;

  return (
    <section id="details" className="py-24 md:py-32 bg-pale-sage/30 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title={d.heading} subtitle={d.subheading} />

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-10">
          {[d.ceremony, d.reception].map((ev, i) => (
            <Reveal key={ev.title} delay={i * 150}>
              <div className="bg-cream rounded-2xl p-8 md:p-10 shadow-sm border border-sage/15 h-full">
                <div className="text-gold text-3xl mb-3">
                  {i === 0 ? "⛪" : "🥂"}
                </div>
                <h3 className="font-serif text-3xl text-forest">{ev.title}</h3>
                <p className="mt-3 text-rose font-medium tracking-wide">
                  {ev.time}
                </p>
                <p className="mt-2 text-forest/80">{ev.location}</p>
                <p className="text-forest/60 text-sm mt-1">{ev.address}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="bg-cream rounded-2xl overflow-hidden shadow-sm border border-sage/15">
            <div className="aspect-[16/7] w-full bg-sage/20">
              <iframe
                src={d.mapsEmbedSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Venue map"
              />
            </div>
            <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="font-serif text-xl text-forest">
                  {CFG.venue.name}
                </p>
                <p className="text-forest/60 text-sm">{CFG.venue.cityState}</p>
              </div>
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Get Directions →
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-8 bg-rose/10 border border-rose/25 rounded-2xl p-6 md:p-8 text-center">
            <h3 className="font-serif text-2xl text-forest">
              {d.dressCode.title}
            </h3>
            <p className="mt-2 text-forest/75 max-w-2xl mx-auto">
              {d.dressCode.body}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Wedding Party
// ---------------------------------------------------------------------------
function Party() {
  const p = CFG.party;
  return (
    <section id="party" className="py-24 md:py-32 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title={p.heading} subtitle={p.subheading} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {p.members.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 120}>
              <div className="group bg-warm-white rounded-2xl overflow-hidden border border-sage/15 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 h-full flex flex-col">
                <div
                  className="aspect-[4/5] bg-gradient-to-br from-sage/30 to-rose/20 flex items-center justify-center text-forest/40"
                  role="img"
                  aria-label={`Photo placeholder for ${m.name}`}
                >
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={`${m.name}, ${m.role}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
                    </svg>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-xs uppercase tracking-[0.2em] text-rose font-medium">
                    {m.role}
                  </div>
                  <h3 className="font-serif text-2xl text-forest mt-1">
                    {m.name}
                  </h3>
                  <p className="text-forest/70 text-sm mt-3 leading-relaxed">
                    {m.bio}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// RSVP Form
// ---------------------------------------------------------------------------
function RSVP() {
  const cfg = CFG.rsvp;
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    attending: "yes",
    guests: 1,
    meal: "chicken",
    dietary: "",
    song: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const endpoint = cfg.googleSheetsEndpoint || cfg.formspreeEndpoint;
      if (!endpoint) throw new Error("RSVP endpoint not configured.");

      const isSheets = !!cfg.googleSheetsEndpoint;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: isSheets
          ? { "Content-Type": "application/x-www-form-urlencoded" }
          : { "Content-Type": "application/json", Accept: "application/json" },
        body: isSheets
          ? new URLSearchParams(form).toString()
          : JSON.stringify(form),
      });
      if (!res.ok && !isSheets) throw new Error("Submission failed.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong.");
    }
  };

  return (
    <section id="rsvp" className="py-24 md:py-32 bg-pale-rose/30">
      <div className="max-w-2xl mx-auto px-6">
        <SectionHeading title={cfg.heading} subtitle={cfg.subheading} />

        {status === "success" ? (
          <Reveal>
            <div className="bg-cream border border-sage/25 rounded-2xl p-10 text-center shadow-sm">
              <div className="text-5xl mb-4">💌</div>
              <h3 className="font-serif text-3xl text-forest">
                Thank you{form.fullName ? `, ${form.fullName.split(" ")[0]}` : ""}!
              </h3>
              <p className="text-forest/70 mt-3">
                We've got your RSVP. We can't wait to celebrate with you.
              </p>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <form
              onSubmit={submit}
              className="bg-cream rounded-2xl p-6 md:p-10 shadow-sm border border-sage/15 space-y-5"
              noValidate
            >
              <Field label="Full Name" htmlFor="fullName">
                <input
                  id="fullName"
                  type="text"
                  required
                  value={form.fullName}
                  onChange={update("fullName")}
                  className="input"
                  autoComplete="name"
                />
              </Field>

              <Field label="Email" htmlFor="email">
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update("email")}
                  className="input"
                  autoComplete="email"
                />
              </Field>

              <Field label="Will you be attending?" htmlFor="attending">
                <select
                  id="attending"
                  value={form.attending}
                  onChange={update("attending")}
                  className="input"
                >
                  <option value="yes">Joyfully accepts</option>
                  <option value="no">Regretfully declines</option>
                </select>
              </Field>

              {form.attending === "yes" && (
                <>
                  <Field label="Number of guests (including you)" htmlFor="guests">
                    <input
                      id="guests"
                      type="number"
                      min="1"
                      max="10"
                      value={form.guests}
                      onChange={update("guests")}
                      className="input"
                    />
                  </Field>

                  <Field label="Meal preference" htmlFor="meal">
                    <select
                      id="meal"
                      value={form.meal}
                      onChange={update("meal")}
                      className="input"
                    >
                      <option value="chicken">Chicken</option>
                      <option value="fish">Fish</option>
                      <option value="vegetarian">Vegetarian</option>
                    </select>
                  </Field>

                  <Field
                    label="Dietary restrictions or allergies"
                    htmlFor="dietary"
                  >
                    <input
                      id="dietary"
                      type="text"
                      value={form.dietary}
                      onChange={update("dietary")}
                      className="input"
                      placeholder="Optional"
                    />
                  </Field>

                  <Field label="Song request" htmlFor="song">
                    <input
                      id="song"
                      type="text"
                      value={form.song}
                      onChange={update("song")}
                      className="input"
                      placeholder="What will get you on the dance floor?"
                    />
                  </Field>
                </>
              )}

              {status === "error" && (
                <p className="text-rose text-sm" role="alert">
                  {errorMsg} Please try again, or reach out to us directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary w-full justify-center disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send RSVP"}
              </button>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function Field({ label, htmlFor, children }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-xs uppercase tracking-[0.15em] text-forest/70 font-medium mb-2"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------
function Registry() {
  const r = CFG.registry;
  return (
    <section id="registry" className="py-24 md:py-32 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title={r.heading} subtitle={r.subheading} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {r.stores.map((s, i) => (
            <Reveal key={s.name} delay={i * 100}>
              <div className="bg-warm-white border border-sage/15 rounded-2xl p-6 text-center h-full flex flex-col hover:-translate-y-1 hover:shadow-md transition-all">
                <div className="text-5xl mb-3" aria-hidden="true">
                  {s.icon}
                </div>
                <h3 className="font-serif text-xl text-forest">{s.name}</h3>
                <p className="text-forest/60 text-sm mt-2 flex-1">{s.blurb}</p>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary mt-4 justify-center"
                >
                  Visit Registry
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Travel & Accommodations
// ---------------------------------------------------------------------------
function Travel() {
  const t = CFG.travel;
  return (
    <section id="travel" className="py-24 md:py-32 bg-pale-sage/30">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title={t.heading} subtitle={t.subheading} />

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {t.hotels.map((h, i) => (
            <Reveal key={h.name} delay={i * 120}>
              <div className="bg-cream border border-sage/15 rounded-2xl p-7 shadow-sm h-full flex flex-col">
                <div className="text-2xl mb-2">🏨</div>
                <h3 className="font-serif text-2xl text-forest">{h.name}</h3>
                <p className="text-forest/70 mt-2 flex-1">{h.details}</p>
                <p className="text-rose font-medium mt-3">{h.price}</p>
                <a
                  href={h.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary mt-4 self-start"
                >
                  Book a room →
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="bg-cream border border-sage/15 rounded-2xl p-7 h-full">
              <h3 className="font-serif text-2xl text-forest mb-3">
                Getting Here
              </h3>
              <p className="text-forest/75 mb-2">✈️ {t.directions.airport}</p>
              <p className="text-forest/75">🚗 {t.directions.driving}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="bg-cream border border-sage/15 rounded-2xl p-7 h-full">
              <h3 className="font-serif text-2xl text-forest mb-3">
                Things to Do
              </h3>
              <ul className="space-y-2 text-forest/75">
                {t.thingsToDo.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-gold">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// FAQ — accordion
// ---------------------------------------------------------------------------
function FAQ() {
  const f = CFG.faq;
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" className="py-24 md:py-32 bg-cream">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading title={f.heading} subtitle={f.subheading} />
        <div className="space-y-3">
          {f.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 60}>
                <div className="bg-warm-white border border-sage/15 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between text-left px-6 py-5"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="font-serif text-lg md:text-xl text-forest pr-4">
                      {item.q}
                    </span>
                    <span
                      className={`text-gold text-2xl transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  <div
                    id={`faq-${i}`}
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-forest/75 leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
function Footer() {
  return (
    <footer className="bg-forest text-cream py-14 text-center">
      <div className="max-w-3xl mx-auto px-6">
        <h3 className="font-serif text-4xl md:text-5xl">
          {CFG.couple.one}{" "}
          <span className="text-gold italic">&amp;</span>{" "}
          {CFG.couple.two}
        </h3>
        <p className="mt-3 uppercase tracking-[0.3em] text-sm text-cream/70">
          {CFG.weddingDateDisplay}
        </p>
        <p className="mt-6 font-serif text-xl text-gold">
          {CFG.couple.hashtag}
        </p>
        <p className="mt-8 text-cream/60 text-sm italic">
          {CFG.footer.madeWith}
        </p>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Story />
        <Details />
        <Party />
        <RSVP />
        <Registry />
        <Travel />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
