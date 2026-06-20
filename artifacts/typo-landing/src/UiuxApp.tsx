import { useEffect, useRef, useState, createContext, useContext } from "react";
import { loadUiuxContent, type UiuxContent } from "./uiuxContent";

// ─── Constants ────────────────────────────────────────────────────────────────
const PRIMARY = "#6366f1";     // Indigo (highlights, badges, labels)
const ACCENT = "#f59e0b";      // Amber/Gold (CTA button background)
const ACCENT_HOVER = "#d97706"; // Amber hover
const BG = "#0a0f1f";          // Slate background (HSL 225 50% 8%)
const CARD = "#111625";        // Card background (HSL 221 39% 11%)
const CARD2 = "#161e2e";       // Card 2 / Border base (HSL 221 39% 15%)
const DANGER = "#ef4444";
const SUCCESS = "#22c55e";
const WARNING = "#f59e0b";
const LINE = "#1c2536";        // Border line color
const TEXT_BASE = "#f8fafc";   // Bright foreground text (HSL 210 40% 98%)
const TEXT_BODY = "#cbd5e1";   // Readable body paragraphs (slate-300)
const TEXT_MUTED = "#94a3b8";  // Subtitles / metadata (slate-400)
const MONO = "'JetBrains Mono','SFMono-Regular',Consolas,monospace";
const NOE = "'Noe Display', Georgia, serif";         // H1, H2 headings
const SECTRA = "'GT Sectra', Georgia, serif";         // Subheadings, blockquotes, accent text
const BODY = "'Aeonik', 'Inter', sans-serif";         // Body / UI text

// ─── Context for dynamic content ──────────────────────────────────────────────
const UiuxContentContext = createContext<UiuxContent | null>(null);

function useUiuxContent() {
  const ctx = useContext(UiuxContentContext);
  return ctx || loadUiuxContent();
}

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeIn({ children, delay = 0, from = "bottom" }: {
  children: React.ReactNode; delay?: number; from?: "bottom" | "left" | "right";
}) {
  const { ref, inView } = useInView();
  const transform = from === "left" ? "translateX(-32px)" : from === "right" ? "translateX(32px)" : "translateY(28px)";
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : transform,
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function useCountdown() {
  const [time, setTime] = useState({ h: 23, m: 59, s: 59 });
  useEffect(() => {
    const base = Math.floor(Date.now() / 86400000) * 86400000;
    const tick = () => {
      const rem = 86400 - Math.floor((Date.now() - base) / 1000) % 86400;
      setTime({ h: Math.floor(rem / 3600), m: Math.floor((rem % 3600) / 60), s: rem % 60 });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ─── Reusable UI ──────────────────────────────────────────────────────────────
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: "inline-block", border: `1px solid ${PRIMARY}33`,
      borderRadius: 100, padding: "6px 18px", marginBottom: 24,
      fontFamily: MONO, fontSize: 11, letterSpacing: "0.18em",
      color: PRIMARY, textTransform: "uppercase", background: `${PRIMARY}15`,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: MONO, fontSize: 11, letterSpacing: "0.22em",
      color: PRIMARY, textTransform: "uppercase", marginBottom: 14,
      opacity: 0.9,
    }}>
      <span style={{ opacity: 0.5 }}>// </span>{children}
    </div>
  );
}

function H2({ children, center = true }: { children: React.ReactNode; center?: boolean }) {
  return (
    <h2 style={{
      fontFamily: NOE,
      fontSize: "clamp(28px, 4vw, 44px)",
      fontWeight: 700,
      lineHeight: 1.15,
      margin: "0 0 20px",
      color: TEXT_BASE,
      textAlign: center ? "center" : "left",
      letterSpacing: "-0.01em",
    }}>
      {children}
    </h2>
  );
}

function Divider() {
  return (
    <div style={{
      height: 1,
      background: `linear-gradient(90deg, transparent, ${LINE}, transparent)`,
      margin: "80px 0 0",
    }} />
  );
}

interface CtaProps { label: string; size?: "normal" | "large"; id?: string; }
function CtaButton({ label, size = "normal", id }: CtaProps) {
  const [hover, setHover] = useState(false);
  const py = size === "large" ? 20 : 17;
  return (
    <a
      id={id}
      href="#dang-ky"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById("dang-ky")?.scrollIntoView({ behavior: "smooth" });
      }}
      style={{
        display: "inline-block",
        background: hover ? ACCENT_HOVER : ACCENT,
        color: "#000000",
        border: "none",
        fontWeight: 800,
        fontSize: size === "large" ? 18 : 16,
        letterSpacing: "0.02em",
        padding: `${py}px 40px`,
        borderRadius: 14,
        textDecoration: "none",
        boxShadow: hover ? `0 0 64px -4px ${ACCENT}88` : `0 0 32px -8px ${ACCENT}44`,
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
        cursor: "pointer",
        textAlign: "center",
        minWidth: 260,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {label}
    </a>
  );
}

function PriceNote() {
  const content = useUiuxContent();
  return (
    <p style={{ fontSize: 13, color: TEXT_MUTED, marginTop: 10, fontFamily: MONO }}>
      <span style={{ textDecoration: "line-through" }}>{content.originalPrice} VNĐ</span>
      <span style={{ color: WARNING, marginLeft: 10, fontWeight: 700 }}>↓ Giảm 50% đợt ra mắt</span>
    </p>
  );
}

function XItem({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
      <span style={{ color: DANGER, fontWeight: 800, flexShrink: 0, marginTop: 2, fontSize: 16 }}>✕</span>
      <span style={{ fontSize: 17, lineHeight: 1.82, color: TEXT_BODY }}>{children}</span>
    </div>
  );
}

function CheckItem({ children, color = SUCCESS }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
      <span style={{ color, fontWeight: 800, flexShrink: 0, marginTop: 2, fontSize: 16 }}>✓</span>
      <span style={{ fontSize: 17, lineHeight: 1.82, color: TEXT_BODY }}>{children}</span>
    </div>
  );
}

