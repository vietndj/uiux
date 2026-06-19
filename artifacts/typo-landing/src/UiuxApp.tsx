import { useEffect, useRef, useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const PRICE = "249.000";
const ORIGINAL_PRICE = "500.000";
const ACCENT = "#3B82F6"; // Electric blue
const ACCENT_HOVER = "#2563EB";
const BG = "#07090f";
const CARD = "#0d1117";
const CARD2 = "#111827";
const DANGER = "#ef4444";
const SUCCESS = "#22c55e";
const WARNING = "#f59e0b";
const LINE = "#1e2a3a";
const TEXT_BASE = "#f0f6ff";
const TEXT_BODY = "#94a3b8";
const TEXT_MUTED = "#4a5568";
const MONO = "'JetBrains Mono','SFMono-Regular',Consolas,monospace";
const SANS = "'Inter','Segoe UI',system-ui,sans-serif";

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
      display: "inline-block", border: `1px solid ${ACCENT}55`,
      borderRadius: 100, padding: "6px 18px", marginBottom: 24,
      fontFamily: MONO, fontSize: 11, letterSpacing: "0.18em",
      color: ACCENT, textTransform: "uppercase", background: `${ACCENT}0d`,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: MONO, fontSize: 11, letterSpacing: "0.22em",
      color: ACCENT, textTransform: "uppercase", marginBottom: 14,
      opacity: 0.9,
    }}>
      <span style={{ opacity: 0.5 }}>// </span>{children}
    </div>
  );
}

