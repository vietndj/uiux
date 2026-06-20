import { useState, useEffect, useCallback, useRef } from "react";
import {
  loadUiuxContent, saveUiuxContent, resetUiuxContent,
  DEFAULT_UIUX_CONTENT,
  type UiuxContent, type UiuxLawCard, type UiuxBenefit,
  type UiuxSkillCard, type UiuxFailItem, type UiuxBonusItem,
} from "./uiuxContent";

// ─── Design tokens ────────────────────────────────────────────
const BG      = "#07090f";
const SIDEBAR = "#0d1117";
const CARD    = "#111827";
const ACCENT  = "#3B82F6";
const SUCCESS = "#22c55e";
const DANGER  = "#ef4444";
const WARNING = "#f59e0b";
const LINE    = "#1e2a3a";
const TEXT    = "#f0f6ff";
const MUTED   = "#64748b";
const NOE     = "'Noe Display', Georgia, serif";
const MONO    = "'JetBrains Mono', Consolas, monospace";
const BODY    = "'Aeonik', 'Inter', sans-serif";

// ─── Section definitions ───────────────────────────────────────
const SECTIONS = [
  { id: "hero",        icon: "🦸", label: "Hero" },
  { id: "pain",        icon: "😤", label: "Nỗi đau" },
  { id: "cycle",       icon: "🔄", label: "Vòng lặp thất bại" },
  { id: "discovery",   icon: "🔬", label: "Định luật khoa học" },
  { id: "solution",    icon: "💡", label: "Giải pháp / Lợi ích" },
  { id: "skills",      icon: "🛠", label: "4 Kỹ năng" },
  { id: "bonuses",     icon: "🎁", label: "Quà tặng" },
  { id: "beforeafter", icon: "📈", label: "Trước & Sau" },
  { id: "instructor",  icon: "👨‍🏫", label: "Giảng viên" },
  { id: "cta",         icon: "💰", label: "Final CTA & Giá" },
];

// ─── Field components ─────────────────────────────────────────
function Field({
  label, value, onChange, multiline = false, rows = 3, hint,
}: {
  label: string; value: string; onChange: (v: string) => void;
  multiline?: boolean; rows?: number; hint?: string;
}) {
  const base: React.CSSProperties = {
    width: "100%", boxSizing: "border-box",
    background: BG, border: `1px solid ${LINE}`,
    borderRadius: 8, padding: "10px 14px",
    color: TEXT, fontFamily: BODY, fontSize: 14.5,
    lineHeight: 1.65, outline: "none",
    transition: "border-color 0.15s",
    resize: multiline ? "vertical" : "none",
  };
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{
        display: "block", fontSize: 12, fontWeight: 700,
        color: MUTED, marginBottom: 6, letterSpacing: "0.08em",
        fontFamily: MONO, textTransform: "uppercase",
      }}>{label}</label>
      {multiline ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ ...base, borderColor: focused ? ACCENT : LINE }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ ...base, borderColor: focused ? ACCENT : LINE }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
      {hint && <p style={{ fontSize: 11.5, color: MUTED, marginTop: 4, fontFamily: MONO }}>{hint}</p>}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: NOE, fontSize: 22, fontWeight: 700,
      color: TEXT, marginBottom: 24, paddingBottom: 12,
      borderBottom: `1px solid ${LINE}`,
    }}>{children}</h2>
  );
}

function CardGroup({
  title, children,
}: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: CARD, borderRadius: 12, padding: "20px 22px",
      marginBottom: 20, border: `1px solid ${LINE}`,
    }}>
      <div style={{
        fontSize: 11, fontFamily: MONO, color: ACCENT,
        letterSpacing: "0.1em", marginBottom: 16, fontWeight: 700,
        textTransform: "uppercase",
      }}>{title}</div>
      {children}
    </div>
  );
}

