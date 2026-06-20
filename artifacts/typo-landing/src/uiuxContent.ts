// ─── UIUX Landing Page Content Store ─────────────────────────────────────────
// All editable content for /uiux landing page.
// Backed by localStorage key: 'uiux_content_v1'
// Editor: /uiux-editor

export const UIUX_CONTENT_KEY = "uiux_content_v1";
export const UIUX_CONTENT_VERSION = 1;

export interface UiuxLawCard {
  icon: string;
  law: string;
  rule: string;
  desc: string;
  spec: string;
}

export interface UiuxBenefit {
  title: string;
  body: string;
}

export interface UiuxSkillCard {
  n: string;
  title: string;
  rule: string;
  desc: string;
  warn: string;
}

export interface UiuxFailItem {
  fail: string;
  why: string;
}

export interface UiuxBonusItem {
  icon: string;
  title: string;
  desc: string;
}

export interface UiuxContent {
  _v: number;

  // Pricing
  price: string;
  originalPrice: string;

  // Section 1: Hero
  heroBadge: string;
  heroH1Line1: string;
  heroH1Line2: string;
  heroSubheading: string;
  heroBody: string;
  heroBodyItalic: string;
  heroStat1n: string;
  heroStat1l: string;
  heroStat2n: string;
  heroStat2l: string;
  heroStat3n: string;
  heroStat3l: string;

  // Section 2: Pain
  painLabel: string;
  painHeading: string;
  painHeading2: string;
  painBlockquote: string;
  painPara1: string;
  painPara2: string;
  painListHeading: string;
  painItems: string[];

  // Section 3: Cycle of Failing
  cycleLabel: string;
  cycleHeading: string;
  cycleHeading2: string;
  cycleSub: string;
  cycleFailItems: UiuxFailItem[];
  cycleConclusion: string;

  // Section 4: Discovery / Laws
  discoveryLabel: string;
  discoveryHeading: string;
  discoveryHeading2: string;
  discoverySub: string;
  discoveryLaws: UiuxLawCard[];
  discoveryWarning: string;

  // Section 5: Solution / Benefits
  solutionLabel: string;
  solutionHeading: string;
  solutionHeading2: string;
  solutionSub: string;
  solutionBenefits: UiuxBenefit[];

  // Section 6: Skills
  skillsLabel: string;
  skillsHeading: string;
  skillsHeading2: string;
  skillsSub: string;
  skillsCards: UiuxSkillCard[];

  // Section 7: Bonuses
  bonusesHeading: string;
  bonusesItems: UiuxBonusItem[];

  // Section 8: Before/After
  beforeAfterHeading: string;
  beforeAfterHeading2: string;
  beforeItems: string[];
  afterItems: string[];

  // Section 10: Instructor
  instructorLabel: string;
  instructorHeading: string;
  instructorHeading2: string;
  instructorName: string;
  instructorTitle: string;
  instructorBio: string;
  instructorCredentials: Array<{ label: string; value: string }>;

  // Section 11: Final CTA
  ctaHeading: string;
  ctaHeading2: string;
  ctaSub: string;
}