function H2({ children, center = true }: { children: React.ReactNode; center?: boolean }) {
  return (
    <h2 style={{
      fontFamily: SANS,
      fontSize: "clamp(28px, 4vw, 44px)",
      fontWeight: 800,
      lineHeight: 1.15,
      margin: "0 0 20px",
      color: TEXT_BASE,
      textAlign: center ? "center" : "left",
      letterSpacing: "-0.02em",
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
        color: "#fff",
        border: "none",
        fontWeight: 800,
        fontSize: size === "large" ? 18 : 16,
        letterSpacing: "0.02em",
        padding: `${py}px 40px`,
        borderRadius: 14,
        textDecoration: "none",
        boxShadow: hover ? `0 0 64px -4px ${ACCENT}aa` : `0 0 32px -8px ${ACCENT}88`,
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
  return (
    <p style={{ fontSize: 13, color: TEXT_MUTED, marginTop: 10, fontFamily: MONO }}>
      <span style={{ textDecoration: "line-through" }}>{ORIGINAL_PRICE} VNĐ</span>
      <span style={{ color: WARNING, marginLeft: 10, fontWeight: 700 }}>↓ Giảm 50% đợt ra mắt</span>
    </p>
  );
}

function XItem({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
      <span style={{ color: DANGER, fontWeight: 800, flexShrink: 0, marginTop: 2, fontSize: 16 }}>✕</span>
      <span style={{ fontSize: 15, lineHeight: 1.7, color: TEXT_BODY }}>{children}</span>
    </div>
  );
}

function CheckItem({ children, color = SUCCESS }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
      <span style={{ color, fontWeight: 800, flexShrink: 0, marginTop: 2, fontSize: 16 }}>✓</span>
      <span style={{ fontSize: 15, lineHeight: 1.7, color: TEXT_BODY }}>{children}</span>
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
            display: "block", fontSize: 13, fontWeight: 700,
            color: TEXT_BODY, marginBottom: 8, letterSpacing: "0.04em",
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
              width: "100%", background: "#080c14",
              border: `1.5px solid ${LINE}`, borderRadius: 10,
              padding: "15px 18px", color: TEXT_BASE, fontSize: 16,
              outline: "none", boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = ACCENT; }}
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
          color: "#fff",
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
        {loading ? "⏳ ĐANG XỬ LÝ..." : `🔒 XÁC NHẬN ĐẶT MUA SÁCH — ${PRICE} VNĐ`}
      </button>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4 }}>
        <span style={{ fontSize: 13, color: TEXT_MUTED }}>🔒 Bảo mật thông tin & Thanh toán an toàn tuyệt đối</span>
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
              background: CARD, border: `1px solid ${ACCENT}33`,
              borderRadius: 10, padding: "10px 16px", minWidth: 58,
              boxShadow: `0 0 20px -8px ${ACCENT}88`,
            }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: ACCENT, fontFamily: MONO, fontVariantNumeric: "tabular-nums" }}>{v}</span>
            </div>
            <span style={{ fontSize: 10, color: TEXT_MUTED, letterSpacing: "0.15em", fontFamily: MONO }}>{l}</span>
          </div>
        );
        if (i < 2) {
          return [...acc, box, <span key={`sep${i}`} style={{ fontSize: 24, fontWeight: 900, color: ACCENT, marginBottom: 16 }}>:</span>];
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
      border: `1px solid ${open ? ACCENT + "44" : LINE}`,
      borderRadius: 14, overflow: "hidden",
      transition: "border-color 0.3s",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", background: open ? `${ACCENT}0a` : CARD,
          border: "none", padding: "22px 28px",
          textAlign: "left", cursor: "pointer",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          transition: "background 0.2s",
        }}
      >
        <div>
          <div style={{ fontWeight: 700, fontSize: 17, color: TEXT_BASE, marginBottom: 4 }}>{title}</div>
          <div style={{ fontSize: 12, color: ACCENT, fontFamily: MONO, letterSpacing: "0.12em" }}>{sub}</div>
        </div>
        <span style={{
          color: ACCENT, fontSize: 20, fontWeight: 700, flexShrink: 0, marginLeft: 16,
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
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  const gridBg = `
    linear-gradient(${ACCENT}06 1px, transparent 1px),
    linear-gradient(90deg, ${ACCENT}06 1px, transparent 1px)
  `;

  return (
    <div style={{ background: BG, color: TEXT_BASE, fontFamily: SANS, minHeight: "100vh", overflowX: "hidden" }}>

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
          background: `radial-gradient(ellipse at 50% 50%, ${ACCENT}18 0%, transparent 70%)`,
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
            <Badge>Đúc kết từ 15 năm thực chiến · FPT Arena</Badge>

            <h1 style={{
              fontFamily: SANS, fontWeight: 900,
              fontSize: "clamp(32px, 4.5vw, 54px)",
              lineHeight: 1.1, letterSpacing: "-0.03em",
              color: "#ffffff", margin: "0 0 12px",
              textTransform: "uppercase",
            }}>
              KHOA HỌC HÓA<br />
              <span style={{ color: ACCENT }}>SỰ SÁNG TẠO</span>
            </h1>

            <p style={{
              fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 600,
              color: TEXT_BASE, lineHeight: 1.4, marginBottom: 16,
            }}>
              Chấm Dứt Kỷ Nguyên Thiết Kế Cảm Tính
            </p>

            <p style={{ fontSize: 16, color: TEXT_BODY, lineHeight: 1.8, marginBottom: 12, maxWidth: 500 }}>
              Hệ Thống Hóa Tư Duy Logic UI/UX Bài Bản Và Tự Tin Bảo Vệ Mọi Quyết Định Thiết Kế Bằng Khoa Học Hành Vi Chỉ Trong 30 Ngày
            </p>

            <p style={{ fontSize: 13, color: TEXT_MUTED, fontStyle: "italic", marginBottom: 28, maxWidth: 480 }}>
              (ngay cả khi bạn từng liên tục thất bại vì chỉ biết sao chép rập khuôn từ Dribbble mà không hiểu bản chất cấu trúc thông tin)
            </p>

            <CtaButton label={`ĐẶT MUA SÁCH NGAY — ${PRICE} VNĐ`} size="large" id="hero-cta" />
            <PriceNote />

            {/* Quick stats */}
            <div style={{
              display: "flex", gap: 24, marginTop: 32, flexWrap: "wrap",
            }}>
              {[
                { n: "15+", l: "Năm kinh nghiệm" },
                { n: "8", l: "Chương thực chiến" },
                { n: "5", l: "Bonus độc quyền" },
              ].map((s) => (
                <div key={s.n}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: ACCENT, fontFamily: MONO }}>{s.n}</div>
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
            <div style={{ position: "absolute", top: "8%", right: "-10%", fontFamily: MONO, fontSize: 10, color: ACCENT, opacity: 0.5 }}>
              8px grid →
            </div>
            <div style={{ position: "absolute", bottom: "15%", left: "-8%", fontFamily: MONO, fontSize: 10, color: ACCENT, opacity: 0.5 }}>
              ← margin: 24px
            </div>
            <div style={{
              borderRadius: 20, overflow: "hidden",
              boxShadow: `0 40px 80px -20px ${ACCENT}33, 0 0 0 1px ${ACCENT}18`,
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
            <SectionLabel>Nỗi đau thực tế của người làm nghề</SectionLabel>
            <H2>Hệ Thống Quy Chuẩn Chuyển Hóa Sự Hoang Mang<br />Thành Khả Năng Lập Luận Sắc Bén</H2>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <blockquote style={{
            borderLeft: `3px solid ${DANGER}`, paddingLeft: 24, margin: "0 0 32px",
            fontStyle: "italic", fontSize: "clamp(17px, 2vw, 21px)",
            color: "#e2e8f0", lineHeight: 1.7,
            background: `${DANGER}08`, borderRadius: "0 12px 12px 0",
            padding: "20px 20px 20px 24px",
          }}>
            "Tại sao em lại đặt cái nút ở đây? Kích thước và khoảng cách này dựa trên cơ sở nào?"
          </blockquote>
        </FadeIn>

        <FadeIn delay={140}>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: TEXT_BODY, marginBottom: 28 }}>
            Và bạn hoàn toàn đứng hình vì trong đầu chỉ có một câu trả lời duy nhất: <strong style={{ color: TEXT_BASE }}>"Vì em thấy nó đẹp."</strong>
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: TEXT_BODY, marginBottom: 32 }}>
            Nếu bạn đang làm việc trong ngành phát triển sản phẩm số, bạn không lạ gì với cảm giác "thiết kế bằng niềm tin". Thiết kế không dựa trên tâm lý học hành vi mà chỉ thuần trang trí bề ngoài chính là nguyên nhân trực tiếp giết chết trải nghiệm người dùng.
          </p>

          <p style={{ fontSize: 14, fontWeight: 700, color: TEXT_BASE, marginBottom: 16, letterSpacing: "0.06em" }}>
            CUỘC VẬT LỘN HÀNG NGÀY CỦA BẠN VỚI CÁC DỰ ÁN:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <XItem>Hoang mang, thiếu tự tin và không có bộ quy chuẩn "cầm tay chỉ việc" nào (như lưới 8px, nút 44-48px) để lập luận bảo vệ bản vẽ trước sếp.</XItem>
            <XItem><strong>(Đối với FE Dev):</strong> Tuyệt vọng khi phải hiện thực hóa những file thiết kế thiếu tính hệ thống, màu sắc lộn xộn, không tuân thủ bất kỳ quy tắc nào.</XItem>
            <XItem><strong>(Đối với PM/BA):</strong> Đau đầu nhìn tỷ lệ chuyển đổi (Conversion Rate) sụt giảm vì giao diện rườm rà ép người dùng phải chịu đựng sự quá tải.</XItem>
            <XItem>Bế tắc trong việc thiết kế biểu mẫu (Form) khiến người dùng ức chế và từ bỏ thao tác ngay tại bước thanh toán.</XItem>
            <XItem>Tiêu tốn hàng chục giờ đồng hồ sao chép các mẫu UI trên Behance một cách vô thức mà không hiểu luồng thông tin ẩn bên dưới.</XItem>
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
            <SectionLabel>Không phải lỗi của bạn</SectionLabel>
            <H2>Vòng Lặp Bế Tắc Của Việc "Trang Trí"<br />Thay Vì "Thiết Kế Trải Nghiệm"</H2>
            <p style={{ fontSize: 16, color: TEXT_BODY, maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
              Tôi biết bạn đã thử làm theo mọi thứ bề nổi mà các diễn đàn mạng khuyên bảo:
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { fail: "Sao chép toàn bộ giao diện từ các shot top-trending trên Dribbble", why: "Thất bại vì Dribbble chỉ là bản trình diễn thị giác, bỏ qua hoàn toàn chi phí tương tác thực tế của người dùng." },
              { fail: "Cố gắng nhồi nhét mọi tính năng lên một màn hình cho \"đỡ trống\"", why: "Thất bại vì đi ngược Định luật Hick, gây ra sự tê liệt trong việc ra quyết định của khách hàng." },
              { fail: "Phối màu ngẫu hứng theo cảm quan cá nhân cho bắt mắt", why: "Thất bại vì vi phạm tiêu chuẩn tương phản WCAG AA, khiến những người thị lực yếu không thể đọc được." },
              { fail: "Viết thông báo lỗi bằng các thuật ngữ kỹ thuật khô khan", why: "Thất bại vì thiếu sự đồng cảm, vô tình đổ trách nhiệm và gây ức chế cho người dùng." },
              { fail: "Vẽ các nút bấm (Button) với kích thước tùy hứng cho vừa vặn bố cục", why: "Thất bại vì vi phạm Định luật Fitt, khiến người dùng di động liên tục thao tác trượt." },
            ].map((item, i) => (
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
                  <p style={{ fontSize: 15, color: TEXT_BASE, fontWeight: 600, marginBottom: 6, textDecoration: "line-through", opacity: 0.7 }}>{item.fail}</p>
                  <p style={{ fontSize: 14, color: TEXT_BODY, lineHeight: 1.65 }}>
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
            <p style={{ fontSize: 16, color: "#fca5a5", lineHeight: 1.75, fontStyle: "italic", fontWeight: 500 }}>
              Cảm giác tồi tệ nhất là khi bạn nhận ra: Một bản thiết kế "đẹp" hoàn toàn vô nghĩa nếu nó thất bại trong việc điều hướng hành vi con người và không thể số hóa thành mã code.
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
            <SectionLabel>Khám phá điểm tựa logic</SectionLabel>
            <H2>Và Rồi Tôi Khám Phá Ra Điểm Tựa Logic<br />Thay Đổi Hoàn Toàn Cục Diện...</H2>
            <p style={{ fontSize: 16, color: TEXT_BODY, maxWidth: 620, margin: "0 auto", lineHeight: 1.75 }}>
              Sau 15 năm làm nghề, tôi nhận ra: các dự án xuất sắc nhất được xây dựng dựa trên <strong style={{ color: TEXT_BASE }}>khoa học thần kinh</strong> để định hướng hành vi con người. Khi bạn thiết kế "đúng" logic, cái "đẹp" sẽ tự nhiên xuất hiện.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16, marginBottom: 44,
          }}>
            {[
              { icon: "🧠", law: "Định luật Jakob", desc: "Người dùng kỳ vọng sản phẩm của bạn hoạt động theo các mô thức họ đã quen thuộc. Cố gắng sáng tạo sai chỗ sẽ giết chết trải nghiệm." },
              { icon: "📐", law: "Định luật Fitt", desc: "Thời gian tiếp cận mục tiêu tính bằng công thức toán học. Nút bấm tương tác bắt buộc phải nằm ở vùng ngón tay cái với kích thước 44-48px." },
              { icon: "🔢", law: "Định luật Miller", desc: "Trí nhớ ngắn hạn cực kỳ giới hạn. Nếu không biết cách phân nhóm thông tin (Chunking), người dùng sẽ lập tức bị quá tải." },
              { icon: "💸", law: "Chi phí tương tác", desc: "Mọi công sức vật lý và trí óc người dùng bỏ ra để hoàn thành tác vụ đều tỷ lệ nghịch với doanh thu của bạn." },
            ].map((item, i) => (
              <div key={i} style={{
                background: `linear-gradient(135deg, ${CARD}, ${CARD2})`,
                border: `1px solid ${ACCENT}28`,
                borderRadius: 16, padding: "26px 22px",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = `0 16px 40px -8px ${ACCENT}33`; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "none"; el.style.boxShadow = "none"; }}
              >
                <div style={{ fontSize: 32, marginBottom: 14 }}>{item.icon}</div>
                <div style={{ fontWeight: 800, fontSize: 15, color: ACCENT, marginBottom: 10, fontFamily: MONO }}>{item.law}</div>
                <p style={{ fontSize: 14, color: TEXT_BODY, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={140}>
          <div style={{
            background: `${WARNING}0d`, border: `1px solid ${WARNING}33`,
            borderRadius: 14, padding: "24px 28px",
          }}>
            <p style={{ fontSize: 16, color: "#fde68a", lineHeight: 1.75, fontWeight: 600 }}>
              ⚠ Điều đáng báo động nhất: Hầu hết các Tân binh UI/UX và Developer đang vô tình tự tay bóp chết sản phẩm khi thiết kế bằng cảm tính thẩm mỹ cá nhân thay vì đo lường tải trọng nhận thức của người dùng cuối.
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
            <SectionLabel>Giải pháp</SectionLabel>
            <H2>Tôi Gọi Hệ Thống Này Là<br />"Sách Giáo Khoa Thực Hành UI/UX"</H2>
            <p style={{ fontSize: 16, color: TEXT_BODY, maxWidth: 600, margin: "0 auto", lineHeight: 1.75 }}>
              Bằng việc số hóa toàn bộ các quy tắc thẩm mỹ thành chỉ số logic và định luật hành vi, cuốn sách này giúp bạn:
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
            {[
              "Xây dựng tư duy vững chắc để tự tin lập luận, bảo vệ từng pixel thiết kế trước sếp và khách hàng bằng hệ thống luận điểm tâm lý học sắc bén, không thể phản bác.",
              "Sở hữu ngay bộ quy chuẩn \u201ccầm tay chỉ việc\u201d tuyệt đối chính xác (như hệ thống lưới không gian 8px, kích thước nút an toàn 44-48px, chuẩn tiếp cận WCAG AA).",
              "Cung cấp cho FE Developer lăng kính thiết kế hệ thống hóa (Design System, biến thể màu HSB) để chủ động lập trình giao diện logic mà không phải chờ đợi.",
              "Tối ưu hóa phễu chuyển đổi cho PM/Founder bằng cách cắt giảm triệt để tải trọng nhận thức (Cognitive Load) và chi phí tương tác thừa thãi của người dùng.",
              "Làm chủ nghệ thuật viết UX Writing và tối ưu luồng nhập liệu Biểu mẫu (Form), gia tăng tốc độ chốt sale và triệt tiêu sai sót ở bước thanh toán.",
            ].map((b, i) => (
              <div key={i} style={{
                background: CARD, border: `1px solid ${SUCCESS}22`,
                borderRadius: 12, padding: "20px 22px",
                display: "flex", gap: 14, alignItems: "flex-start",
              }}>
                <span style={{ color: SUCCESS, fontSize: 20, flexShrink: 0, marginTop: 1 }}>✓</span>
                <p style={{ fontSize: 15, color: TEXT_BODY, lineHeight: 1.7 }}>{b}</p>
              </div>
            ))}
            <style>{`@media(max-width:640px){.benefits-grid{grid-template-columns:1fr!important}}`}</style>
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div style={{ textAlign: "center" }}>
            <CtaButton label={`ĐẶT MUA SÁCH NGAY — ${PRICE} VNĐ`} size="large" />
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
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <SectionLabel>4 năng lực cốt lõi</SectionLabel>
            <H2>Những Năng Lực Tách Biệt Một Kỹ Sư UI/UX<br />Thực Chiến Khỏi Một Thợ Vẽ Cảm Tính</H2>
            <p style={{ fontSize: 15, color: TEXT_MUTED, maxWidth: 540, margin: "0 auto" }}>
              4 Năng Lực Nền Tảng Bắt Buộc Phải Làm Chủ (Mà việc lướt mạng copy giao diện không bao giờ dạy bạn)
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18,
          }}
            className="skills-grid"
          >
            {[
              {
                icon: "🧠", n: "01",
                title: "Năng Lực Kiểm Soát Tải Trọng Nhận Thức",
                desc: "Ứng dụng khoa học não bộ để định lượng thông tin hiển thị — Kỹ năng sinh tồn để giữ chân người dùng",
                warn: "Nếu thiếu kỹ năng này, giao diện của bạn sẽ trở thành một ma trận hỗn độn, ép khách hàng phải bỏ chạy.",
              },
              {
                icon: "📐", n: "02",
                title: "Tư Duy Hệ Thống Hóa (Design System Logic)",
                desc: "Xây dựng bộ quy chuẩn toán học cho lưới 8px và biến thể màu HSB — Điều kiện tiên quyết để làm việc nhóm",
                warn: "Nếu thiếu tư duy này, Developer sẽ từ chối code bản thiết kế vô tổ chức và cảm tính của bạn.",
              },
              {
                icon: "👁️", n: "03",
                title: "Kỹ Năng Phân Cấp Thị Giác Khoa Học",
                desc: "Vận dụng quy luật Proximity và không gian trắng để tổ chức thông tin trực quan — Công cụ điều hướng mắt người xem tức thì",
                warn: "Nếu không biết căn chỉnh, nội dung của bạn sẽ mất trọng tâm, khiến tỷ lệ click rớt thê thảm.",
              },
              {
                icon: "💰", n: "04",
                title: "Năng Lực Tối Ưu Điểm Chạm (Button & Form)",
                desc: "Thiết kế hệ thống nút 3 cấp độ và biểu mẫu 1 cột tinh gọn — Kỹ năng trực tiếp tạo ra dòng tiền",
                warn: "Nếu thiết kế form sai luồng, mọi nỗ lực marketing hút traffic về đều đổ sông đổ bể ở vạch đích.",
              },
            ].map((s, i) => (
              <div key={i} style={{
                background: CARD, border: `1px solid ${LINE}`,
                borderRadius: 16, overflow: "hidden",
                transition: "border-color 0.2s, transform 0.2s",
              }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${ACCENT}55`; el.style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = LINE; el.style.transform = "none"; }}
              >
                <div style={{ padding: "28px 26px 22px" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
                    <span style={{ fontSize: 28 }}>{s.icon}</span>
                    <span style={{ fontFamily: MONO, fontSize: 11, color: ACCENT, background: `${ACCENT}18`, padding: "3px 10px", borderRadius: 100, letterSpacing: "0.1em" }}>
                      {s.n}
                    </span>
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: 17, lineHeight: 1.35, marginBottom: 12, color: TEXT_BASE }}>{s.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: TEXT_BODY, marginBottom: 16 }}>{s.desc}</p>
                  <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: 14, marginTop: 4 }}>
                    <p style={{ fontSize: 12, color: DANGER, lineHeight: 1.6 }}>
                      <span style={{ fontWeight: 700 }}>⚠ Hậu quả nếu thiếu: </span>{s.warn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <style>{`@media(max-width:600px){.skills-grid{grid-template-columns:1fr!important}}`}</style>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div style={{ textAlign: "center", marginTop: 44 }}>
            <CtaButton label={`SỞ HỮU BỘ KỸ NĂNG NGAY — ${PRICE} VNĐ`} size="large" />
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
            <H2>🎁 Toàn Bộ Hệ Thống Giá Trị Bạn Sẽ Nhận Được</H2>
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
              border: `1px solid ${ACCENT}44`, borderRadius: 14,
              padding: "24px 26px", marginBottom: 24,
              display: "flex", gap: 18, alignItems: "flex-start",
            }}>
              <span style={{ fontSize: 36, flexShrink: 0 }}>📚</span>
              <div>
                <div style={{ fontFamily: MONO, fontSize: 10, color: ACCENT, letterSpacing: "0.15em", marginBottom: 6 }}>SẢN PHẨM CHÍNH</div>
                <h3 style={{ fontWeight: 800, fontSize: 18, color: TEXT_BASE, marginBottom: 8 }}>
                  Toàn Bộ "Sách Giáo Khoa Thực Hành UI/UX"
                </h3>
                <p style={{ fontSize: 14, color: TEXT_BODY, lineHeight: 1.65 }}>
                  8 chương kiến thức thực chiến dày dặn đập tan sự cảm tính và tái lập trình bộ não logic của một kiến trúc sư giao diện thực thụ.
                </p>
              </div>
            </div>

            <div style={{ textAlign: "center", margin: "20px 0", fontWeight: 700, fontSize: 16, color: WARNING }}>
              🎁 Kèm Theo 5 Quà Tặng Đặc Quyền Hỗ Trợ Thực Chiến 🎁
            </div>

            {/* Bonuses */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: "📋", title: "\"Bộ Checklist Rà Soát Tiêu Chuẩn WCAG AA\"", desc: "Bảng tra cứu thần tốc giúp bạn kiểm định độ tương phản màu sắc trong 1 phút (Giải quyết dứt điểm nỗi lo thiết kế màu chói mắt, sai chuẩn quốc tế)." },
                { icon: "🔲", title: "\"Template Figma Hệ Thống Lưới (Grid) 8px\"", desc: "Khung xương chuẩn mực được set up sẵn giúp bạn thiết lập bố cục tăm tắp (Giải quyết rắc rối khi padding/margin lộn xộn, không chia hết khiến Dev ức chế)." },
                { icon: "📱", title: "\"Cẩm Nang Thông Số Kích Thước Component\"", desc: "Tài liệu tham chiếu tuyệt đối cho kích thước nút bấm an toàn theo chuẩn hệ điều hành (Giải quyết lỗi thiết kế vùng nhấn quá bé trên mobile)." },
                { icon: "✍️", title: "\"Thư Viện Mẫu UX Writing Chuyển Đổi Cao\"", desc: "Các công thức xưng hô và viết thông báo lỗi dứt khoát, tích cực (Giải quyết sự lúng túng khi phải tự nặn ra văn bản hướng dẫn thân thiện)." },
                { icon: "✅", title: "\"15 Tiêu Chí Sống Còn Tối Ưu Biểu Mẫu (Form)\"", desc: "Nguyên tắc cốt lõi bắt buộc rà soát khi làm form thu thập dữ liệu (Giải quyết trực tiếp nguyên nhân làm khách hàng bỏ dở quá trình đăng ký)." },
              ].map((b, i) => (
                <div key={i} style={{
                  background: CARD, border: `1px solid ${LINE}`,
                  borderRadius: 12, padding: "18px 20px",
                  display: "flex", gap: 16, alignItems: "flex-start",
                }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{b.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: TEXT_BASE, marginBottom: 6 }}>{b.title}</div>
                    <p style={{ fontSize: 13, color: TEXT_BODY, lineHeight: 1.65 }}>{b.desc}</p>
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
                {ORIGINAL_PRICE} VNĐ
              </p>
              <p style={{ fontSize: 14, color: WARNING, marginBottom: 16 }}>Hôm nay chỉ với:</p>
              <p style={{ fontSize: "clamp(40px, 6vw, 56px)", fontWeight: 900, color: TEXT_BASE, fontFamily: MONO, lineHeight: 1, marginBottom: 20 }}>
                {PRICE} <span style={{ fontSize: 22, fontWeight: 700, color: ACCENT }}>VNĐ</span>
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
            <H2>Sự Lột Xác Về Tư Duy Nhận Thức<br />Bạn Chắc Chắn Đạt Được</H2>
            <p style={{ fontSize: 15, color: TEXT_BODY, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
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
              {[
                "Thiết kế mò mẫm, chắp vá từ các mẫu trên mạng mà không hiểu cấu trúc luồng.",
                "Cứng họng, hoảng sợ không biết lấy lý do gì để giải trình mỗi khi bị sếp/khách hàng vặn vẹo.",
                "Làm Lập trình viên phẫn nộ vì file thiết kế lộn xộn, màu sắc và khoảng cách phi logic.",
                "Giao diện rườm rà, nhồi nhét lựa chọn khiến người dùng bị quá tải nhận thức.",
                "Viết UX Writing khô khan, dùng từ ngữ kỹ thuật để đổ trách nhiệm cho khách hàng.",
                "Biểu mẫu phức tạp, chia nhiều cột khiến mắt phải đảo liên tục và khách hàng bỏ cuộc.",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                  <span style={{ color: DANGER, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>—</span>
                  <span style={{ fontSize: 14, lineHeight: 1.65, color: "#94a3b8" }}>{item}</span>
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
              {[
                "Xây dựng mọi màn hình dựa trên các định luật khoa học thần kinh bất di bất dịch.",
                "Dõng dạc bảo vệ mọi pixel thiết kế bằng những lập luận tâm lý học đanh thép.",
                "Bàn giao Design System chuẩn mực, hệ màu HSB và lưới 8px để Dev code rành mạch, thần tốc.",
                "Ứng dụng chủ nghĩa tối giản lũy tiến, triệt tiêu tải trọng nhận thức để tương tác mượt mà.",
                "Xưng hô tinh tế, phân tầng hiển thị 3 lớp thông minh, dẫn dắt người dùng như một chuyên gia.",
                "Bố cục form 1 cột thẳng tắp, xác thực lỗi thời gian thực, giữ chân khách hàng đến dòng cuối cùng.",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                  <span style={{ color: SUCCESS, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</span>
                  <span style={{ fontSize: 14, lineHeight: 1.65, color: "#94a3b8" }}>{item}</span>
                </div>
              ))}
            </div>
            <style>{`@media(max-width:640px){.ba-grid{grid-template-columns:1fr!important}}`}</style>
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div style={{ textAlign: "center", marginTop: 44 }}>
            <CtaButton label={`BẮT ĐẦU SỰ CHUYỂN ĐỔI CỦA BẠN NGAY — ${PRICE} VNĐ`} size="large" />
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
            <p style={{ fontSize: 15, color: TEXT_BODY, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
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
                <p style={{ fontSize: 15, color: TEXT_BODY, lineHeight: 1.75, marginBottom: 16, fontStyle: "italic" }}>
                  {section.desc}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {section.items.map((item, j) => (
                    <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: ACCENT, fontWeight: 700, flexShrink: 0, marginTop: 2, fontFamily: MONO }}>›</span>
                      <span style={{ fontSize: 14, color: TEXT_BODY, lineHeight: 1.65 }}>{item}</span>
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
            <SectionLabel>Người kiến tạo bộ quy chuẩn này là ai?</SectionLabel>
            <H2>Chuyên Gia Biên Soạn</H2>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div style={{
            background: `linear-gradient(135deg, ${CARD}, ${CARD2})`,
            border: `1px solid ${ACCENT}33`,
            borderRadius: 20, overflow: "hidden",
            display: "flex", gap: 0,
          }}
            className="instructor-card"
          >
            {/* Left: Photo placeholder */}
            <div style={{
              flexShrink: 0, width: 240,
              background: `linear-gradient(160deg, ${ACCENT}15, ${CARD})`,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              padding: "40px 24px",
              borderRight: `1px solid ${ACCENT}22`,
            }}>
              <div style={{
                width: 120, height: 120, borderRadius: "50%",
                background: `linear-gradient(135deg, ${ACCENT}44, ${ACCENT}11)`,
                border: `2px solid ${ACCENT}55`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 40, marginBottom: 16,
                boxShadow: `0 0 30px -8px ${ACCENT}88`,
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
                Nguyễn Đức Việt
              </h3>
              <p style={{ fontFamily: MONO, fontSize: 12, color: ACCENT, letterSpacing: "0.1em", marginBottom: 24, lineHeight: 1.6 }}>
                Kỹ sư Công nghệ phần mềm (ĐH Bách Khoa) · Chuyên gia Giảng dạy UI/UX tại FPT Arena
              </p>

              {[
                { label: "Kinh nghiệm", value: "Hơn 15 năm thực chiến và đứng lớp đào tạo cốt cán tại FPT Arena." },
                { label: "Biệt danh", value: "Được giới trong nghề mệnh danh là người sở hữu \"đôi mắt cú vọ\" — có khả năng soi chiếu, bắt lỗi logic UI/UX và khoảng cách pixel lệch chuẩn nhanh như một máy quét." },
                { label: "Thành tựu", value: "Đã trực tiếp rà soát, mổ xẻ và chấm điểm khắt khe hàng chục ngàn đồ án thiết kế thực tiễn, giúp định hướng lại luồng tư duy cho hàng ngàn học viên." },
                { label: "Triết lý", value: "\"UI/UX không phải là nghệ thuật hội họa. Nó là bộ môn khoa học giải quyết bài toán hành vi con người bằng số liệu.\"" },
              ].map((item) => (
                <div key={item.label} style={{ marginBottom: 16 }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: ACCENT, letterSpacing: "0.08em", display: "block", marginBottom: 4 }}>
                    {item.label}:
                  </span>
                  <p style={{ fontSize: 14, color: TEXT_BODY, lineHeight: 1.7 }}>{item.value}</p>
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
          background: ACCENT, padding: "14px 24px",
          textAlign: "center", borderRadius: "16px 16px 0 0",
        }}>
          <p style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff" }}>
            ⚠ CHẤM DỨT SỰ CẢM TÍNH — SỞ HỮU "SÁCH GIÁO KHOA THỰC HÀNH UI/UX" NGAY LÚC NÀY
          </p>
        </div>

        <FadeIn>
          <div style={{
            background: `linear-gradient(135deg, ${CARD}, ${CARD2})`,
            border: `1px solid ${ACCENT}44`,
            borderRadius: "0 0 20px 20px",
            overflow: "hidden",
          }}>
            <div style={{ padding: "48px 40px" }}>
              <div style={{ textAlign: "center", marginBottom: 36 }}>
                <SectionLabel>Bước cuối cùng</SectionLabel>
                <H2>SẴN SÀNG ĐỂ TƯ DUY NHƯ<br />MỘT KỸ SƯ UI/UX THỰC THỤ?</H2>
                <p style={{ fontSize: 15, color: TEXT_BODY, lineHeight: 1.75, maxWidth: 540, margin: "0 auto 28px" }}>
                  Trong khi những Designer hay Developer khác ngoài kia vẫn đang vật lộn sao chép chắp vá, cãi vã không hồi kết và bất lực nhìn tỷ lệ chuyển đổi bốc hơi... bạn sẽ đang điềm tĩnh làm chủ hệ thống thông số kỹ thuật, tự tin bảo vệ mọi bản vẽ bằng logic khoa học đanh thép.
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
                background: "#070b12", border: `1px solid ${LINE}`,
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
                    <span style={{ fontSize: 13, color: TEXT_BODY }}>{label}</span>
                    <span style={{ fontSize: 13, color: TEXT_MUTED, fontFamily: MONO, flexShrink: 0 }}>{price}</span>
                  </div>
                ))}
                <div style={{ borderTop: `1px solid ${LINE}`, marginTop: 12, paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: TEXT_MUTED, textDecoration: "line-through", fontFamily: MONO }}>Tổng: {ORIGINAL_PRICE} VNĐ</span>
                  <span style={{ fontSize: 20, fontWeight: 900, color: ACCENT, fontFamily: MONO }}>Hôm nay: {PRICE} VNĐ</span>
                </div>
              </div>

              {/* Form */}
              <p style={{ fontWeight: 700, fontSize: 17, color: TEXT_BASE, marginBottom: 6, textAlign: "center" }}>
                Hoàn tất biểu mẫu dưới đây để giữ ngay mức giá ưu đãi!
              </p>
              <p style={{ fontSize: 13, color: TEXT_MUTED, marginBottom: 24, textAlign: "center" }}>
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
        <div style={{ fontFamily: SANS, fontSize: 22, fontWeight: 900, marginBottom: 8, letterSpacing: "-0.02em" }}>
          SÁCH GIÁO KHOA<span style={{ color: ACCENT }}>.</span>UI/UX
        </div>
        <p style={{ fontSize: 12, color: TEXT_MUTED, marginBottom: 24, fontFamily: MONO }}>
          Nền tảng Thiết kế Giao diện & Trải nghiệm Người dùng — fedu.vn
        </p>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
          {["Privacy Policy", "Terms & Conditions"].map((link) => (
            <a key={link} href="#" style={{ fontSize: 12, color: TEXT_MUTED, textDecoration: "none" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = ACCENT; }}
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
  );
}