// ─── Section panels ───────────────────────────────────────────
function HeroPanel({ c, set }: { c: UiuxContent; set: (k: keyof UiuxContent, v: unknown) => void }) {
  return (
    <>
      <SectionTitle>🦸 Hero Section</SectionTitle>
      <Field label="Badge text" value={c.heroBadge} onChange={v => set("heroBadge", v)} />
      <Field label="H1 — Dòng 1" value={c.heroH1Line1} onChange={v => set("heroH1Line1", v)} hint="Hiển thị màu trắng, uppercase" />
      <Field label="H1 — Dòng 2 (accent)" value={c.heroH1Line2} onChange={v => set("heroH1Line2", v)} hint="Hiển thị màu xanh ACCENT" />
      <Field label="Subheading (GT Sectra italic)" value={c.heroSubheading} onChange={v => set("heroSubheading", v)} />
      <Field label="Body text" value={c.heroBody} onChange={v => set("heroBody", v)} multiline rows={3} />
      <Field label="Italic note (nhỏ bên dưới)" value={c.heroBodyItalic} onChange={v => set("heroBodyItalic", v)} multiline rows={2} />
      <CardGroup title="Quick Stats (3 số)">
        <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "8px 12px", alignItems: "center" }}>
          {(["heroStat1n","heroStat1l","heroStat2n","heroStat2l","heroStat3n","heroStat3l"] as const).map((k, i) => (
            <input key={k} value={c[k] as string} onChange={e => set(k, e.target.value)}
              placeholder={i % 2 === 0 ? "Số" : "Label"}
              style={{
                background: BG, border: `1px solid ${LINE}`, borderRadius: 6,
                padding: "8px 10px", color: TEXT, fontFamily: BODY, fontSize: 13.5, outline: "none",
              }}
            />
          ))}
        </div>
      </CardGroup>
    </>
  );
}

function PainPanel({ c, set }: { c: UiuxContent; set: (k: keyof UiuxContent, v: unknown) => void }) {
  const updateItem = (i: number, v: string) => {
    const arr = [...c.painItems]; arr[i] = v; set("painItems", arr);
  };
  return (
    <>
      <SectionTitle>😤 Nỗi Đau Thực Tế</SectionTitle>
      <Field label="Section label" value={c.painLabel} onChange={v => set("painLabel", v)} />
      <Field label="H2 — Dòng 1" value={c.painHeading} onChange={v => set("painHeading", v)} />
      <Field label="H2 — Dòng 2" value={c.painHeading2} onChange={v => set("painHeading2", v)} />
      <Field label="Blockquote (câu hỏi mở đầu)" value={c.painBlockquote} onChange={v => set("painBlockquote", v)} multiline rows={2} />
      <Field label="Đoạn văn 1" value={c.painPara1} onChange={v => set("painPara1", v)} multiline rows={3} />
      <Field label="Đoạn văn 2" value={c.painPara2} onChange={v => set("painPara2", v)} multiline rows={3} />
      <Field label="Tiêu đề danh sách ✕" value={c.painListHeading} onChange={v => set("painListHeading", v)} />
      {c.painItems.map((item, i) => (
        <Field key={i} label={`✕ Item ${i + 1}`} value={item} onChange={v => updateItem(i, v)} multiline rows={2} />
      ))}
    </>
  );
}

function CyclePanel({ c, set }: { c: UiuxContent; set: (k: keyof UiuxContent, v: unknown) => void }) {
  const updateFail = (i: number, field: keyof UiuxFailItem, v: string) => {
    const arr = c.cycleFailItems.map((item, idx) => idx === i ? { ...item, [field]: v } : item);
    set("cycleFailItems", arr);
  };
  return (
    <>
      <SectionTitle>🔄 Vòng Lặp Thất Bại</SectionTitle>
      <Field label="Section label" value={c.cycleLabel} onChange={v => set("cycleLabel", v)} />
      <Field label="H2 — Dòng 1" value={c.cycleHeading} onChange={v => set("cycleHeading", v)} />
      <Field label="H2 — Dòng 2" value={c.cycleHeading2} onChange={v => set("cycleHeading2", v)} />
      <Field label="Đoạn dẫn" value={c.cycleSub} onChange={v => set("cycleSub", v)} multiline rows={2} />
      {c.cycleFailItems.map((item, i) => (
        <CardGroup key={i} title={`THẤT BẠI ${i + 1}`}>
          <Field label="Hành động thất bại (gạch ngang)" value={item.fail} onChange={v => updateFail(i, "fail", v)} multiline rows={2} />
          <Field label="Lý do thất bại" value={item.why} onChange={v => updateFail(i, "why", v)} multiline rows={2} />
        </CardGroup>
      ))}
      <Field label="Kết luận (hộp đỏ)" value={c.cycleConclusion} onChange={v => set("cycleConclusion", v)} multiline rows={3} />
    </>
  );
}