function Sec({ children, style = {}, maxWidth = 860 }: { children: React.ReactNode; style?: React.CSSProperties; maxWidth?: number }) {
  return (
    <section style={{ maxWidth, margin: "0 auto", padding: "88px 20px 0", ...style }}>
      {children}
    </section>
  );
}

// ─── Registration Form ────────────────────────────────────────────────────────
function RegForm() {
  const content = useUiuxContent();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const currentUrl = window.location.href;
    const customerData = {
      name: form.name,
      phone: form.phone,
      email: "",
      url: currentUrl,
      campaign: "uiux_book",
    };
    localStorage.setItem("typo_customer", JSON.stringify(customerData));
    try {
      await fetch("/api/lead/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerData),
      });
    } catch { /* silent */ }
    window.location.href = "/checkout";
  };

  const fields = [
    { name: "name", label: "Họ và tên *", type: "text", placeholder: "Nguyễn Văn A" },
    { name: "phone", label: "Số điện thoại *", type: "tel", placeholder: "0912 345 678" },
  ];

  return (
    <form onSubmit={handle} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {fields.map((f) => (
        <div key={f.name}>
          <label htmlFor={`uiux-${f.name}`} style={{
            display: "block", fontSize: 14, fontWeight: 700,
            color: TEXT_BODY, marginBottom: 8, letterSpacing: "0.03em",
          }}>
            {f.label}
          </label>
          <input
            id={`uiux-${f.name}`}
            name={f.name}
            type={f.type}
            placeholder={f.placeholder}
            required
            value={form[f.name as keyof typeof form]}
            onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
            style={{
              width: "100%", background: CARD,
              border: `1.5px solid ${LINE}`, borderRadius: 10,
              padding: "15px 18px", color: TEXT_BASE, fontSize: 16,
              outline: "none", boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = PRIMARY; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = LINE; }}
          />
        </div>
      ))}
      <button
        type="submit"
        disabled={loading}
        id="uiux-cta-submit"
        style={{
          background: loading ? "#1e3a5f" : ACCENT,
          color: loading ? "#ffffff" : "#000000",
          border: "none",
          borderRadius: 14,
          padding: "20px 40px",
          fontSize: 17,
          fontWeight: 800,
          cursor: loading ? "not-allowed" : "pointer",
          letterSpacing: "0.03em",
          boxShadow: loading ? "none" : `0 0 40px -4px ${ACCENT}88`,
          marginTop: 8,
          opacity: loading ? 0.7 : 1,
          transition: "all 0.2s",
          minHeight: 48,
        }}
      >
        {loading ? "⏳ ĐANG XỬ LÝ..." : `🔒 XÁC NHẬN ĐẶT MUA SÁCH — ${content.price} VNĐ`}
      </button>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4 }}>
        <span style={{ fontSize: 14.5, color: TEXT_MUTED }}>🔒 Bảo mật thông tin & Thanh toán an toàn tuyệt đối</span>
      </div>
    </form>
  );
}


// ─── Countdown ────────────────────────────────────────────────────────────────
function Countdown() {
  const time = useCountdown();
  const pad = (n: number) => String(n).padStart(2, "0");
  const boxes = [
    { v: pad(time.h), l: "GIỜ" },
    { v: pad(time.m), l: "PHÚT" },
    { v: pad(time.s), l: "GIÂY" },
  ];
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center" }}>
      {boxes.reduce((acc, { v, l }, i) => {
        const box = (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{
              background: `${PRIMARY}15`, border: `1px solid ${PRIMARY}33`,
              borderRadius: 10, padding: "10px 16px", minWidth: 58,
              boxShadow: `0 0 20px -8px ${PRIMARY}44`,
            }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: PRIMARY, fontFamily: MONO, fontVariantNumeric: "tabular-nums" }}>{v}</span>
            </div>
            <span style={{ fontSize: 10, color: TEXT_MUTED, letterSpacing: "0.15em", fontFamily: MONO }}>{l}</span>
          </div>
        );
        if (i < 2) {
          return [...acc, box, <span key={`sep${i}`} style={{ fontSize: 24, fontWeight: 900, color: PRIMARY, marginBottom: 16 }}>:</span>];
        }
        return [...acc, box];
      }, [] as React.ReactNode[])}
    </div>
  );
}