export const DEFAULT_UIUX_CONTENT: UiuxContent = {
  _v: UIUX_CONTENT_VERSION,

  price: "249.000",
  originalPrice: "500.000",

  // Hero
  heroBadge: "Đúc kết từ 15 năm thực chiến · FPT Arena",
  heroH1Line1: "KHOA HỌC HÓA",
  heroH1Line2: "SỰ SÁNG TẠO",
  heroSubheading: "Chấm Dứt Kỷ Nguyên Thiết Kế Cảm Tính",
  heroBody: "Hệ Thống Hóa Tư Duy Logic UI/UX Bài Bản Và Tự Tin Bảo Vệ Mọi Quyết Định Thiết Kế Bằng Khoa Học Hành Vi Chỉ Trong 30 Ngày",
  heroBodyItalic: "(ngay cả khi bạn từng liên tục thất bại vì chỉ biết sao chép rập khuôn từ Dribbble mà không hiểu bản chất cấu trúc thông tin)",
  heroStat1n: "15+", heroStat1l: "Năm kinh nghiệm",
  heroStat2n: "8",   heroStat2l: "Chương thực chiến",
  heroStat3n: "5",   heroStat3l: "Bonus độc quyền",

  // Pain
  painLabel: "Nỗi đau thực tế của người làm nghề",
  painHeading: "Hệ Thống Quy Chuẩn Chuyển Hóa Sự Hoang Mang",
  painHeading2: "Thành Khả Năng Lập Luận Sắc Bén",
  painBlockquote: "\"Tại sao em lại đặt cái nút ở đây? Kích thước và khoảng cách này dựa trên cơ sở nào?\"",
  painPara1: "Và bạn hoàn toàn đứng hình vì trong đầu chỉ có một câu trả lời duy nhất: \"Vì em thấy nó đẹp.\"",
  painPara2: "Nếu bạn đang làm việc trong ngành phát triển sản phẩm số, bạn không lạ gì với cảm giác \"thiết kế bằng niềm tin\". Thiết kế không dựa trên tâm lý học hành vi mà chỉ thuần trang trí bề ngoài chính là nguyên nhân trực tiếp giết chết trải nghiệm người dùng.",
  painListHeading: "CUỘC VẬT LỘN HÀNG NGÀY CỦA BẠN VỚI CÁC DỰ ÁN:",
  painItems: [
    "Hoang mang, thiếu tự tin và không có bộ quy chuẩn \"cầm tay chỉ việc\" nào (như lưới 8px, nút 44-48px) để lập luận bảo vệ bản vẽ trước sếp.",
    "(Đối với FE Dev): Tuyệt vọng khi phải hiện thực hóa những file thiết kế thiếu tính hệ thống, màu sắc lộn xộn, không tuân thủ bất kỳ quy tắc nào.",
    "(Đối với PM/BA): Đau đầu nhìn tỷ lệ chuyển đổi (Conversion Rate) sụt giảm vì giao diện rườm rà ép người dùng phải chịu đựng sự quá tải.",
    "Bế tắc trong việc thiết kế biểu mẫu (Form) khiến người dùng ức chế và từ bỏ thao tác ngay tại bước thanh toán.",
    "Tiêu tốn hàng chục giờ đồng hồ sao chép các mẫu UI trên Behance một cách vô thức mà không hiểu luồng thông tin ẩn bên dưới.",
  ],

  // Cycle
  cycleLabel: "Không phải lỗi của bạn",
  cycleHeading: "Vòng Lặp Bế Tắc Của Việc \"Trang Trí\"",
  cycleHeading2: "Thay Vì \"Thiết Kế Trải Nghiệm\"",
  cycleSub: "Tôi biết bạn đã thử làm theo mọi thứ bề nổi mà các diễn đàn mạng khuyên bảo:",
  cycleFailItems: [
    { fail: "Sao chép toàn bộ giao diện từ các shot top-trending trên Dribbble", why: "Thất bại vì Dribbble chỉ là bản trình diễn thị giác, bỏ qua hoàn toàn chi phí tương tác thực tế của người dùng." },
    { fail: "Cố gắng nhồi nhét mọi tính năng lên một màn hình cho \"đỡ trống\"", why: "Thất bại vì đi ngược Định luật Hick, gây ra sự tê liệt trong việc ra quyết định của khách hàng." },
    { fail: "Phối màu ngẫu hứng theo cảm quan cá nhân cho bắt mắt", why: "Thất bại vì vi phạm tiêu chuẩn tương phản WCAG AA, khiến những người thị lực yếu không thể đọc được." },
    { fail: "Viết thông báo lỗi bằng các thuật ngữ kỹ thuật khô khan", why: "Thất bại vì thiếu sự đồng cảm, vô tình đổ trách nhiệm và gây ức chế cho người dùng." },
    { fail: "Vẽ các nút bấm (Button) với kích thước tùy hứng cho vừa vặn bố cục", why: "Thất bại vì vi phạm Định luật Fitt, khiến người dùng di động liên tục thao tác trượt." },
  ],
  cycleConclusion: "Cảm giác tồi tệ nhất là khi bạn nhận ra: Một bản thiết kế \"đẹp\" hoàn toàn vô nghĩa nếu nó thất bại trong việc điều hướng hành vi con người và không thể số hóa thành mã code.",

  // Discovery
  discoveryLabel: "Điểm tựa logic",
  discoveryHeading: "Thiết Kế Tốt Không Phải Nghệ Thuật.",
  discoveryHeading2: "Đó Là Một Tập Hợp Các Quy Tắc Có Thể Học Được.",
  discoverySub: "Practical UI gọi đây là \"logic-driven design\" — thiết kế dựa trên nguyên lý, không phải cảm quan. Tôi đúc rút lại thành 4 quy tắc nền tảng không thể bỏ qua.",
  discoveryLaws: [
    { icon: "🧠", law: "Jakob's Law", rule: "Quy tắc 80/20 kỳ vọng", desc: "80% thời gian người dùng dùng các sản phẩm khác. Giao diện của bạn phải hoạt động giống những gì họ đã biết — không phải những gì bạn cho là sáng tạo.", spec: "→ Ưu tiên convention, đổi mới ở nội dung chứ không phải ở pattern tương tác." },
    { icon: "📐", law: "Fitts's Law", rule: "Công thức kích thước 44px", desc: "Thời gian chạm vào mục tiêu tỷ lệ thuận với khoảng cách và tỷ lệ nghịch với kích thước. Nút bấm quá nhỏ = khách hàng bỏ đi.", spec: "→ Mọi touch target: tối thiểu 44×44px. Nút CTA chính: 48-56px." },
    { icon: "🔢", law: "Miller's Law", rule: "Giới hạn 7±2 đơn vị", desc: "Não người chỉ xử lý được 5–9 đơn vị thông tin cùng lúc. Nhồi nhét nhiều hơn → người dùng đóng app thay vì đọc tiếp.", spec: "→ Nhóm thông tin thành chunks ≤7. Menu > 7 mục phải chia category." },
    { icon: "⚡", law: "Interaction Cost", rule: "Mỗi bước thêm = -% conversion", desc: "Mọi click, cuộn, gõ phím thừa đều là ma sát. Practical UI đo đạc: giảm 1 bước trong form tăng 20–35% tỷ lệ hoàn thành.", spec: "→ Loại bỏ mọi trường form không bắt buộc. Default smart values. Autofill." },
  ],
  discoveryWarning: "Thực tế đáng báo động: Hầu hết designer và developer ở Việt Nam chưa từng nghe đến Fitts's Law hay Interaction Cost — nhưng vẫn đang ra quyết định thiết kế mỗi ngày. Đây chính là khoảng cách tạo ra sự khác biệt giữa một sản phẩm trông đẹp và một sản phẩm bán được hàng.",

  // Solution
  solutionLabel: "Giải pháp thực chiến",
  solutionHeading: "\u201cSách Giáo Khoa Thực Hành UI/UX\u201d",
  solutionHeading2: "Quy Tắc. Con Số. Áp Dụng Được Ngay.",
  solutionSub: "Không lý thuyết trôi nổi. Không cảm hứng Dribbble. Chỉ có quy tắc đo được, chỉ số áp dụng được — như cách Practical UI đã làm với cộng đồng designer quốc tế.",
  solutionBenefits: [
    { title: "Bảo vệ thiết kế bằng con số, không bằng ý kiến", body: "Khi sếp hỏi \u201cSao lại đặt nút ở đây?\u201d — bạn trả lời: \u201cVùng ngón tay cái theo Fitts's Law, 44px minimum target, khoảng cách 8px grid.\u201d Đó là lập luận không thể bác bỏ." },
    { title: "Một bộ quy chuẩn áp dụng được vào ngay hôm nay", body: "Lưới 8px. Màu WCAG AA contrast ratio ≥4.5:1. Padding button 16–20px. Đây là những con số bất di bất dịch mà mọi sản phẩm số thành công đều tuân theo." },
    { title: "Developer hiểu bản thiết kế của bạn ngay lần đầu", body: "Design token. Spacing scale. Color variable. Khi bạn bàn giao file Figma có hệ thống, Developer không cần hỏi thêm câu nào — họ code được ngay." },
    { title: "Form đơn giản hơn = tỷ lệ hoàn thành cao hơn", body: "Mỗi trường form thừa làm giảm conversion 20–40%. Cuốn sách dạy bạn đặt câu hỏi: \u201cTrường này thực sự cần thiết không?\u201d — và cách loại bỏ nó đúng lúc." },
    { title: "Cognitive Load giảm → Người dùng mua hàng nhanh hơn", body: "Ít lựa chọn hơn, phân cấp rõ hơn, thông báo lỗi thân thiện hơn. Ba thay đổi nhỏ này có thể tăng tỷ lệ chuyển đổi lên 15–30% mà không cần redesign toàn bộ." },
  ],

  // Skills
  skillsLabel: "4 năng lực cốt lõi",
  skillsHeading: "Bốn Kỹ Năng Phân Tách Designer",
  skillsHeading2: "Thực Chiến Khỏi Người Vẽ Đẹp",
  skillsSub: "Practical UI xây dựng trên 4 trụ cột này. Cuốn sách Việt hóa chúng với ngữ cảnh và ví dụ thực tế từ các dự án tại Việt Nam.",
  skillsCards: [
    { n: "01", title: "Quản Lý Cognitive Load", rule: "Mỗi màn hình chỉ có 1 hành động chính", desc: "Không phải \u201clàm sạch\u201d giao diện — mà là đo đếm chính xác bao nhiêu quyết định bạn đang buộc người dùng phải đưa ra. Progressive Disclosure giúp ẩn đi độ phức tạp đúng lúc.", warn: "Quá nhiều lựa chọn → Hick's Law kích hoạt → người dùng không chọn gì cả." },
    { n: "02", title: "Design System & Spacing Scale", rule: "Mọi khoảng cách chia hết cho 4 hoặc 8", desc: "Lưới 8px không phải trend — đó là chuẩn mực kỹ thuật để tương thích pixel-perfect trên mọi màn hình. Spacing scale (4-8-12-16-24-32-48-64px) giúp Developer code không cần đoán.", warn: "Padding tùy hứng → file không bàn giao được → Dev tự ý thay đổi → sản phẩm sai spec." },
    { n: "03", title: "Visual Hierarchy & Contrast", rule: "Tương phản tối thiểu 4.5:1 theo WCAG AA", desc: "Phân cấp thị giác không phải làm cái gì đó to hơn. Đó là kiểm soát có chủ đích trọng số, màu sắc, và khoảng trắng để mắt người đọc đi đúng hướng trong 3 giây đầu tiên.", warn: "Text xám mờ trên nền tối trông minimal — nhưng vi phạm WCAG AA và loại bỏ ~8% người dùng." },
    { n: "04", title: "Button Hierarchy & Form Design", rule: "Mỗi view chỉ có 1 nút Primary duy nhất", desc: "3 cấp nút (Primary → Secondary → Ghost) với kích thước, màu, vị trí được tính bằng Fitts's Law. Form 1 cột với inline validation real-time tăng completion rate lên đáng kể.", warn: "3 nút cùng màu trên 1 màn hình = không nút nào là ưu tiên = người dùng không biết bấm đâu." },
  ],

  // Bonuses
  bonusesHeading: "Ngoài Ra, Bạn Sẽ Nhận Thêm",
  bonusesItems: [
    { icon: "🎨", title: "Bộ màu HSB 6 Palette sẵn dùng", desc: "Hệ thống màu khoa học theo mô hình HSB, đã được test tương phản WCAG AA, sẵn sàng import vào Figma." },
    { icon: "📏", title: "Template Spacing System 8px", desc: "File Figma với đầy đủ spacing scale, component grid, và annotation kit để bàn giao cho Developer." },
    { icon: "✍️", title: "Checklist UX Writing 50 điểm", desc: "Danh sách kiểm tra microcopy cho mọi màn hình: nút, form, thông báo lỗi, trạng thái rỗng." },
  ],

  // Before/After
  beforeAfterHeading: "Sự Lột Xác Về Tư Duy Nhận Thức",
  beforeAfterHeading2: "Bạn Chắc Chắn Đạt Được",
  beforeItems: [
    "Thiết kế \"vì trông đẹp\" — không có luận điểm để bảo vệ",
    "Bị sếp/khách hàng bác liên tục, không biết phản bác",
    "File Figma hỗn độn, Developer không hiểu",
    "Copy UI từ Dribbble mà không hiểu nguyên lý",
    "Form phức tạp, tỷ lệ bỏ form cao",
    "Mất tự tin khi pitching hoặc review thiết kế",
  ],
  afterItems: [
    "Lập luận bằng Fitts's Law, WCAG AA, Cognitive Load",
    "Tự tin bảo vệ mọi quyết định thiết kế với số liệu cụ thể",
    "Bàn giao file có hệ thống — Developer code ngay không hỏi",
    "Hiểu nguyên lý đằng sau mỗi pattern UI/UX",
    "Form tối giản, completion rate tăng 20-35%",
    "Trở thành người được tham khảo trong team",
  ],

  // Instructor
  instructorLabel: "Người đứng sau hệ thống",
  instructorHeading: "Nguyễn Đức Việt",
  instructorHeading2: "Kỹ Sư Bách Khoa · 15 Năm Thực Chiến",
  instructorName: "Nguyễn Đức Việt",
  instructorTitle: "Giảng viên UI/UX tại FPT Arena · Founder Fedu.vn",
  instructorBio: "Là kỹ sư tốt nghiệp Đại học Bách Khoa TP.HCM, tôi tiếp cận thiết kế theo tư duy kỹ thuật: mọi quyết định đều phải có căn cứ đo lường được. Sau 15 năm xây dựng sản phẩm số và giảng dạy tại FPT Arena, tôi nhận ra rằng sự khác biệt giữa designer giỏi và designer xuất sắc nằm ở khả năng lập luận — không phải ở con mắt thẩm mỹ.",
  instructorCredentials: [
    { label: "Nền tảng học thuật", value: "Kỹ sư Đại học Bách Khoa TP.HCM — tư duy phân tích hệ thống, không phải nghệ thuật cảm tính" },
    { label: "Kinh nghiệm thực chiến", value: "15 năm thiết kế và phát triển sản phẩm số cho doanh nghiệp Việt Nam và quốc tế" },
    { label: "Giảng dạy", value: "Giảng viên UI/UX tại FPT Arena — đào tạo hàng trăm designer và developer mỗi năm" },
  ],

  // CTA
  ctaHeading: "SẴN SÀNG ĐỂ TƯ DUY NHƯ",
  ctaHeading2: "MỘT KỸ SƯ UI/UX THỰC THỤ?",
  ctaSub: "Trong khi những Designer hay Developer khác ngoài kia vẫn đang vật lộn sao chép chắp vá, cãi vã không hồi kết và bất lực nhìn tỷ lệ chuyển đổi bốc hơi... bạn sẽ đang điềm tĩnh làm chủ hệ thống thông số kỹ thuật, tự tin bảo vệ mọi bản vẽ bằng logic khoa học đanh thép.",
};

export function loadUiuxContent(): UiuxContent {
  try {
    const raw = localStorage.getItem(UIUX_CONTENT_KEY);
    if (!raw) return DEFAULT_UIUX_CONTENT;
    const parsed = JSON.parse(raw) as UiuxContent;
    if (parsed._v !== UIUX_CONTENT_VERSION) return DEFAULT_UIUX_CONTENT;
    // Merge with defaults to handle new fields
    return { ...DEFAULT_UIUX_CONTENT, ...parsed };
  } catch {
    return DEFAULT_UIUX_CONTENT;
  }
}

export function saveUiuxContent(content: UiuxContent): void {
  localStorage.setItem(
    UIUX_CONTENT_KEY,
    JSON.stringify({ ...content, _v: UIUX_CONTENT_VERSION })
  );
  window.dispatchEvent(new CustomEvent("uiux-content-updated"));
}

export function resetUiuxContent(): void {
  localStorage.removeItem(UIUX_CONTENT_KEY);
  window.dispatchEvent(new CustomEvent("uiux-content-updated"));
}