function DiscoveryPanel({ c, set }: { c: UiuxContent; set: (k: keyof UiuxContent, v: unknown) => void }) {
  const updateLaw = (i: number, field: keyof UiuxLawCard, v: string) => {
    const arr = c.discoveryLaws.map((item, idx) => idx === i ? { ...item, [field]: v } : item);
    set("discoveryLaws", arr);
  };
  return (
    <>
      <SectionTitle>🔬 Định Luật Khoa Học</SectionTitle>
      <Field label="Section label" value={c.discoveryLabel} onChange={v => set("discoveryLabel", v)} />
      <Field label="H2 — Dòng 1" value={c.discoveryHeading} onChange={v => set("discoveryHeading", v)} />
      <Field label="H2 — Dòng 2" value={c.discoveryHeading2} onChange={v => set("discoveryHeading2", v)} />
      <Field label="Subheading (GT Sectra)" value={c.discoverySub} onChange={v => set("discoverySub", v)} multiline rows={2} />
      {c.discoveryLaws.map((law, i) => (
        <CardGroup key={i} title={`ĐỊNH LUẬT ${i + 1}: ${law.law}`}>
          <Field label="Icon (emoji)" value={law.icon} onChange={v => updateLaw(i, "icon", v)} />
          <Field label="Tên luật (Law name)" value={law.law} onChange={v => updateLaw(i, "law", v)} />
          <Field label="Quy tắc (tiêu đề ngắn)" value={law.rule} onChange={v => updateLaw(i, "rule", v)} />
          <Field label="Mô tả" value={law.desc} onChange={v => updateLaw(i, "desc", v)} multiline rows={3} />
          <Field label="Spec → áp dụng cụ thể (MONO)" value={law.spec} onChange={v => updateLaw(i, "spec", v)} />
        </CardGroup>
      ))}
      <Field label="Hộp cảnh báo ⚠ (màu vàng)" value={c.discoveryWarning} onChange={v => set("discoveryWarning", v)} multiline rows={3} />
    </>
  );
}

function SolutionPanel({ c, set }: { c: UiuxContent; set: (k: keyof UiuxContent, v: unknown) => void }) {
  const updateBenefit = (i: number, field: keyof UiuxBenefit, v: string) => {
    const arr = c.solutionBenefits.map((item, idx) => idx === i ? { ...item, [field]: v } : item);
    set("solutionBenefits", arr);
  };
  return (
    <>
      <SectionTitle>💡 Giải Pháp & Lợi Ích</SectionTitle>
      <Field label="Section label" value={c.solutionLabel} onChange={v => set("solutionLabel", v)} />
      <Field label="H2 — Dòng 1" value={c.solutionHeading} onChange={v => set("solutionHeading", v)} />
      <Field label="H2 — Dòng 2" value={c.solutionHeading2} onChange={v => set("solutionHeading2", v)} />
      <Field label="Subheading (GT Sectra)" value={c.solutionSub} onChange={v => set("solutionSub", v)} multiline rows={2} />
      {c.solutionBenefits.map((b, i) => (
        <CardGroup key={i} title={`✓ LỢI ÍCH ${i + 1}`}>
          <Field label="Tiêu đề (bold)" value={b.title} onChange={v => updateBenefit(i, "title", v)} />
          <Field label="Mô tả chi tiết" value={b.body} onChange={v => updateBenefit(i, "body", v)} multiline rows={3} />
        </CardGroup>
      ))}
    </>
  );
}