// ─── Accordion Item ───────────────────────────────────────────────────────────
function AccordionItem({ title, sub, children, defaultOpen = false }: {
  title: string; sub: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{
      border: `1px solid ${open ? PRIMARY + "44" : LINE}`,
      borderRadius: 14, overflow: "hidden",
      transition: "border-color 0.3s",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", background: open ? `${PRIMARY}0a` : CARD,
          border: "none", padding: "22px 28px",
          textAlign: "left", cursor: "pointer",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          transition: "background 0.2s",
        }}
      >
        <div>
          <div style={{ fontWeight: 700, fontSize: 17, color: TEXT_BASE, marginBottom: 4 }}>{title}</div>
          <div style={{ fontSize: 12, color: PRIMARY, fontFamily: MONO, letterSpacing: "0.12em" }}>{sub}</div>
        </div>
        <span style={{
          color: PRIMARY, fontSize: 20, fontWeight: 700, flexShrink: 0, marginLeft: 16,
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.3s",
        }}>›</span>
      </button>
      <div style={{
        maxHeight: open ? 1000 : 0,
        overflow: "hidden",
        transition: "max-height 0.4s ease",
      }}>
        <div style={{ padding: "0 28px 24px", borderTop: `1px solid ${LINE}`, paddingTop: 20 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function UiuxApp() {
  const [content, setContent] = useState(loadUiuxContent);
  useEffect(() => {
    const handler = () => setContent(loadUiuxContent());
    window.addEventListener("uiux-content-updated", handler);
    return () => window.removeEventListener("uiux-content-updated", handler);
  }, []);

  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  const gridBg = `
    linear-gradient(${PRIMARY}06 1px, transparent 1px),
    linear-gradient(90deg, ${PRIMARY}06 1px, transparent 1px)
  `;

  return (
    <UiuxContentContext.Provider value={content}>
      <div style={{ background: BG, color: TEXT_BASE, fontFamily: BODY, minHeight: "100vh", overflowX: "hidden" }}>

      {/* ══════════════════════════════════════════════════
          SECTION 1: HERO
      ══════════════════════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden", padding: "72px 20px 0" }}>
        {/* Grid BG */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: gridBg,
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 0%, black 30%, transparent 100%)",
        }} />
        {/* Glow */}
        <div aria-hidden style={{
          position: "absolute", top: -200, left: "50%", transform: "translateX(-50%)",
          width: 800, height: 400,
          background: `radial-gradient(ellipse at 50% 50%, ${PRIMARY}18 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 60, alignItems: "center",
        }}
          className="hero-grid"
        >
          {/* LEFT: Copy */}
          <div style={{
            opacity: heroReady ? 1 : 0,
            transform: heroReady ? "none" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}>
            <Badge>{content.heroBadge}</Badge>

            <h1 style={{
              fontFamily: NOE, fontWeight: 700,
              fontSize: "clamp(36px, 5vw, 62px)",
              lineHeight: 1.05, letterSpacing: "-0.01em",
              color: "#ffffff", margin: "0 0 12px",
              textTransform: "uppercase",
            }}>
              {content.heroH1Line1}<br />
              <span style={{ color: PRIMARY }}>{content.heroH1Line2}</span>
            </h1>

            <p style={{
              fontFamily: SECTRA,
              fontSize: "clamp(19px, 2.2vw, 26px)", fontWeight: 400,
              fontStyle: "italic",
              color: "rgba(240,246,255,0.88)", lineHeight: 1.45, marginBottom: 16,
            }}>
              {content.heroSubheading}
            </p>

            <p style={{ fontSize: 16, color: TEXT_BODY, lineHeight: 1.8, marginBottom: 12, maxWidth: 500 }}>
              {content.heroBody}
            </p>

            <p style={{ fontSize: 15, color: TEXT_MUTED, fontStyle: "italic", marginBottom: 28, maxWidth: 480 }}>
              {content.heroBodyItalic}
            </p>

            <CtaButton label={`ĐẶT MUA SÁCH NGAY — ${content.price} VNĐ`} size="large" id="hero-cta" />
            <PriceNote />

            {/* Quick stats */}
            <div style={{
              display: "flex", gap: 24, marginTop: 32, flexWrap: "wrap",
            }}>
              {[
                { n: content.heroStat1n, l: content.heroStat1l },
                { n: content.heroStat2n, l: content.heroStat2l },
                { n: content.heroStat3n, l: content.heroStat3l },
              ].map((s) => (
                <div key={s.n}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: PRIMARY, fontFamily: MONO }}>{s.n}</div>
                  <div style={{ fontSize: 12, color: TEXT_MUTED, letterSpacing: "0.06em" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Book Mockup */}
          <div style={{
            position: "relative",
            opacity: heroReady ? 1 : 0,
            transform: heroReady ? "none" : "translateY(24px) scale(0.96)",
            transition: "opacity 0.85s ease 0.3s, transform 0.85s ease 0.3s",
            display: "flex", justifyContent: "center", alignItems: "center",
          }}>
            {/* Measurement labels decorations */}
            <div style={{ position: "absolute", top: "8%", right: "-10%", fontFamily: MONO, fontSize: 10, color: PRIMARY, opacity: 0.5 }}>
              8px grid →
            </div>
            <div style={{ position: "absolute", bottom: "15%", left: "-8%", fontFamily: MONO, fontSize: 10, color: PRIMARY, opacity: 0.5 }}>
              ← margin: 24px
            </div>
            <div style={{
              borderRadius: 20, overflow: "hidden",
              boxShadow: `0 40px 80px -20px ${PRIMARY}33, 0 0 0 1px ${PRIMARY}18`,
              transform: "perspective(800px) rotateY(-8deg) rotateX(3deg)",
              transition: "transform 0.4s ease",
              maxWidth: 440,
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "perspective(800px) rotateY(-8deg) rotateX(3deg)"; }}
            >
              <img
                src="/uiux-book-mockup.png"
                alt="Sách Giáo Khoa Thực Hành UI/UX"
                style={{ width: "100%", display: "block" }}
              />
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .hero-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════
          SECTION 2: ESTABLISHING PAIN
      ══════════════════════════════════════════════════ */}
      <Sec maxWidth={760}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <SectionLabel>{content.painLabel}</SectionLabel>
            <H2>{content.painHeading}<br />{content.painHeading2}</H2>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <blockquote style={{
            borderLeft: `3px solid ${DANGER}`, paddingLeft: 24, margin: "0 0 32px",
            fontFamily: SECTRA, fontStyle: "italic",
            fontSize: "clamp(18px, 2.2vw, 23px)", fontWeight: 400,
            color: "#e2e8f0", lineHeight: 1.7,
            background: `${DANGER}08`, borderRadius: "0 12px 12px 0",
            padding: "20px 20px 20px 24px",
          }}>
            {content.painBlockquote}
          </blockquote>
        </FadeIn>

        <FadeIn delay={140}>
          <p style={{ fontSize: 18, lineHeight: 1.85, color: TEXT_BODY, marginBottom: 28 }}>
            {content.painPara1}
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.85, color: TEXT_BODY, marginBottom: 32 }}>
            {content.painPara2}
          </p>

          <p style={{ fontSize: 14, fontWeight: 700, color: TEXT_BASE, marginBottom: 16, letterSpacing: "0.06em" }}>
            {content.painListHeading}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {content.painItems.map((item, i) => (
              <XItem key={i}>{item}</XItem>
            ))}
          </div>
        </FadeIn>
      </Sec>

      <Divider />

      {/* ══════════════════════════════════════════════════
          SECTION 3: CYCLE OF FAILING
      ══════════════════════════════════════════════════ */}
      <Sec maxWidth={800}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <SectionLabel>{content.cycleLabel}</SectionLabel>
            <H2>{content.cycleHeading}<br />{content.cycleHeading2}</H2>
            <p style={{ fontSize: 18, color: TEXT_BODY, maxWidth: 580, margin: "0 auto", lineHeight: 1.82 }}>
              {content.cycleSub}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {content.cycleFailItems.map((item, i) => (
              <div key={i} style={{
                background: CARD, border: `1px solid ${LINE}`,
                borderRadius: 12, padding: "20px 22px",
                display: "flex", gap: 16, alignItems: "flex-start",
              }}>
                <span style={{
                  background: `${DANGER}18`, color: DANGER,
                  fontFamily: MONO, fontSize: 11, fontWeight: 700,
                  padding: "3px 10px", borderRadius: 100, flexShrink: 0, marginTop: 2,
                  letterSpacing: "0.1em",
                }}>THẤT BẠI</span>
                <div>
                  <p style={{ fontSize: 16.5, color: TEXT_BASE, fontWeight: 600, marginBottom: 6, textDecoration: "line-through", opacity: 0.7 }}>{item.fail}</p>
                  <p style={{ fontSize: 16.5, color: TEXT_BODY, lineHeight: 1.8 }}>
                    <span style={{ color: DANGER }}>→ </span>{item.why}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 28, background: `${DANGER}0d`,
            border: `1px solid ${DANGER}33`, borderRadius: 14,
            padding: "22px 26px",
          }}>
            <p style={{ fontSize: 17.5, color: "#fca5a5", lineHeight: 1.75, fontStyle: "italic", fontWeight: 500 }}>
              {content.cycleConclusion}
            </p>
          </div>
        </FadeIn>
      </Sec>

      <Divider />

      {/* ══════════════════════════════════════════════════
          SECTION 4: THE DISCOVERY & INSIGHTS
      ══════════════════════════════════════════════════ */}
      <Sec maxWidth={900}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <SectionLabel>{content.discoveryLabel}</SectionLabel>
            <H2>{content.discoveryHeading}<br />{content.discoveryHeading2}</H2>
            <p style={{ fontFamily: SECTRA, fontStyle: "italic", fontSize: "clamp(17px, 2vw, 21px)", color: "rgba(240,246,255,0.75)", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              {content.discoverySub}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: 16, marginBottom: 44,
          }}>
            {content.discoveryLaws.map((item, i) => (
              <div key={i} style={{
                background: `linear-gradient(145deg, ${CARD}, ${CARD2})`,
                border: `1px solid ${PRIMARY}28`,
                borderRadius: 16, padding: "26px 22px",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = `0 16px 40px -8px ${PRIMARY}33`; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "none"; el.style.boxShadow = "none"; }}
              >
                <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 12, color: PRIMARY, marginBottom: 4, letterSpacing: "0.1em" }}>{item.law}</div>
                <div style={{ fontFamily: NOE, fontWeight: 700, fontSize: 15, color: TEXT_BASE, marginBottom: 10, lineHeight: 1.3 }}>{item.rule}</div>
                <p style={{ fontSize: 15, color: TEXT_BODY, lineHeight: 1.8, marginBottom: 12 }}>{item.desc}</p>
                <p style={{ fontSize: 13, color: PRIMARY, lineHeight: 1.65, fontFamily: MONO }}>{item.spec}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={140}>
          <div style={{
            background: `${WARNING}10`, border: `2px solid ${WARNING}50`,
            borderRadius: 14, padding: "24px 28px",
            display: "flex", gap: 16, alignItems: "flex-start",
          }}>
            <span style={{ fontSize: 22, flexShrink: 0, color: "#fde68a" }}>⚠</span>
            <p style={{ fontSize: 17.5, color: "#fde68a", lineHeight: 1.8, fontWeight: 500 }}>
              {content.discoveryWarning}
            </p>
          </div>
        </FadeIn>
      </Sec>

      <Divider />

      {/* ══════════════════════════════════════════════════
          SECTION 5: THE SOLUTION & BENEFITS
      ══════════════════════════════════════════════════ */}
      <Sec maxWidth={940}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <SectionLabel>{content.solutionLabel}</SectionLabel>
            <H2>{content.solutionHeading}<br />{content.solutionHeading2}</H2>
            <p style={{ fontFamily: SECTRA, fontStyle: "italic", fontSize: "clamp(17px, 2vw, 21px)", color: "rgba(240,246,255,0.75)", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              {content.solutionSub}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 14, marginBottom: 44,
          }}
            className="benefits-grid"
          >
            {content.solutionBenefits.map((b, i) => (
              <div key={i} style={{
                background: CARD, border: `1px solid ${SUCCESS}22`,
                borderRadius: 12, padding: "22px 24px",
                display: "flex", gap: 14, alignItems: "flex-start",
              }}>
                <span style={{ color: SUCCESS, fontSize: 20, flexShrink: 0, marginTop: 2 }}>✓</span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 16.5, color: TEXT_BASE, marginBottom: 6 }}>{b.title}</p>
                  <p style={{ fontSize: 16.5, color: TEXT_BODY, lineHeight: 1.82 }}>{b.body}</p>
                </div>
              </div>
            ))}
            <style>{`@media(max-width:640px){.benefits-grid{grid-template-columns:1fr!important}}`}</style>
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div style={{ textAlign: "center" }}>
            <CtaButton label={`ĐẶT MUA SÁCH NGAY — ${content.price} VNĐ`} size="large" />
            <PriceNote />
          </div>
        </FadeIn>
      </Sec>

      <Divider />

      {/* ══════════════════════════════════════════════════
          SECTION 6: ESSENTIAL SKILLS (2x2 grid)
      ══════════════════════════════════════════════════ */}
      <Sec maxWidth={960}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionLabel>{content.skillsLabel}</SectionLabel>
            <H2>{content.skillsHeading}<br />{content.skillsHeading2}</H2>
            <p style={{
              fontFamily: SECTRA, fontStyle: "italic",
              fontSize: "clamp(17px, 1.8vw, 21px)",
              color: "rgba(240,246,255,0.72)",
              maxWidth: 560, margin: "0 auto", lineHeight: 1.75,
            }}>
              {content.skillsSub}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20,
          }}
            className="skills-grid"
          >
            {content.skillsCards.map((s, i) => (
              <div key={i} style={{
                background: CARD,
                border: `1px solid ${LINE}`,
                borderRadius: 14,
                padding: "32px 28px 28px",
                overflow: "hidden",
                transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
                display: "flex",
                flexDirection: "column",
              }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(-3px)";
                  el.style.borderColor = `${PRIMARY}66`;
                  el.style.boxShadow = `0 12px 40px -8px ${PRIMARY}22`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "none";
                  el.style.borderColor = LINE;
                  el.style.boxShadow = "none";
                }}
              >
                {/* Header row */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                  <span style={{
                    fontFamily: MONO, fontSize: 11, fontWeight: 700,
                    color: PRIMARY, letterSpacing: "0.12em",
                    background: `${PRIMARY}15`,
                    padding: "4px 12px", borderRadius: 100,
                  }}>{s.n}</span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: NOE, fontWeight: 700,
                  fontSize: "clamp(18px, 1.8vw, 21px)",
                  lineHeight: 1.25, color: TEXT_BASE,
                  marginBottom: 10,
                }}>{s.title}</h3>

                {/* Rule pill */}
                <div style={{
                  display: "inline-block",
                  fontSize: 12.5, fontFamily: MONO,
                  color: "#7dd3fc", letterSpacing: "0.04em",
                  marginBottom: 16,
                }}>
                  → {s.rule}
                </div>

                {/* Description */}
                <p style={{
                  fontSize: 16.5, lineHeight: 1.85,
                  color: TEXT_BODY,
                  marginBottom: 20,
                  flexGrow: 1,
                }}>{s.desc}</p>

                {/* Warning footer */}
                <div style={{
                  borderTop: `1px solid ${LINE}`,
                  background: "rgba(239, 68, 68, 0.1)",
                  margin: "20px -28px -28px",
                  padding: "16px 28px",
                  display: "flex", gap: 8, alignItems: "flex-start",
                }}>
                  <span style={{ color: "#ef4444", fontSize: 14, flexShrink: 0 }}>⚠️</span>
                  <p style={{
                    fontSize: 14, lineHeight: 1.5,
                    color: "#f87171",
                    fontWeight: 500,
                  }}>{s.warn}</p>
                </div>
              </div>
            ))}
            <style>{`@media(max-width:640px){.skills-grid{grid-template-columns:1fr!important}}`}</style>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div style={{ textAlign: "center", marginTop: 52 }}>
            <CtaButton label={`SỞ HỮU BỘ KỸ NĂNG NGAY — ${content.price} VNĐ`} size="large" />
            <PriceNote />
          </div>
        </FadeIn>
      </Sec>

      <Divider />

      {/* ══════════════════════════════════════════════════
          SECTION 7: BONUSES (Dashed box)
      ══════════════════════════════════════════════════ */}
      <Sec maxWidth={820}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <SectionLabel>Truy cập ngay lập tức</SectionLabel>
            <H2>{content.bonusesHeading}</H2>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div style={{
            border: `2px dashed ${WARNING}55`,
            borderRadius: 20, padding: "36px 32px",
            background: `${WARNING}05`,
            boxShadow: `0 0 60px -20px ${WARNING}22`,
          }}>
            {/* Main product */}
            <div style={{
              background: `linear-gradient(135deg, ${CARD}, ${CARD2})`,
              border: `1px solid ${PRIMARY}44`, borderRadius: 14,
              padding: "24px 26px", marginBottom: 24,
              display: "flex", gap: 18, alignItems: "flex-start",
            }}>
              <span style={{ fontSize: 36, flexShrink: 0 }}>📚</span>
              <div>
                <div style={{ fontFamily: MONO, fontSize: 10, color: PRIMARY, letterSpacing: "0.15em", marginBottom: 6 }}>SẢN PHẨM CHÍNH</div>
                <h3 style={{ fontWeight: 800, fontSize: 18, color: TEXT_BASE, marginBottom: 8 }}>
                  Toàn Bộ "Sách Giáo Khoa Thực Hành UI/UX"
                </h3>
                <p style={{ fontSize: 16.5, color: TEXT_BODY, lineHeight: 1.82 }}>
                  8 chương kiến thức thực chiến dày dặn đập tan sự cảm tính và tái lập trình bộ não logic của một kiến trúc sư giao diện thực thụ.
                </p>
              </div>
            </div>

            <div style={{ textAlign: "center", margin: "20px 0", fontWeight: 700, fontSize: 16, color: WARNING }}>
              🎁 Kèm Theo 5 Quà Tặng Đặc Quyền Hỗ Trợ Thực Chiến 🎁
            </div>

            {/* Bonuses */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {content.bonusesItems.map((b, i) => (
                <div key={i} style={{
                  background: CARD, border: `1px solid ${LINE}`,
                  borderRadius: 12, padding: "18px 20px",
                  display: "flex", gap: 16, alignItems: "flex-start",
                }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{b.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16.5, color: TEXT_BASE, marginBottom: 6 }}>{b.title}</div>
                    <p style={{ fontSize: 16.5, color: TEXT_BODY, lineHeight: 1.8 }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Stack */}
            <div style={{
              marginTop: 28, paddingTop: 24, borderTop: `1px dashed ${WARNING}44`,
              textAlign: "center",
            }}>
              <p style={{ fontSize: 15, color: TEXT_MUTED, marginBottom: 4 }}>Tổng giá trị thực tế:</p>
              <p style={{ fontSize: 22, color: TEXT_MUTED, textDecoration: "line-through", fontFamily: MONO, marginBottom: 8 }}>
                {content.originalPrice} VNĐ
              </p>
              <p style={{ fontSize: 14, color: WARNING, marginBottom: 16 }}>Hôm nay chỉ với:</p>
              <p style={{ fontSize: "clamp(40px, 6vw, 56px)", fontWeight: 900, color: TEXT_BASE, fontFamily: MONO, lineHeight: 1, marginBottom: 20 }}>
                {content.price} <span style={{ fontSize: 22, fontWeight: 700, color: ACCENT }}>VNĐ</span>
              </p>
              <CtaButton label={`ĐẶT MUA SÁCH VÀ NHẬN TOÀN BỘ QUÀ TẶNG`} size="large" />
              <p style={{ fontSize: 13, color: TEXT_MUTED, marginTop: 10 }}>Khuyến mãi giới hạn — Số lượng in đợt 1 có hạn</p>
            </div>
          </div>
        </FadeIn>
      </Sec>

      <Divider />

      {/* ══════════════════════════════════════════════════
          SECTION 8: BEFORE / AFTER
      ══════════════════════════════════════════════════ */}
      <Sec maxWidth={940}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <SectionLabel>Sự lột xác về tư duy</SectionLabel>
            <H2>{content.beforeAfterHeading}<br />{content.beforeAfterHeading2}</H2>
            <p style={{ fontSize: 18, color: TEXT_BODY, maxWidth: 560, margin: "0 auto", lineHeight: 1.82 }}>
              Đừng để thói quen làm việc ngẫu hứng tiếp tục kìm hãm sự nghiệp và phá hoại các dự án của bạn.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20,
          }}
            className="ba-grid"
          >
            {/* BEFORE */}
            <div style={{
              background: `linear-gradient(135deg, #1a0a0a, #0d0505)`,
              border: `1px solid ${DANGER}33`, borderRadius: 16, padding: "32px 28px",
            }}>
              <div style={{
                fontFamily: MONO, fontSize: 12, fontWeight: 700,
                color: DANGER, letterSpacing: "0.15em", marginBottom: 24,
                textTransform: "uppercase",
              }}>
                ✕ Trước khi áp dụng
              </div>
              {content.beforeItems.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                  <span style={{ color: DANGER, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>—</span>
                  <span style={{ fontSize: 16.5, lineHeight: 1.8, color: TEXT_BODY }}>{item}</span>
                </div>
              ))}
            </div>

            {/* AFTER */}
            <div style={{
              background: `linear-gradient(135deg, #051a0f, #030d07)`,
              border: `1px solid ${SUCCESS}33`, borderRadius: 16, padding: "32px 28px",
            }}>
              <div style={{
                fontFamily: MONO, fontSize: 12, fontWeight: 700,
                color: SUCCESS, letterSpacing: "0.15em", marginBottom: 24,
                textTransform: "uppercase",
              }}>
                ✓ Sau khi làm chủ
              </div>
              {content.afterItems.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                  <span style={{ color: SUCCESS, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</span>
                  <span style={{ fontSize: 16, lineHeight: 1.7, color: "#cbd5e1" }}>{item}</span>
                </div>
              ))}
            </div>
            <style>{`@media(max-width:640px){.ba-grid{grid-template-columns:1fr!important}}`}</style>
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div style={{ textAlign: "center", marginTop: 44 }}>
            <CtaButton label={`BẮT ĐẦU SỰ CHUYỂN ĐỔI CỦA BẠN NGAY — ${content.price} VNĐ`} size="large" />
            <PriceNote />
          </div>
        </FadeIn>
      </Sec>

      <Divider />

      {/* ══════════════════════════════════════════════════
          SECTION 9: CURRICULUM (Accordion / Vertical Stepper)
      ══════════════════════════════════════════════════ */}
      <Sec maxWidth={800}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <SectionLabel>Lộ trình kiến trúc tư duy</SectionLabel>
            <H2>5 Cấu Phần Kiến Thức Xóa Bỏ Hoàn Toàn<br />Sự Cảm Tính Trong Thiết Kế</H2>
            <p style={{ fontSize: 18, color: TEXT_BODY, maxWidth: 560, margin: "0 auto", lineHeight: 1.82 }}>
              Mỗi cấu phần được thiết kế chuẩn xác để định hình lại bộ não logic của bạn thông qua các quy luật thực chứng toàn cầu.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              {
                title: "Cấu Phần 1: Nguyên Lý UX & Tâm Lý Học Hành Vi",
                sub: "Nền tảng tâm lý · Chương 1",
                items: [
                  "Áp dụng Fitt's Law để làm chủ vùng an toàn ngón tay cái trên thiết bị di động.",
                  "Vận dụng Miller's Law (Chunking) để bẻ nhỏ dữ liệu, tuyệt đối không làm quá tải trí nhớ ngắn hạn.",
                  "Sử dụng Hick's Law để giới hạn số lượng lựa chọn, đẩy nhanh tốc độ chốt sale.",
                ],
                desc: "Giải phẫu cơ chế hoạt động của não bộ — bộ nền tảng này giúp bạn thao túng kỳ vọng của người dùng trong khi loại bỏ các quyết định bốc đồng.",
                defaultOpen: true,
              },
              {
                title: "Cấu Phần 2: Logic Thiết Kế & Chủ Nghĩa Tối Giản",
                sub: "Hệ thống hóa tiêu chuẩn · Chương 2-3",
                items: [
                  "Thiết lập quy chuẩn Design System đồng bộ để chấm dứt sự ngẫu hứng và mâu thuẫn với Dev.",
                  "Kỹ thuật hiển thị lũy tiến (Progressive Disclosure) khéo léo giấu đi sự phức tạp, chỉ mở rộng khi cần.",
                  "Đo lường và tối thiểu hóa mọi nỗ lực nhận thức mà khách hàng phải bỏ ra trên từng màn hình.",
                ],
                desc: "Loại bỏ rác thị giác rườm rà — phương pháp này giúp bạn cắt giảm chi phí tương tác vật lý trong khi vẫn bảo toàn 100% công năng hệ thống.",
              },
              {
                title: "Cấu Phần 3: Hệ Thống Bố Cục & Màu Sắc Khoa Học",
                sub: "Toán học không gian · Chương 4-5",
                items: [
                  "Ứng dụng quy luật Proximity và không gian lưới 8px để tạo phân cấp thị giác trực quan.",
                  "Xây dựng điểm tụ thị giác (Focal Point) điều hướng luồng mắt người xem đi đúng quỹ đạo.",
                  "Tính toán hệ màu HSB độc lập và thiết lập tỷ lệ tương phản đạt chuẩn WCAG AA khắt khe.",
                ],
                desc: "Chuyển hóa mỹ thuật thành toán học có thể đo lường — hệ thống này giúp bạn tổ chức thông tin quét nhanh trong khi đảm bảo tiêu chuẩn quốc tế về tiếp cận.",
              },
              {
                title: "Cấu Phần 4: Kỹ Thuật UX Writing Tương Tác",
                sub: "Giao tiếp phi tiếp xúc · Chương 6",
                items: [
                  "Kỹ thuật Front-loading (Đưa giá trị cốt lõi lên đầu câu) để phục vụ hoàn hảo thói quen đọc lướt.",
                  "Cấu trúc hiển thị 3 tầng (Tiêu đề – Phụ chú – Chi tiết) đáp ứng mọi cấp độ nhu cầu phân tích.",
                  "Công thức viết thông báo lỗi tích cực, trực tiếp và tuyệt đối không dùng thuật ngữ đổ lỗi cho user.",
                ],
                desc: "Biến văn bản thành mũi tên điều hướng — nghệ thuật này giúp bạn truyền tải thông điệp sắc bén trong khi duy trì một trải nghiệm thấu cảm.",
              },
              {
                title: "Cấu Phần 5: Tối Ưu Điểm Chạm: Nút & Biểu Mẫu",
                sub: "Kiểm soát chuyển đổi · Chương 7-8",
                items: [
                  "Xây dựng 3 phân cấp nút bấm rõ rệt và khóa chặt vùng nhấn an toàn chuẩn 44-48px.",
                  "Áp dụng bố cục Form 1 cột dọc tuyến tính, nhãn nằm trên để luồng mắt chảy mượt mà nhất.",
                  "Thay thế Dropdown dài dòng bằng công cụ tối ưu hơn và thiết lập Xác thực lỗi (Validation) thời gian thực.",
                ],
                desc: "Nắm giữ vòi rồng sinh ra dòng tiền — nguyên tắc thực chiến này giúp bạn tạo ra luồng nhập liệu trơn tru trong khi triệt tiêu mọi sai sót ở bước cuối cùng.",
              },
            ].map((section, i) => (
              <AccordionItem
                key={i}
                title={section.title}
                sub={section.sub}
                defaultOpen={section.defaultOpen}
              >
                <p style={{ fontSize: 16.5, color: TEXT_BODY, lineHeight: 1.82, marginBottom: 16, fontStyle: "italic" }}>
                  {section.desc}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {section.items.map((item, j) => (
                    <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: PRIMARY, fontWeight: 700, flexShrink: 0, marginTop: 2, fontFamily: MONO }}>›</span>
                      <span style={{ fontSize: 16.5, color: TEXT_BODY, lineHeight: 1.8 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </AccordionItem>
            ))}
          </div>
        </FadeIn>
      </Sec>

      <Divider />

      {/* ══════════════════════════════════════════════════
          SECTION 10: INSTRUCTOR PROFILE
      ══════════════════════════════════════════════════ */}
      <Sec maxWidth={860}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <SectionLabel>{content.instructorLabel}</SectionLabel>
            <H2>{content.instructorHeading}</H2>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div style={{
            background: `linear-gradient(135deg, ${CARD}, ${CARD2})`,
            border: `1px solid ${PRIMARY}33`,
            borderRadius: 20, overflow: "hidden",
            display: "flex", gap: 0,
          }}
            className="instructor-card"
          >
            {/* Left: Photo placeholder */}
            <div style={{
              flexShrink: 0, width: 240,
              background: `linear-gradient(160deg, ${PRIMARY}15, ${CARD})`,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              padding: "40px 24px",
              borderRight: `1px solid ${PRIMARY}22`,
            }}>
              <div style={{
                width: 120, height: 120, borderRadius: "50%",
                background: `linear-gradient(135deg, ${PRIMARY}44, ${PRIMARY}11)`,
                border: `2px solid ${PRIMARY}55`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 40, marginBottom: 16,
                boxShadow: `0 0 30px -8px ${PRIMARY}88`,
              }}>
                👨‍💻
              </div>
              <div style={{
                background: WARNING, color: "#000",
                fontWeight: 800, fontSize: 11, fontFamily: MONO,
                padding: "6px 14px", borderRadius: 100,
                letterSpacing: "0.1em",
              }}>
                15+ NĂM KINH NGHIỆM
              </div>
            </div>

            {/* Right: Info */}
            <div style={{ flex: 1, padding: "36px 32px" }}>
              <h3 style={{ fontWeight: 900, fontSize: 26, color: TEXT_BASE, marginBottom: 6 }}>
                {content.instructorName}
              </h3>
              <p style={{ fontFamily: MONO, fontSize: 12, color: PRIMARY, letterSpacing: "0.1em", marginBottom: 24, lineHeight: 1.6 }}>
                {content.instructorTitle}
              </p>

              {content.instructorCredentials.map((item) => (
                <div key={item.label} style={{ marginBottom: 16 }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: PRIMARY, letterSpacing: "0.08em", display: "block", marginBottom: 4 }}>
                    {item.label}:
                  </span>
                  <p style={{ fontSize: 16.5, color: TEXT_BODY, lineHeight: 1.8 }}>{item.value}</p>
                </div>
              ))}
            </div>
            <style>{`@media(max-width:640px){.instructor-card{flex-direction:column!important}}`}</style>
          </div>
        </FadeIn>
      </Sec>

      <Divider />

      {/* ══════════════════════════════════════════════════
          SECTION 11: FINAL CTA + FORM
      ══════════════════════════════════════════════════ */}
      <section id="dang-ky" style={{ maxWidth: 760, margin: "88px auto 0", padding: "0 20px" }}>
        {/* Urgency bar */}
        <div style={{
          background: PRIMARY, padding: "14px 24px",
          textAlign: "center", borderRadius: "16px 16px 0 0",
        }}>
          <p style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#ffffff" }}>
            ⚠ CHẤM DỨT SỰ CẢM TÍNH — SỞ HỮU "SÁCH GIÁO KHOA THỰC HÀNH UI/UX" NGAY LÚC NÀY
          </p>
        </div>

        <FadeIn>
          <div style={{
            background: `linear-gradient(135deg, ${CARD}, ${CARD2})`,
            border: `1px solid ${PRIMARY}44`,
            borderRadius: "0 0 20px 20px",
            overflow: "hidden",
          }}>
            <div style={{ padding: "48px 40px" }}>
              <div style={{ textAlign: "center", marginBottom: 36 }}>
                <SectionLabel>Bước cuối cùng</SectionLabel>
                <H2>{content.ctaHeading}<br />{content.ctaHeading2}</H2>
                <p style={{ fontSize: 18, color: TEXT_BODY, lineHeight: 1.82, maxWidth: 540, margin: "0 auto 28px" }}>
                  {content.ctaSub}
                </p>

                {/* Countdown */}
                <div style={{ marginBottom: 32 }}>
                  <p style={{ fontSize: 12, color: TEXT_MUTED, marginBottom: 14, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: MONO }}>
                    ⏳ Ưu đãi kết thúc sau:
                  </p>
                  <Countdown />
                </div>
              </div>

              {/* Value stack */}
              <div style={{
                background: "#05080f", border: `1px solid ${LINE}`,
                borderRadius: 12, padding: "24px 22px", marginBottom: 32,
              }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: TEXT_MUTED, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: MONO }}>
                  Tổng giá trị bạn nhận được:
                </p>
                {[
                  { label: "Sách Giáo Khoa Thực Hành UI/UX (8 chương)", price: "300.000 VNĐ" },
                  { label: "Bộ Checklist WCAG AA", price: "50.000 VNĐ" },
                  { label: "Template Figma Lưới 8px", price: "50.000 VNĐ" },
                  { label: "Cẩm Nang Kích Thước Component", price: "40.000 VNĐ" },
                  { label: "Thư Viện UX Writing", price: "30.000 VNĐ" },
                  { label: "15 Tiêu Chí Tối Ưu Form", price: "30.000 VNĐ" },
                ].map(({ label, price }, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between",
                    gap: 12, marginBottom: 10, alignItems: "baseline",
                  }}>
                    <span style={{ fontSize: 16, color: TEXT_BODY }}>{label}</span>
                    <span style={{ fontSize: 15, color: TEXT_MUTED, fontFamily: MONO, flexShrink: 0 }}>{price}</span>
                  </div>
                ))}
                <div style={{ borderTop: `1px solid ${LINE}`, marginTop: 12, paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, color: TEXT_MUTED, textDecoration: "line-through", fontFamily: MONO }}>Tổng: {content.originalPrice} VNĐ</span>
                  <span style={{ fontSize: 20, fontWeight: 900, color: ACCENT, fontFamily: MONO }}>Hôm nay: {content.price} VNĐ</span>
                </div>
              </div>

              {/* Form */}
              <p style={{ fontWeight: 700, fontSize: 18, color: TEXT_BASE, marginBottom: 6, textAlign: "center" }}>
                Hoàn tất biểu mẫu dưới đây để giữ ngay mức giá ưu đãi!
              </p>
              <p style={{ fontSize: 14.5, color: TEXT_MUTED, marginBottom: 24, textAlign: "center" }}>
                Vui lòng nhập đúng thông tin để nhận sách và toàn bộ 5 tài liệu quà tặng
              </p>
              <RegForm />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════ */}
      <footer style={{
        textAlign: "center", padding: "64px 20px 32px",
        borderTop: `1px solid ${LINE}`, marginTop: 80,
      }}>
        <div style={{ fontFamily: NOE, fontSize: 22, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.01em" }}>
          SÁCH GIÁO KHOA<span style={{ color: PRIMARY }}>.</span>UI/UX
        </div>
        <p style={{ fontSize: 12, color: TEXT_MUTED, marginBottom: 24, fontFamily: MONO }}>
          Nền tảng Thiết kế Giao diện & Trải nghiệm Người dùng — fedu.vn
        </p>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
          {["Privacy Policy", "Terms & Conditions"].map((link) => (
            <a key={link} href="#" style={{ fontSize: 12, color: TEXT_MUTED, textDecoration: "none" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = PRIMARY; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = TEXT_MUTED; }}
            >
              {link}
            </a>
          ))}
        </div>
        <p style={{ fontSize: 11, color: TEXT_MUTED, fontFamily: MONO }}>
          COPYRIGHT 2026 | SÁCH GIÁO KHOA THỰC HÀNH UI/UX | FEDUDESIGN
        </p>
      </footer>
    </div>
    </UiuxContentContext.Provider>
  );
}