function SkillsPanel({ c, set }: { c: UiuxContent; set: (k: keyof UiuxContent, v: unknown) => void }) {
  const updateSkill = (i: number, field: keyof UiuxSkillCard, v: string) => {
    const arr = c.skillsCards.map((item, idx) => idx === i ? { ...item, [field]: v } : item);
    set("skillsCards", arr);
  };
  return (
    <>
      <SectionTitle>🛠 4 Kỹ Năng Cốt Lõi</SectionTitle>
      <Field label="Section label" value={c.skillsLabel} onChange={v => set("skillsLabel", v)} />
      <Field label="H2 — Dòng 1" value={c.skillsHeading} onChange={v => set("skillsHeading", v)} />
      <Field label="H2 — Dòng 2" value={c.skillsHeading2} onChange={v => set("skillsHeading2", v)} />
      <Field label="Subheading (GT Sectra)" value={c.skillsSub} onChange={v => set("skillsSub", v)} multiline rows={2} />
      {c.skillsCards.map((s, i) => (
        <CardGroup key={i} title={`KỸ NĂNG ${s.n}`}>
          <Field label="Tiêu đề (Noe Display)" value={s.title} onChange={v => updateSkill(i, "title", v)} />
          <Field label="→ Quy tắc (MONO xanh lá)" value={s.rule} onChange={v => updateSkill(i, "rule", v)} />
          <Field label="Mô tả" value={s.desc} onChange={v => updateSkill(i, "desc", v)} multiline rows={3} />
          <Field label="⚠ Cảnh báo hậu quả" value={s.warn} onChange={v => updateSkill(i, "warn", v)} multiline rows={2} />
        </CardGroup>
      ))}
    </>
  );
}

function BonusesPanel({ c, set }: { c: UiuxContent; set: (k: keyof UiuxContent, v: unknown) => void }) {
  const updateBonus = (i: number, field: keyof UiuxBonusItem, v: string) => {
    const arr = c.bonusesItems.map((item, idx) => idx === i ? { ...item, [field]: v } : item);
    set("bonusesItems", arr);
  };
  return (
    <>
      <SectionTitle>🎁 Quà Tặng Bonus</SectionTitle>
      <Field label="Tiêu đề section" value={c.bonusesHeading} onChange={v => set("bonusesHeading", v)} />
      {c.bonusesItems.map((b, i) => (
        <CardGroup key={i} title={`BONUS ${i + 1}`}>
          <Field label="Icon (emoji)" value={b.icon} onChange={v => updateBonus(i, "icon", v)} />
          <Field label="Tiêu đề" value={b.title} onChange={v => updateBonus(i, "title", v)} />
          <Field label="Mô tả" value={b.desc} onChange={v => updateBonus(i, "desc", v)} multiline rows={2} />
        </CardGroup>
      ))}
    </>
  );
}

function BeforeAfterPanel({ c, set }: { c: UiuxContent; set: (k: keyof UiuxContent, v: unknown) => void }) {
  const updateArr = (key: "beforeItems" | "afterItems", i: number, v: string) => {
    const arr = [...c[key]]; arr[i] = v; set(key, arr);
  };
  return (
    <>
      <SectionTitle>📈 Trước & Sau</SectionTitle>
      <Field label="H2 — Dòng 1" value={c.beforeAfterHeading} onChange={v => set("beforeAfterHeading", v)} />
      <Field label="H2 — Dòng 2" value={c.beforeAfterHeading2} onChange={v => set("beforeAfterHeading2", v)} />
      <CardGroup title="TRƯỚC — (cột đỏ ✕)">
        {c.beforeItems.map((item, i) => (
          <Field key={i} label={`✕ Item ${i + 1}`} value={item} onChange={v => updateArr("beforeItems", i, v)} />
        ))}
      </CardGroup>
      <CardGroup title="SAU — (cột xanh ✓)">
        {c.afterItems.map((item, i) => (
          <Field key={i} label={`✓ Item ${i + 1}`} value={item} onChange={v => updateArr("afterItems", i, v)} />
        ))}
      </CardGroup>
    </>
  );
}

function InstructorPanel({ c, set }: { c: UiuxContent; set: (k: keyof UiuxContent, v: unknown) => void }) {
  const updateCred = (i: number, field: "label" | "value", v: string) => {
    const arr = c.instructorCredentials.map((item, idx) => idx === i ? { ...item, [field]: v } : item);
    set("instructorCredentials", arr);
  };
  return (
    <>
      <SectionTitle>👨‍🏫 Giảng Viên</SectionTitle>
      <Field label="Section label" value={c.instructorLabel} onChange={v => set("instructorLabel", v)} />
      <Field label="H2 — Tên (Noe Display)" value={c.instructorHeading} onChange={v => set("instructorHeading", v)} />
      <Field label="H2 — Chức danh" value={c.instructorHeading2} onChange={v => set("instructorHeading2", v)} />
      <Field label="Tên đầy đủ" value={c.instructorName} onChange={v => set("instructorName", v)} />
      <Field label="Chức vụ / Title" value={c.instructorTitle} onChange={v => set("instructorTitle", v)} />
      <Field label="Bio (đoạn văn)" value={c.instructorBio} onChange={v => set("instructorBio", v)} multiline rows={5} />
      {c.instructorCredentials.map((cred, i) => (
        <CardGroup key={i} title={`CREDENTIAL ${i + 1}`}>
          <Field label="Label (màu xanh MONO)" value={cred.label} onChange={v => updateCred(i, "label", v)} />
          <Field label="Nội dung" value={cred.value} onChange={v => updateCred(i, "value", v)} multiline rows={2} />
        </CardGroup>
      ))}
    </>
  );
}

function CtaPanel({ c, set }: { c: UiuxContent; set: (k: keyof UiuxContent, v: unknown) => void }) {
  return (
    <>
      <SectionTitle>💰 Final CTA & Giá</SectionTitle>
      <CardGroup title="GIÁ BÁN">
        <Field label="Giá hiển thị (VNĐ)" value={c.price} onChange={v => set("price", v)} hint="Ví dụ: 249.000" />
        <Field label="Giá gốc (gạch ngang)" value={c.originalPrice} onChange={v => set("originalPrice", v)} hint="Ví dụ: 500.000" />
      </CardGroup>
      <Field label="H2 — Dòng 1" value={c.ctaHeading} onChange={v => set("ctaHeading", v)} />
      <Field label="H2 — Dòng 2" value={c.ctaHeading2} onChange={v => set("ctaHeading2", v)} />
      <Field label="Đoạn văn CTA" value={c.ctaSub} onChange={v => set("ctaSub", v)} multiline rows={4} />
    </>
  );
}

// ─── Main Editor Component ────────────────────────────────────
export default function UiuxEditor() {
  const [content, setContent] = useState<UiuxContent>(() => loadUiuxContent());
  const [activeSection, setActiveSection] = useState("hero");
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [dirty, setDirty] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-save with debounce
  useEffect(() => {
    if (!dirty) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      saveUiuxContent(content);
      setSavedAt(new Date());
      setDirty(false);
    }, 600);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [content, dirty]);

  const set = useCallback((key: keyof UiuxContent, value: unknown) => {
    setContent(prev => ({ ...prev, [key]: value }));
    setDirty(true);
  }, []);

  const handleReset = () => {
    if (!confirm("Reset toàn bộ nội dung về mặc định? Hành động này không thể hoàn tác.")) return;
    resetUiuxContent();
    setContent(DEFAULT_UIUX_CONTENT);
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `uiux-content-${Date.now()}.json`; a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file"; input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const parsed = JSON.parse(ev.target?.result as string);
          setContent({ ...DEFAULT_UIUX_CONTENT, ...parsed });
          setDirty(true);
        } catch { alert("File JSON không hợp lệ."); }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const renderPanel = () => {
    const props = { c: content, set };
    switch (activeSection) {
      case "hero":        return <HeroPanel {...props} />;
      case "pain":        return <PainPanel {...props} />;
      case "cycle":       return <CyclePanel {...props} />;
      case "discovery":   return <DiscoveryPanel {...props} />;
      case "solution":    return <SolutionPanel {...props} />;
      case "skills":      return <SkillsPanel {...props} />;
      case "bonuses":     return <BonusesPanel {...props} />;
      case "beforeafter": return <BeforeAfterPanel {...props} />;
      case "instructor":  return <InstructorPanel {...props} />;
      case "cta":         return <CtaPanel {...props} />;
      default:            return null;
    }
  };

  return (
    <div style={{
      display: "flex", height: "100vh", background: BG,
      fontFamily: BODY, color: TEXT, overflow: "hidden",
    }}>
      {/* ── Sidebar ── */}
      <aside style={{
        width: 240, flexShrink: 0,
        background: SIDEBAR, borderRight: `1px solid ${LINE}`,
        display: "flex", flexDirection: "column",
        overflowY: "auto",
      }}>
        {/* Logo */}
        <div style={{
          padding: "20px 20px 16px",
          borderBottom: `1px solid ${LINE}`,
        }}>
          <div style={{ fontFamily: NOE, fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 2 }}>
            UIUX Editor
          </div>
          <div style={{ fontSize: 11, color: MUTED, fontFamily: MONO }}>
            /uiux-editor
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 10px" }}>
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                width: "100%", textAlign: "left",
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 8, marginBottom: 2,
                background: activeSection === s.id ? `${ACCENT}20` : "transparent",
                border: activeSection === s.id ? `1px solid ${ACCENT}40` : "1px solid transparent",
                color: activeSection === s.id ? TEXT : MUTED,
                cursor: "pointer", fontSize: 13.5,
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 16 }}>{s.icon}</span>
              <span style={{ fontWeight: activeSection === s.id ? 600 : 400 }}>{s.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer actions */}
        <div style={{
          padding: "16px 10px",
          borderTop: `1px solid ${LINE}`,
          display: "flex", flexDirection: "column", gap: 8,
        }}>
          {/* Save status */}
          <div style={{
            fontSize: 11, fontFamily: MONO, textAlign: "center",
            color: dirty ? WARNING : SUCCESS, marginBottom: 4,
          }}>
            {dirty ? "● Chưa lưu..." : savedAt ? `✓ Đã lưu ${savedAt.toLocaleTimeString("vi-VN")}` : "✓ Chưa thay đổi"}
          </div>

          <a
            href="/uiux"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block", textAlign: "center", textDecoration: "none",
              background: ACCENT, color: "#fff",
              padding: "9px 12px", borderRadius: 8,
              fontSize: 13, fontWeight: 700,
            }}
          >
            👁 Preview trang
          </a>
          <button onClick={handleExport} style={{
            background: `${SUCCESS}18`, border: `1px solid ${SUCCESS}40`,
            color: SUCCESS, padding: "8px 12px", borderRadius: 8,
            fontSize: 13, cursor: "pointer", fontWeight: 600,
          }}>
            ↓ Export JSON
          </button>
          <button onClick={handleImport} style={{
            background: `${ACCENT}10`, border: `1px solid ${ACCENT}30`,
            color: ACCENT, padding: "8px 12px", borderRadius: 8,
            fontSize: 13, cursor: "pointer", fontWeight: 600,
          }}>
            ↑ Import JSON
          </button>
          <button onClick={handleReset} style={{
            background: `${DANGER}10`, border: `1px solid ${DANGER}30`,
            color: DANGER, padding: "8px 12px", borderRadius: 8,
            fontSize: 13, cursor: "pointer",
          }}>
            ↺ Reset mặc định
          </button>
        </div>
      </aside>

      {/* ── Main panel ── */}
      <main style={{
        flex: 1, overflowY: "auto",
        padding: "32px 40px 60px",
      }}>
        <div style={{ maxWidth: 720 }}>
          {renderPanel()}
        </div>
      </main>
    </div>
  );
}
