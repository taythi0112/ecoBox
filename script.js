/* =========================================================
   EcoBox – script.js
   Hệ thống xử lý tương tác, phân trang sản phẩm, giỏ hàng,
   yêu thích, tra cứu bảo hành, xem nhanh và thanh toán.
   ========================================================= */

const FREE_SHIP = 500000;

/* ---------- DỮ LIỆU SẢN PHẨM (19 sản phẩm phong phú) ---------- */
const PRODUCTS = [
  {
    id: 1,
    name: 'Hộp cơm tái chế 1 ngăn EcoBox Basic 800ml',
    cat: 'hop-com',
    price: 129000,
    old: 169000,
    color: '#16396b',
    bg: '#d6ebf7',
    tag: 'new',
    rating: 4.9,
    reviews: 42,
    capacity: '800ml',
    material: 'Nhựa PP số 5 tái chế (BPA Free)',
    temp: '-20°C đến 120°C',
    desc: 'Thiết kế 1 ngăn rộng rãi, nắp khóa gài 4 cạnh trợ lực chống tràn tuyệt đối. Thích hợp cho bữa cơm văn phòng gọn gàng.',
    img: ''
  },
  {
    id: 2,
    name: 'Hộp cơm 3 ngăn EcoBox Lunch Pro 1100ml',
    cat: 'hop-com',
    price: 189000,
    old: 249000,
    color: '#f0647c',
    bg: '#fde3ea',
    tag: 'hot',
    rating: 5.0,
    reviews: 86,
    capacity: '1100ml',
    material: 'Nhựa PP số 5 tái chế cao cấp',
    temp: '-20°C đến 120°C',
    desc: '3 ngăn phân chia khoa học: cơm, thức ăn mặn và rau riêng biệt. Giữ trọn hương vị từng món, dùng được lò vi sóng.',
    img: ''
  },
  {
    id: 3,
    name: 'Hộp cơm văn phòng 2 tầng EcoBox Tower 1400ml',
    cat: 'hop-com',
    price: 229000,
    old: 299000,
    color: '#3f7fc0',
    bg: '#dcecf8',
    tag: '',
    rating: 4.8,
    reviews: 35,
    capacity: '1400ml',
    material: 'Nhựa PP số 5 tái chế 2 lớp cách nhiệt',
    temp: '-20°C đến 120°C',
    desc: 'Dung tích khủng 1400ml chia làm 2 tầng xếp chồng thông minh, tặng kèm bộ thìa đũa kháng khuẩn gài gọn trên nắp.',
    img: ''
  },
  {
    id: 4,
    name: 'Hộp cơm giữ nhiệt nắp hít EcoBox Thermal 900ml',
    cat: 'hop-com',
    price: 259000,
    old: 320000,
    color: '#16396b',
    bg: '#e4eef8',
    tag: 'new',
    rating: 4.9,
    reviews: 29,
    capacity: '900ml',
    material: 'Nhựa PP tái chế + Lớp chân không',
    temp: '-10°C đến 110°C',
    desc: 'Nắp van thoát hơi thông minh mở trước khi quay lò vi sóng, gioăng silicone đôi giữ nhiệt ấm nóng đến 4 tiếng.',
    img: ''
  },
  {
    id: 5,
    name: 'Hộp cơm sinh viên nhỏ gọn EcoBox Student 700ml',
    cat: 'hop-com',
    price: 99000,
    old: 130000,
    color: '#5aa9d6',
    bg: '#e3f3fb',
    tag: '',
    rating: 4.7,
    reviews: 64,
    capacity: '700ml',
    material: 'Nhựa PP số 5 tinh lọc an toàn',
    temp: '-20°C đến 120°C',
    desc: 'Giá mềm dành cho học sinh - sinh viên, siêu nhẹ chỉ 180g, vừa vặn mọi ngăn balo mang đi học hằng ngày.',
    img: ''
  },
  {
    id: 6,
    name: 'Hộp trữ đông EcoBox Freeze 500ml (Set 3 hộp)',
    cat: 'tru-dong',
    price: 149000,
    old: 195000,
    color: '#5aa9d6',
    bg: '#e3f3fb',
    tag: 'hot',
    rating: 4.9,
    reviews: 73,
    capacity: '500ml x 3',
    material: 'Nhựa PP dẻo chuyên dụng tủ đông',
    temp: '-30°C đến 100°C',
    desc: 'Chất liệu nhựa dẻo không bị nứt vỡ khi đông đá nhiệt độ âm sâu. Xếp chồng tiết kiệm 50% diện tích tủ lạnh.',
    img: ''
  },
  {
    id: 7,
    name: 'Hộp trữ đông chữ nhật EcoBox Freeze Max 1200ml',
    cat: 'tru-dong',
    price: 99000,
    old: 0,
    color: '#16396b',
    bg: '#e4eef8',
    tag: 'new',
    rating: 4.8,
    reviews: 19,
    capacity: '1200ml',
    material: 'Nhựa PP trong suốt tái chế',
    temp: '-25°C đến 110°C',
    desc: 'Thân hộp trong suốt dễ nhận biết thực phẩm bên trong, nắp viền gờ kín khít ngăn lẫn mùi tuyệt đối.',
    img: ''
  },
  {
    id: 8,
    name: 'Hộp trữ đông chia 4 ngăn EcoBox Fresh Prep',
    cat: 'tru-dong',
    price: 119000,
    old: 150000,
    color: '#f0647c',
    bg: '#fbd9e6',
    tag: '',
    rating: 4.8,
    reviews: 31,
    capacity: '1000ml',
    material: 'Nhựa PP số 5 đạt chuẩn FDA',
    temp: '-20°C đến 100°C',
    desc: 'Lựa chọn số 1 cho mẹ chuẩn bị đồ ăn dặm hoặc thực phẩm meal-prep đầu tuần cho cả gia đình.',
    img: ''
  },
  {
    id: 9,
    name: 'Set 2 hộp trữ thực phẩm dẻo EcoBox Cryo 850ml',
    cat: 'tru-dong',
    price: 139000,
    old: 175000,
    color: '#3f7fc0',
    bg: '#e0edf8',
    tag: '',
    rating: 4.9,
    reviews: 22,
    capacity: '850ml x 2',
    material: 'Nhựa PP đàn hồi tái chế',
    temp: '-30°C đến 100°C',
    desc: 'Đáy hộp thiết kế rãnh nổi giúp rã đông thực phẩm nhanh hơn và không bị đọng nước bề mặt.',
    img: ''
  },
  {
    id: 10,
    name: 'Hộp bảo quản rau củ tươi lâu EcoBox Crisp 1800ml',
    cat: 'tru-dong',
    price: 179000,
    old: 220000,
    color: '#16396b',
    bg: '#d9e9f5',
    tag: 'new',
    rating: 5.0,
    reviews: 17,
    capacity: '1800ml',
    material: 'Nhựa PP tái chế kháng khuẩn',
    temp: '-10°C đến 100°C',
    desc: 'Có khay lọc nước bên dưới đáy giúp rau thơm, hoa quả luôn ráo nước và tươi lâu hơn đến 2 tuần.',
    img: ''
  },
  {
    id: 11,
    name: 'Hộp đựng mang đi EcoBox Mini Pocket 400ml',
    cat: 'mang-di',
    price: 79000,
    old: 99000,
    color: '#3f7fc0',
    bg: '#e0edf8',
    tag: '',
    rating: 4.7,
    reviews: 48,
    capacity: '400ml',
    material: 'Nhựa PP tái chế siêu bền',
    temp: '-20°C đến 120°C',
    desc: 'Nhỏ gọn bỏ vừa túi xách, quai silicon móc tiện lợi mang theo hạt ngũ cốc, sữa chua hoặc đồ ăn vặt.',
    img: ''
  },
  {
    id: 12,
    name: 'Hộp đựng trái cây & hạt EcoBox Snack 350ml',
    cat: 'mang-di',
    price: 69000,
    old: 0,
    color: '#16396b',
    bg: '#d9e9f5',
    tag: 'new',
    rating: 4.8,
    reviews: 33,
    capacity: '350ml',
    material: 'Nhựa PP số 5 an toàn',
    temp: '-20°C đến 100°C',
    desc: 'Nắp vặn xoáy cao su chống rò rỉ nước trái cây, bề mặt nhám mờ chống trầy xước.',
    img: ''
  },
  {
    id: 13,
    name: 'Hộp cơm trẻ em quai xách EcoBox Kids 600ml',
    cat: 'mang-di',
    price: 109000,
    old: 145000,
    color: '#f0647c',
    bg: '#fde3ea',
    tag: '',
    rating: 4.9,
    reviews: 58,
    capacity: '600ml',
    material: 'Nhựa PP tái chế đạt chuẩn an toàn trẻ em',
    temp: '-20°C đến 110°C',
    desc: 'Màu sắc pastel xinh xắn, quai xách gập gọn linh hoạt, góc cạnh được mài nhẵn an toàn cho bé.',
    img: ''
  },
  {
    id: 14,
    name: 'Bình nước cá nhân EcoBottle Recycled 650ml',
    cat: 'mang-di',
    price: 89000,
    old: 119000,
    color: '#5aa9d6',
    bg: '#e3f3fb',
    tag: 'hot',
    rating: 4.9,
    reviews: 95,
    capacity: '650ml',
    material: 'Nhựa PP tái chế trong suốt',
    temp: '-10°C đến 95°C',
    desc: 'Miệng bình rộng dễ vệ sinh và cho đá viên, nắp bật một chạm kèm khóa chống bật vô ý.',
    img: ''
  },
  {
    id: 15,
    name: 'Túi giữ nhiệt canvas lót bạc EcoBag EcoBox',
    cat: 'mang-di',
    price: 115000,
    old: 150000,
    color: '#16396b',
    bg: '#dcecf8',
    tag: '',
    rating: 4.9,
    reviews: 44,
    capacity: 'Vừa 2 hộp cơm + bình nước',
    material: 'Vải Canvas mộc + Lớp màng nhôm cách nhiệt',
    temp: 'Giữ nóng/lạnh 4 - 6 tiếng',
    desc: 'Thiết kế tối giản phong cách Nhật, quai xách may chéo chịu lực đến 5kg, chống thấm nước bên trong.',
    img: ''
  },
  {
    id: 16,
    name: 'Combo quà tặng "Bữa ăn xanh" (3 hộp + Túi canvas)',
    cat: 'combo',
    price: 399000,
    old: 560000,
    color: '#5aa9d6',
    bg: '#e6f1f9',
    tag: 'hot',
    rating: 5.0,
    reviews: 112,
    capacity: '1 Hộp cơm 3 ngăn + 2 Hộp trữ đông + 1 Túi',
    material: 'Trọn bộ hộp PP tái chế cao cấp',
    temp: '-20°C đến 120°C',
    desc: 'Set quà tặng hoàn hảo cho lối sống xanh, đóng gói trong hộp kraft sinh học sang trọng kèm thiệp viết tay.',
    img: ''
  },
  {
    id: 17,
    name: 'Combo văn phòng cả tuần EcoBox Week (5 hộp cơm)',
    cat: 'combo',
    price: 549000,
    old: 840000,
    color: '#3f7fc0',
    bg: '#dcecf8',
    tag: '',
    rating: 4.9,
    reviews: 67,
    capacity: '5 Hộp 800ml cho 5 ngày làm việc',
    material: 'Nhựa PP số 5 tái chế',
    temp: '-20°C đến 120°C',
    desc: 'Giải pháp chuẩn bị bữa trưa đầu tuần gọn gàng, tiết kiệm đến 35% so với mua từng hộp riêng lẻ.',
    img: ''
  },
  {
    id: 18,
    name: 'Combo sinh viên khởi đầu xanh EcoBox GreenStart',
    cat: 'combo',
    price: 219000,
    old: 289000,
    color: '#16396b',
    bg: '#d6ebf7',
    tag: 'new',
    rating: 4.8,
    reviews: 39,
    capacity: '1 Hộp cơm 1 ngăn + 1 Bình nước 650ml + Túi rút',
    material: 'Nhựa PP tái chế',
    temp: '-20°C đến 120°C',
    desc: 'Set cơ bản nhất cho bạn trẻ bắt đầu hành trình tự nấu ăn và cắt giảm đồ nhựa dùng 1 lần.',
    img: ''
  },
  {
    id: 19,
    name: 'Combo gia đình toàn diện EcoBox Family (6 hộp)',
    cat: 'combo',
    price: 459000,
    old: 620000,
    color: '#16396b',
    bg: '#d6ebf7',
    tag: '',
    rating: 4.9,
    reviews: 43,
    capacity: 'Set 6 hộp trữ đông và chia đồ ăn',
    material: 'Nhựa PP số 5 tủ đông chuyên dụng',
    temp: '-30°C đến 100°C',
    desc: 'Được các bà nội trợ tin chọn để phân loại thịt cá và bảo quản đồ ăn sạch sẽ trong tuần.',
    img: '',
    sold: true
  }
];

const BEST_IDS = [1, 2, 6, 16, 14, 17];
const CAT_NAMES = {
  all: 'Tất cả sản phẩm',
  'hop-com': 'Hộp cơm văn phòng',
  'tru-dong': 'Hộp trữ đông & làm đá',
  'mang-di': 'Mang đi mỗi ngày',
  combo: 'Combo quà tặng tiết kiệm'
};

/* ---------- DỮ LIỆU BÀI VIẾT TIN TỨC ---------- */
const NEWS_ARTICLES = [
  {
    id: 1,
    date: '20/10/2026',
    title: 'Vì sao nên chuyển sang hộp cơm tái sử dụng cho bữa ăn văn phòng?',
    desc: 'Mỗi năm một người làm việc văn phòng thải ra trung bình hơn 250 chiếc hộp xốp và túi nilon...',
    readTime: '4 phút đọc',
    author: 'Nhóm nghiên cứu EcoBox',
    tag: 'Lối sống xanh',
    content: `
      <p>Theo khảo sát thực tế tại các tòa nhà văn phòng, thói quen gọi cơm trưa giao tận nơi tạo ra một lượng rác thải khổng lồ gồm hộp xốp, hộp nhựa mỏng, túi nilon và thìa đũa dùng một lần.</p>
      <p>Không chỉ gây ô nhiễm nghiêm trọng khi phải mất hàng trăm năm để phân hủy, các loại hộp xốp tái chế kém chất lượng khi đựng thức ăn nóng còn có nguy cơ thôi nhiễm các chất độc hại vào cơ thể.</p>
      <div class="news-reader__callout">
        "Chuyển sang sử dụng hộp cơm cá nhân mang từ nhà không chỉ bảo vệ sức khỏe và túi tiền mà còn giảm ngay 250+ món rác nhựa mỗi năm."
      </div>
      <p>Với chất liệu nhựa PP số 5 an toàn, chịu nhiệt tới 120°C và nắp khóa silicone kín khít, EcoBox giúp bạn tự tin mang theo những bữa ăn đủ chất, nóng hổi và giữ trọn vẹn hương vị.</p>
    `
  },
  {
    id: 2,
    date: '15/10/2026',
    title: 'Quy trình nhóm sinh viên thiết kế và thử nghiệm mẫu hộp nhựa tái chế',
    desc: 'Hành trình từ bản vẽ CAD 3D đầu tiên đến xưởng thử nghiệm độ chịu lực và gioăng chống tràn...',
    readTime: '6 phút đọc',
    author: 'Đại diện Nhóm 14',
    tag: 'Nhật ký đồ án',
    content: `
      <p>Bắt đầu từ đề tài môn học Đổi mới Sáng tạo và Phát triển Sản phẩm Xanh, nhóm gồm 5 bạn sinh viên đã đặt ra câu hỏi: Liệu chúng ta có thể tạo ra một chiếc hộp cơm từ vật liệu tái chế nhưng đạt tính thẩm mỹ và độ bền tương đương các thương hiệu cao cấp?</p>
      <p>Chúng tôi đã trải qua 8 phiên bản thử nghiệm in 3D để hoàn thiện góc vát cạnh, vị trí ngàm khóa và độ dày thành hộp nhằm tối ưu hóa việc phân bố lực.</p>
      <div class="news-reader__callout">
        "Thử nghiệm khó khăn nhất là bài kiểm tra chống rò rỉ: đổ đầy nước sôi có dầu mỡ, lắc mạnh trong 10 phút và xoay 360 độ mà không được rò rỉ dù chỉ một giọt."
      </div>
      <p>Sản phẩm hoàn thiện đạt tiêu chuẩn tiếp xúc thực phẩm trực tiếp, chứng minh rằng sinh viên hoàn toàn có thể tạo ra những sản phẩm hữu ích cho cộng đồng.</p>
    `
  },
  {
    id: 3,
    date: '10/10/2026',
    title: 'Hướng dẫn bảo quản hộp đúng cách để dùng bền trên 3 năm',
    desc: 'Những lưu ý đơn giản nhưng ít người biết khi sử dụng hộp trong lò vi sóng và máy rửa chén...',
    readTime: '3 phút đọc',
    author: 'Bộ phận Kỹ thuật EcoCare',
    tag: 'Mẹo hay sử dụng',
    content: `
      <p>Một chiếc hộp EcoBox được thiết kế để sử dụng hơn 1000 lần. Tuy nhiên để giữ cho hộp luôn sáng bóng như mới và gioăng silicone không bị biến dạng, bạn nên lưu ý các điểm sau:</p>
      <p><b>1. Khi quay lò vi sóng:</b> Luôn mở van thoát khí trên nắp hoặc mở hé chốt khóa để áp suất bên trong không làm cong vênh nắp hộp. Thời gian quay khuyến nghị từ 2 - 3 phút ở công suất trung bình.</p>
      <p><b>2. Khi rửa thức ăn nhiều dầu mỡ:</b> Dùng nước ấm và bọt biển mềm. Tránh dùng búi sắt chà xát làm xước lớp bảo vệ bề mặt.</p>
      <div class="news-reader__callout">
        "Mẹo khử mùi thức ăn đậm màu: Ngâm hộp với nước ấm pha một thìa baking soda hoặc vài lát chanh tươi trong 15 phút, hộp sẽ sạch tinh tươm."
      </div>
    `
  },
  {
    id: 4,
    date: '05/10/2026',
    title: 'Ra mắt combo quà tặng doanh nghiệp & chương trình Thu hộp cũ đổi quà mới',
    desc: 'Hợp tác cùng các câu lạc bộ sinh viên mở các trạm xanh thu gom rác nhựa tái chế...',
    readTime: '5 phút đọc',
    author: 'Ban Truyền thông EcoBox',
    tag: 'Sự kiện xanh',
    content: `
      <p>Nhằm thúc đẩy vòng đời tuần hoàn của sản phẩm nhựa, EcoBox chính thức khởi động chương trình <b>EcoCycle - Thu cũ Đổi mới</b> tại 4 trạm trải nghiệm ở Hà Nội, TP.HCM, Đà Nẵng và Cần Thơ.</p>
      <p>Bất kỳ ai mang các hộp nhựa cũ đã qua sử dụng đến trạm đều được tặng voucher giảm giá 20% khi mua sản phẩm mới, đồng thời số nhựa này sẽ được phân loại đưa về nhà máy tái chế đạt chuẩn.</p>
      <div class="news-reader__callout">
        "Mục tiêu năm 2026: Thu gom và tái chế hơn 50.000 món đồ nhựa sinh hoạt cùng cộng đồng học sinh - sinh viên."
      </div>
    `
  }
];

/* ---------- TIỆN ÍCH DÙNG CHUNG ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const money = n => n.toLocaleString('vi-VN') + '₫';
const discount = p => p.old ? Math.round((1 - p.price / p.old) * 100) : 0;

/* HÌNH MINH HỌA VECTOR SVG ĐẸP MẮT THEO TỪNG LOẠI HỘP */
function boxSVG(p) {
  const c = p.color || '#16396b';
  if (p.cat === 'hop-com') {
    return `<svg viewBox="0 0 140 110" aria-hidden="true">
      <ellipse cx="70" cy="98" rx="48" ry="7" fill="rgba(0,0,0,.08)"/>
      <rect x="20" y="44" width="100" height="50" rx="14" fill="${c}"/>
      <rect x="14" y="30" width="112" height="22" rx="10" fill="${c}" opacity=".85"/>
      <rect x="26" y="34" width="36" height="6" rx="3" fill="#ffffff" opacity=".6"/>
      <path d="M70 82c-10-2-15-10-13-20 10 0 18 6 18 15 0 3-1 4-5 5z" fill="#ffffff" opacity=".95"/>
      <rect x="68" y="48" width="4" height="42" rx="2" fill="rgba(255,255,255,.25)"/>
    </svg>`;
  } else if (p.cat === 'tru-dong') {
    return `<svg viewBox="0 0 140 110" aria-hidden="true">
      <ellipse cx="70" cy="98" rx="46" ry="7" fill="rgba(0,0,0,.08)"/>
      <rect x="22" y="46" width="96" height="48" rx="12" fill="${c}" opacity=".88"/>
      <rect x="16" y="34" width="108" height="18" rx="8" fill="#5aa9d6"/>
      <rect x="28" y="38" width="40" height="5" rx="2.5" fill="#fff" opacity=".7"/>
      <circle cx="70" cy="70" r="14" fill="rgba(255,255,255,.3)"/>
      <path d="M70 60v20M60 70h20" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`;
  } else if (p.cat === 'mang-di') {
    return `<svg viewBox="0 0 140 110" aria-hidden="true">
      <ellipse cx="70" cy="98" rx="32" ry="6" fill="rgba(0,0,0,.08)"/>
      <rect x="42" y="28" width="56" height="68" rx="18" fill="${c}"/>
      <rect x="50" y="16" width="40" height="16" rx="7" fill="#cfeaf8"/>
      <rect x="62" y="10" width="16" height="8" rx="4" fill="${c}"/>
      <circle cx="70" cy="62" r="12" fill="#fff" opacity=".85"/>
      <path d="M70 68c-4-1-6-4-5-8 4 0 7 2 7 6 0 1 0 1-2 2z" fill="${c}"/>
    </svg>`;
  } else {
    // combo
    return `<svg viewBox="0 0 140 110" aria-hidden="true">
      <ellipse cx="70" cy="98" rx="52" ry="7" fill="rgba(0,0,0,.08)"/>
      <rect x="24" y="52" width="92" height="42" rx="12" fill="${c}"/>
      <rect x="34" y="24" width="72" height="32" rx="10" fill="#f0647c" opacity=".9"/>
      <rect x="30" y="18" width="80" height="12" rx="5" fill="#5aa9d6"/>
      <path d="M70 12v86" stroke="#ffffff" stroke-width="3" stroke-dasharray="4 2"/>
    </svg>`;
  }
}

const imageOf = p => p.img ? `<img src="${p.img}" alt="${p.name}" loading="lazy">` : boxSVG(p);

/* ---------- QUẢN LÝ DANH SÁCH YÊU THÍCH (WISHLIST) ---------- */
let wishlist = [];
try { wishlist = JSON.parse(localStorage.getItem('ecobox_wishlist')) || []; } catch (e) { wishlist = []; }
const saveWishlist = () => { try { localStorage.setItem('ecobox_wishlist', JSON.stringify(wishlist)); } catch (e) { } };

function toggleWishlist(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const idx = wishlist.indexOf(id);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    toast(`Đã xóa "${p.name}" khỏi mục yêu thích`);
  } else {
    wishlist.push(id);
    toast(`Đã thêm "${p.name}" vào danh sách yêu thích ❤️`);
  }
  saveWishlist();
  updateWishlistUI();
  renderGrid();
  renderBestGrid();
}

function updateWishlistUI() {
  const count = wishlist.length;
  if ($('#wishlistCount')) $('#wishlistCount').textContent = count;
  if ($('#wishDrawerCount')) $('#wishDrawerCount').textContent = count;
  if ($('#bnavWishCount')) $('#bnavWishCount').textContent = count;

  const box = $('#wishlistItems');
  if (!box) return;
  if (!wishlist.length) {
    box.innerHTML = '<p class="cart-empty">Bạn chưa lưu sản phẩm yêu thích nào...</p>';
    return;
  }
  box.innerHTML = wishlist.map(id => {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return '';
    return `
      <div class="cart-item">
        <div class="cart-item__img" style="--bg:${p.bg}">${imageOf(p)}</div>
        <div>
          <h5>${p.name}</h5>
          <div class="price"><b>${money(p.price)}</b></div>
          <button class="btn btn--outline" style="padding:4px 10px; font-size:12px; margin-top:6px;" data-add="${p.id}">Thêm vào giỏ</button>
        </div>
        <button class="remove" data-wish-del="${p.id}" title="Xóa">✕</button>
      </div>
    `;
  }).join('');
}

/* ---------- TẠO HTML CHO THẺ SẢN PHẨM ---------- */
function cardHTML(p) {
  const d = discount(p);
  const badge = p.sold
    ? ''
    : d
      ? `<span class="badge">-${d}%</span>`
      : p.tag === 'new'
        ? '<span class="badge badge--new">MỚI</span>'
        : p.tag === 'hot'
          ? '<span class="badge">HOT</span>'
          : '';

  const isFav = wishlist.includes(p.id);

  return `
  <article class="card ${p.sold ? 'card--sold' : ''}">
    ${badge}
    <button class="card__wishlist ${isFav ? 'is-fav' : ''}" data-wishlist="${p.id}" aria-label="Yêu thích">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="${isFav ? '#f0647c' : 'none'}" stroke="${isFav ? '#f0647c' : 'currentColor'}" stroke-width="2">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    </button>
    <div class="card__img-wrap">
      <a href="javascript:void(0)" class="card__img" style="--bg:${p.bg}" data-quickview="${p.id}" aria-label="${p.name}">
        ${imageOf(p)}
      </a>
      <button class="card__quickview-btn" data-quickview="${p.id}">
        👁️ Xem nhanh
      </button>
    </div>
    <div class="card__body">
      <div class="card__meta">
        <span class="card__cat">${CAT_NAMES[p.cat] || 'Sản phẩm'}</span>
        <div class="card__rating">⭐ <b>${p.rating}</b> <span>(${p.reviews})</span></div>
      </div>
      <h3 class="card__title"><a href="javascript:void(0)" data-quickview="${p.id}">${p.name}</a></h3>
      <div class="card__specs">
        <span>📐 ${p.capacity}</span>
        <span>♻️ PP #5</span>
      </div>
      <div class="card__foot">
        <div class="price">
          <b>${money(p.price)}</b>
          ${p.old ? `<s>${money(p.old)}</s>` : ''}
        </div>
        <button class="card__add" data-add="${p.id}" aria-label="Thêm vào giỏ">
          ${p.sold ? 'Hết hàng' : '+'}
        </button>
      </div>
    </div>
  </article>`;
}

/* ---------- LỌC, SẮP XẾP & CÁC NÚT PHÂN TRANG (PAGINATION) ---------- */
let currentFilter = 'all';
let priceFilter = 'all';
let sortBy = 'default';
let keyword = '';
let currentPage = 1;
let itemsPerPage = 6;

function getFilteredProducts() {
  let list = PRODUCTS.filter(p => {
    // 1. Lọc theo danh mục
    const matchCat = currentFilter === 'all' || p.cat === currentFilter;
    // 2. Lọc theo từ khóa tìm kiếm
    const matchKey = p.name.toLowerCase().includes(keyword.toLowerCase());
    // 3. Lọc theo khoảng giá
    let matchPrice = true;
    if (priceFilter === 'under100') matchPrice = p.price < 100000;
    else if (priceFilter === '100-200') matchPrice = p.price >= 100000 && p.price <= 200000;
    else if (priceFilter === '200-350') matchPrice = p.price > 200000 && p.price <= 350000;
    else if (priceFilter === 'over350') matchPrice = p.price > 350000;

    return matchCat && matchKey && matchPrice;
  });

  // Sắp xếp
  if (sortBy === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating-desc') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'name-asc') {
    list.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
  }

  return list;
}

function renderPagination(totalItems) {
  const paginationBox = $('#pagination');
  const infoBox = $('#paginationInfo');
  const wrapper = $('#paginationWrapper');
  if (!paginationBox || !infoBox || !wrapper) return;

  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // Điều chỉnh currentPage nếu vượt quá
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  // Nếu không có sản phẩm nào
  if (totalItems === 0) {
    wrapper.style.display = 'none';
    return;
  }
  wrapper.style.display = 'flex';

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);
  infoBox.textContent = `Trang ${currentPage} / ${totalPages} (Hiển thị ${start} - ${end} của ${totalItems} sản phẩm)`;

  // Tạo các nút chuyển trang
  let btnsHTML = '';

  // Nút "‹ Trước"
  btnsHTML += `
    <button class="page-btn page-btn--prev" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''} aria-label="Trang trước">
      ‹ Trước
    </button>
  `;

  // Các nút số trang
  for (let i = 1; i <= totalPages; i++) {
    // Nếu tổng số trang lớn hơn 7, hiển thị kiểu thu gọn thông minh
    if (totalPages > 7) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        btnsHTML += `<button class="page-btn ${i === currentPage ? 'is-active' : ''}" data-page="${i}">${i}</button>`;
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        btnsHTML += `<span class="page-dots">...</span>`;
      }
    } else {
      btnsHTML += `<button class="page-btn ${i === currentPage ? 'is-active' : ''}" data-page="${i}">${i}</button>`;
    }
  }

  // Nút "Sau ›"
  btnsHTML += `
    <button class="page-btn page-btn--next" data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''} aria-label="Trang sau">
      Sau ›
    </button>
  `;

  paginationBox.innerHTML = btnsHTML;
}

function renderGrid(shouldScroll = false) {
  const grid = $('#productGrid');
  const empty = $('#emptyMsg');
  const title = $('#gridTitle');
  const countText = $('#gridCount');

  const filteredList = getFilteredProducts();
  const totalItems = filteredList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  if (currentPage > totalPages) currentPage = 1;

  // Lấy danh sách sản phẩm của trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSlice = filteredList.slice(startIndex, startIndex + itemsPerPage);

  if (grid) {
    grid.innerHTML = currentSlice.map(cardHTML).join('');
  }

  if (empty) empty.hidden = totalItems > 0;

  // Cập nhật tiêu đề & đếm
  if (title) {
    title.textContent = keyword ? `Kết quả cho "${keyword}"` : CAT_NAMES[currentFilter] || 'Sản phẩm nổi bật';
  }
  if (countText) {
    countText.textContent = `Tìm thấy ${totalItems} sản phẩm phù hợp`;
  }

  // Cập nhật trạng thái active cho Tabs
  $$('.tab').forEach(t => t.classList.toggle('is-active', t.dataset.filter === currentFilter));

  // Render các nút phân trang
  renderPagination(totalItems);

  // Cuộn mượt lên đầu danh sách sản phẩm nếu người dùng chuyển trang
  if (shouldScroll) {
    const section = $('#san-pham');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function renderBestGrid() {
  const bestBox = $('#bestGrid');
  if (bestBox) {
    bestBox.innerHTML = BEST_IDS.map(id => {
      const p = PRODUCTS.find(x => x.id === id);
      return p ? cardHTML(p) : '';
    }).join('');
  }
}

// Bắt sự kiện bấm nút phân trang
document.addEventListener('click', e => {
  const pageBtn = e.target.closest('.page-btn');
  if (pageBtn && !pageBtn.disabled) {
    const targetPage = parseInt(pageBtn.dataset.page, 10);
    if (!isNaN(targetPage) && targetPage !== currentPage) {
      currentPage = targetPage;
      renderGrid(true);
    }
  }
});

// Thay đổi số sản phẩm trên mỗi trang
const pageSizeSelect = $('#pageSizeSelect');
if (pageSizeSelect) {
  pageSizeSelect.addEventListener('change', e => {
    itemsPerPage = parseInt(e.target.value, 10) || 6;
    currentPage = 1;
    renderGrid(false);
  });
}

// Bộ lọc giá
const priceSelect = $('#priceFilter');
if (priceSelect) {
  priceSelect.addEventListener('change', e => {
    priceFilter = e.target.value;
    currentPage = 1;
    renderGrid(false);
  });
}

// Sắp xếp
const sortSelect = $('#sortBy');
if (sortSelect) {
  sortSelect.addEventListener('change', e => {
    sortBy = e.target.value;
    currentPage = 1;
    renderGrid(false);
  });
}

// Nút xóa lọc
const resetFilterBtn = $('#resetFilterBtn');
if (resetFilterBtn) {
  resetFilterBtn.addEventListener('click', () => {
    currentFilter = 'all';
    priceFilter = 'all';
    sortBy = 'default';
    keyword = '';
    currentPage = 1;
    if (priceSelect) priceSelect.value = 'all';
    if (sortSelect) sortSelect.value = 'default';
    if ($('#searchInput')) $('#searchInput').value = '';
    renderGrid(true);
    toast('Đã đặt lại toàn bộ bộ lọc sản phẩm');
  });
}

const emptyResetBtn = $('#emptyResetBtn');
if (emptyResetBtn) {
  emptyResetBtn.addEventListener('click', () => {
    if (resetFilterBtn) resetFilterBtn.click();
  });
}

// Sự kiện click chọn danh mục từ menu / tabs
$$('[data-filter]').forEach(el => el.addEventListener('click', e => {
  currentFilter = el.dataset.filter;
  keyword = '';
  currentPage = 1;
  renderGrid(true);
  closeMenu();
}));

/* ---------- GIỎ HÀNG (CART) ---------- */
let cart = [];
try { cart = JSON.parse(localStorage.getItem('ecobox_cart')) || []; } catch (e) { cart = []; }
const saveCart = () => { try { localStorage.setItem('ecobox_cart', JSON.stringify(cart)); } catch (e) { } };

function addToCart(id, qty = 1) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p || p.sold) return;
  const item = cart.find(c => c.id === id);
  item ? (item.qty += qty) : cart.push({ id, qty });
  saveCart();
  renderCart();
  toast(`Đã thêm ${qty > 1 ? qty + ' ' : ''}"${p.name}" vào giỏ hàng 🎉`);
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
  saveCart();
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  renderCart();
  toast('Đã xóa sản phẩm khỏi giỏ hàng');
}

function renderCart() {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  const total = cart.reduce((s, c) => {
    const item = PRODUCTS.find(p => p.id === c.id);
    return s + c.qty * (item ? item.price : 0);
  }, 0);

  if ($('#cartCount')) $('#cartCount').textContent = count;
  if ($('#drawerCount')) $('#drawerCount').textContent = count;
  if ($('#bnavCartCount')) $('#bnavCartCount').textContent = count;
  if ($('#subtotal')) $('#subtotal').textContent = money(total);

  const left = FREE_SHIP - total;
  const shipMsg = $('#shipMsg');
  const shipFill = $('#shipFill');
  if (shipMsg) {
    shipMsg.innerHTML = left > 0
      ? `Mua thêm <b>${money(left)}</b> để được <b>miễn phí vận chuyển</b>`
      : '🎉 Chúc mừng! Đơn hàng của bạn đã đủ điều kiện <b>Freeship</b>!';
  }
  if (shipFill) {
    shipFill.style.width = Math.min(100, (total / FREE_SHIP) * 100) + '%';
  }

  const itemsBox = $('#cartItems');
  if (itemsBox) {
    itemsBox.innerHTML = cart.length
      ? cart.map(c => {
        const p = PRODUCTS.find(x => x.id === c.id);
        if (!p) return '';
        return `
        <div class="cart-item">
          <div class="cart-item__img" style="--bg:${p.bg}">${imageOf(p)}</div>
          <div>
            <h5>${p.name}</h5>
            <div class="price"><b>${money(p.price)}</b></div>
            <div class="qty">
              <button data-dec="${p.id}" aria-label="Giảm">−</button>
              <span>${c.qty}</span>
              <button data-inc="${p.id}" aria-label="Tăng">+</button>
            </div>
          </div>
          <button class="remove" data-del="${p.id}" aria-label="Xóa">✕</button>
        </div>`;
      }).join('')
      : '<p class="cart-empty">Giỏ hàng của bạn đang trống...</p>';
  }

  // Gợi ý sản phẩm kèm theo
  const recoBox = $('#recoList');
  if (recoBox) {
    const reco = PRODUCTS.filter(p => !p.sold && !cart.some(c => c.id === p.id)).slice(0, 6);
    recoBox.innerHTML = reco.map(p => `
      <div class="reco-item">
        <div class="card__img" style="--bg:${p.bg}">${imageOf(p)}</div>
        <div style="font-weight:600; margin-bottom:4px;">${p.name.length > 28 ? p.name.slice(0, 28) + '…' : p.name}</div>
        <b>${money(p.price)}</b>
        <button data-add="${p.id}">+ Thêm vào giỏ</button>
      </div>`).join('');
  }
}

/* ---------- SỰ KIỆN CLICK TOÀN CỤC CHO CÁC NÚT DỮ LIỆU ---------- */
document.addEventListener('click', e => {
  // Thêm / Tăng / Giảm / Xóa giỏ
  const addBtn = e.target.closest('[data-add]');
  if (addBtn) addToCart(+addBtn.dataset.add);

  const incBtn = e.target.closest('[data-inc]');
  if (incBtn) changeQty(+incBtn.dataset.inc, 1);

  const decBtn = e.target.closest('[data-dec]');
  if (decBtn) changeQty(+decBtn.dataset.dec, -1);

  const delBtn = e.target.closest('[data-del]');
  if (delBtn) removeItem(+delBtn.dataset.del);

  // Thả tim yêu thích
  const wishBtn = e.target.closest('[data-wishlist]');
  if (wishBtn) toggleWishlist(+wishBtn.dataset.wishlist);

  const wishDel = e.target.closest('[data-wish-del]');
  if (wishDel) toggleWishlist(+wishDel.dataset.wishDel);

  // Mở Quick View
  const qvBtn = e.target.closest('[data-quickview]');
  if (qvBtn) openQuickView(+qvBtn.dataset.quickview);
});

/* ---------- XEM NHANH SẢN PHẨM (QUICK VIEW MODAL) ---------- */
const quickviewModal = $('#quickviewModal');
const closeQuickview = $('#closeQuickview');
let qvQty = 1;

function openQuickView(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  qvQty = 1;
  const content = $('#quickviewContent');
  if (!content) return;

  const d = discount(p);
  content.innerHTML = `
    <div class="quickview__img-col" style="--bg:${p.bg}">
      ${imageOf(p)}
    </div>
    <div class="quickview__details">
      <span class="quickview__cat">${CAT_NAMES[p.cat] || 'Sản phẩm EcoBox'}</span>
      <h2 class="quickview__title">${p.name}</h2>
      <div class="quickview__meta">
        <span style="color:#ff9800; font-weight:700;">⭐⭐⭐⭐⭐ ${p.rating} / 5</span>
        <span style="color:var(--muted)">(${p.reviews} lượt đánh giá thực tế)</span>
      </div>
      <div class="quickview__price-box">
        <b>${money(p.price)}</b>
        ${p.old ? `<s>${money(p.old)}</s> <span class="badge">-${d}%</span>` : ''}
      </div>
      <p style="font-size:14.5px; color:#2c4464; line-height:1.5;">${p.desc}</p>
      
      <div class="quickview__specs-list">
        <div><b>📐 Dung tích tiêu chuẩn:</b> ${p.capacity}</div>
        <div><b>♻️ Nguyên liệu:</b> ${p.material}</div>
        <div><b>🔥 Khả năng chịu nhiệt:</b> ${p.temp}</div>
        <div><b>🛡️ Bảo hành chính hãng:</b> 6 tháng (1 đổi 1 trong 7 ngày)</div>
      </div>

      <div style="display:flex; align-items:center; gap:14px; margin-top:8px;">
        <span style="font-size:13.5px; font-weight:700;">Số lượng:</span>
        <div class="qty" style="margin-top:0;">
          <button id="qvDec" aria-label="Giảm">−</button>
          <span id="qvQtyDisplay">1</span>
          <button id="qvInc" aria-label="Tăng">+</button>
        </div>
      </div>

      <div class="quickview__actions">
        <button class="btn btn--primary" id="qvAddBtn" style="flex:1;">🛒 Thêm vào giỏ</button>
        <button class="btn btn--outline" id="qvBuyNowBtn" style="flex:1;">⚡ Mua ngay</button>
      </div>
    </div>
  `;

  $('#qvInc').onclick = () => { qvQty++; $('#qvQtyDisplay').textContent = qvQty; };
  $('#qvDec').onclick = () => { if (qvQty > 1) { qvQty--; $('#qvQtyDisplay').textContent = qvQty; } };
  $('#qvAddBtn').onclick = () => {
    addToCart(p.id, qvQty);
    quickviewModal.classList.remove('show');
  };
  $('#qvBuyNowBtn').onclick = () => {
    addToCart(p.id, qvQty);
    quickviewModal.classList.remove('show');
    openCheckout();
  };

  quickviewModal.classList.add('show');
}

if (closeQuickview) closeQuickview.onclick = () => quickviewModal.classList.remove('show');
if (quickviewModal) {
  quickviewModal.addEventListener('click', e => {
    if (e.target === quickviewModal) quickviewModal.classList.remove('show');
  });
}

/* ---------- THANH TOÁN (CHECKOUT MODAL) ---------- */
const checkoutModal = $('#checkoutModal');
const closeCheckout = $('#closeCheckout');
const checkoutBtn = $('#checkoutBtn');

function openCheckout() {
  if (!cart.length) {
    toast('Giỏ hàng đang trống! Vui lòng chọn sản phẩm trước.');
    return;
  }
  closeCart();

  const list = $('#checkoutItemsList');
  const subtotalEl = $('#checkoutSubtotal');
  const shipFeeEl = $('#checkoutShipFee');
  const totalEl = $('#checkoutTotal');

  const subtotal = cart.reduce((s, c) => {
    const item = PRODUCTS.find(p => p.id === c.id);
    return s + c.qty * (item ? item.price : 0);
  }, 0);

  const shipFee = subtotal >= FREE_SHIP ? 0 : 30000;
  const grandTotal = subtotal + shipFee;

  if (list) {
    list.innerHTML = cart.map(c => {
      const p = PRODUCTS.find(x => x.id === c.id);
      if (!p) return '';
      return `
        <div class="checkout-item">
          <span>${p.name} <b>x${c.qty}</b></span>
          <b>${money(p.price * c.qty)}</b>
        </div>
      `;
    }).join('');
  }

  if (subtotalEl) subtotalEl.textContent = money(subtotal);
  if (shipFeeEl) shipFeeEl.textContent = shipFee === 0 ? 'Miễn phí' : money(shipFee);
  if (totalEl) totalEl.textContent = money(grandTotal);

  checkoutModal.classList.add('show');
}

if (checkoutBtn) checkoutBtn.onclick = openCheckout;
if (closeCheckout) closeCheckout.onclick = () => checkoutModal.classList.remove('show');
if (checkoutModal) {
  checkoutModal.addEventListener('click', e => {
    if (e.target === checkoutModal) checkoutModal.classList.remove('show');
  });
}

const orderForm = $('#orderForm');
if (orderForm) {
  orderForm.onsubmit = e => {
    e.preventDefault();
    const name = $('#orderName').value.trim();
    const phone = $('#orderPhone').value.trim();
    const address = $('#orderAddress').value.trim();
    const orderCode = 'EB' + Math.floor(100000 + Math.random() * 900000);

    // Xóa giỏ hàng sau khi đặt thành công
    cart = [];
    saveCart();
    renderCart();

    checkoutModal.classList.remove('show');
    orderForm.reset();

    // Hiển thị thông báo chi tiết
    toast(`🎉 Đặt hàng thành công! Mã đơn: #${orderCode}`);
    alert(`CẢM ƠN QUÝ KHÁCH!\n\nĐơn hàng #${orderCode} của bạn đã được ghi nhận thành công.\nNgười nhận: ${name} (${phone})\nĐịa chỉ: ${address}\n\nĐội ngũ sinh viên EcoBox sẽ liên hệ với bạn trong vòng 15 phút để xác nhận đơn hàng!`);
  };
}

/* ---------- TRUNG TÂM BẢO HÀNH (TABS & TRA CỨU MẪU) ---------- */
const warrantyTabs = $$('.warranty__tab');
warrantyTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.wtab;
    warrantyTabs.forEach(t => t.classList.toggle('is-active', t === tab));
    $$('.warranty__pane').forEach(p => p.hidden = true);
    const activePane = $(`#wtab-${target}`);
    if (activePane) activePane.hidden = false;
  });
});

// Cho phép menu Header nhảy trực tiếp tới đúng Tab bảo hành
$$('[data-tab-target]').forEach(el => {
  el.addEventListener('click', () => {
    const target = el.dataset.tabTarget;
    const tabBtn = $(`[data-wtab="${target}"]`);
    if (tabBtn) tabBtn.click();
  });
});

const warrantyForm = $('#warrantyLookupForm');
if (warrantyForm) {
  warrantyForm.onsubmit = e => {
    e.preventDefault();
    const val = $('#warrantyInput').value.trim();
    const resBox = $('#warrantyResult');
    if (!resBox) return;

    resBox.hidden = false;
    resBox.innerHTML = `
      <div class="warranty-res-card">
        <div class="warranty-res-card__status">🟢 BẢO HÀNH CHÍNH HÃNG HỢP LỆ</div>
        <h5>Mã tra cứu: <b>${val.toUpperCase()}</b></h5>
        <p><b>Khách hàng:</b> Nguyễn Văn An &nbsp;|&nbsp; <b>SĐT:</b> 0900 *** 000</p>
        <p><b>Sản phẩm:</b> Hộp cơm 3 ngăn EcoBox Lunch Pro 1100ml</p>
        <p><b>Ngày mua:</b> 15/08/2026 &nbsp;|&nbsp; <b>Hạn bảo hành:</b> 15/02/2027 (Còn 108 ngày)</p>
        <p style="font-size:13px; color:#2c6e49; font-weight:600;">✓ Hỗ trợ thay thế miễn phí gioăng cao su silicone và ngàm khóa trọn đời bảo hành tại các trạm EcoHub.</p>
      </div>
    `;
    toast('Đã tìm thấy thông tin bảo hành sản phẩm!');
  };
}

const warrantyActForm = $('#warrantyActivateForm');
if (warrantyActForm) {
  warrantyActForm.onsubmit = e => {
    e.preventDefault();
    warrantyActForm.reset();
    toast('⚡ Kích hoạt bảo hành điện tử thành công!');
    alert('Chúc mừng bạn! Sản phẩm của bạn đã được kích hoạt bảo hành điện tử chính hãng 6 tháng trên hệ thống EcoBox.');
  };
}

/* ---------- TIN TỨC & BÀI VIẾT (NEWS & READER MODAL) ---------- */
function renderNews() {
  const newsGrid = $('#newsGrid');
  if (!newsGrid) return;
  newsGrid.innerHTML = NEWS_ARTICLES.map((a, i) => `
    <article class="news-card" data-news-id="${a.id}">
      <div class="news-card__img img${i + 1}">📰</div>
      <time>${a.date}</time>
      <h4>${a.title}</h4>
      <p>${a.desc}</p>
      <span class="read-link">Đọc chi tiết bài viết →</span>
    </article>
  `).join('');
}

const newsModal = $('#newsModal');
const closeNews = $('#closeNews');
const newsReader = $('#newsReaderContent');

function openNews(id) {
  const a = NEWS_ARTICLES.find(x => x.id === id);
  if (!a || !newsReader) return;

  newsReader.innerHTML = `
    <span class="eyebrow" style="color:var(--pink);">${a.tag}</span>
    <h2>${a.title}</h2>
    <div class="news-reader__meta">
      <span>📅 ${a.date}</span>
      <span>✍️ Tác giả: ${a.author}</span>
      <span>⏱️ ${a.readTime}</span>
    </div>
    <div class="news-reader__body">
      ${a.content}
    </div>
    <div style="margin-top:24px; padding-top:16px; border-top:1px solid var(--line); display:flex; justify-content:space-between; align-items:center;">
      <span style="font-size:13.5px; color:var(--muted)">Bạn thấy bài viết này hữu ích? Hãy chia sẻ cùng bạn bè!</span>
      <button class="btn btn--outline" onclick="toast('Đã sao chép liên kết bài viết')">🔗 Chia sẻ bài viết</button>
    </div>
  `;
  newsModal.classList.add('show');
}

document.addEventListener('click', e => {
  const card = e.target.closest('[data-news-id]');
  if (card) openNews(+card.dataset.newsId);
});

if (closeNews) closeNews.onclick = () => newsModal.classList.remove('show');
if (newsModal) {
  newsModal.addEventListener('click', e => {
    if (e.target === newsModal) newsModal.classList.remove('show');
  });
}

const viewAllNewsBtn = $('#viewAllNewsBtn');
if (viewAllNewsBtn) {
  viewAllNewsBtn.onclick = () => {
    openNews(1);
  };
}

/* ---------- DRAWER GIỎ HÀNG, YÊU THÍCH & MENU DI ĐỘNG ---------- */
const overlay = $('#overlay');
const cartDrawer = $('#cartDrawer');
const wishDrawer = $('#wishlistDrawer');
const loginModal = $('#loginModal');
const nav = $('#nav');

function openCart() {
  if (cartDrawer) {
    cartDrawer.classList.add('open');
    cartDrawer.setAttribute('aria-hidden', 'false');
  }
  if (overlay) overlay.classList.add('show');
}

function closeCart() {
  if (cartDrawer) {
    cartDrawer.classList.remove('open');
    cartDrawer.setAttribute('aria-hidden', 'true');
  }
  if (!wishDrawer || !wishDrawer.classList.contains('open')) {
    if (overlay) overlay.classList.remove('show');
  }
}

function openWishlist() {
  updateWishlistUI();
  if (wishDrawer) {
    wishDrawer.classList.add('open');
    wishDrawer.setAttribute('aria-hidden', 'false');
  }
  if (overlay) overlay.classList.add('show');
}

function closeWishlist() {
  if (wishDrawer) {
    wishDrawer.classList.remove('open');
    wishDrawer.setAttribute('aria-hidden', 'true');
  }
  if (!cartDrawer || !cartDrawer.classList.contains('open')) {
    if (overlay) overlay.classList.remove('show');
  }
}

function openMenu() {
  if (nav) nav.classList.add('open');
  if (overlay) overlay.classList.add('show');
}

function closeMenu() {
  if (nav) nav.classList.remove('open');
  if (!cartDrawer || !cartDrawer.classList.contains('open')) {
    if (!wishDrawer || !wishDrawer.classList.contains('open')) {
      if (overlay) overlay.classList.remove('show');
    }
  }
}

if ($('#cartBtn')) $('#cartBtn').onclick = openCart;
if ($('#closeCart')) $('#closeCart').onclick = closeCart;
if ($('#wishlistBtn')) $('#wishlistBtn').onclick = openWishlist;
if ($('#closeWishlist')) $('#closeWishlist').onclick = closeWishlist;
if ($('#menuToggle')) $('#menuToggle').onclick = openMenu;

// Nút thêm tất cả yêu thích vào giỏ
const addAllWishlistBtn = $('#addAllWishlistBtn');
if (addAllWishlistBtn) {
  addAllWishlistBtn.onclick = () => {
    if (!wishlist.length) return toast('Danh sách yêu thích đang trống');
    wishlist.forEach(id => addToCart(id, 1));
    closeWishlist();
    openCart();
    toast('Đã thêm toàn bộ sản phẩm yêu thích vào giỏ hàng!');
  };
}

// Mobile Bottom Navigation Bar events
if ($('#bnavWishlist')) $('#bnavWishlist').onclick = openWishlist;
if ($('#bnavCart')) $('#bnavCart').onclick = openCart;

if (overlay) {
  overlay.onclick = () => {
    closeCart();
    closeWishlist();
    closeMenu();
  };
}

/* ---------- TÀI KHOẢN & ĐĂNG NHẬP ---------- */
if ($('#accountBtn')) $('#accountBtn').onclick = () => loginModal.classList.add('show');
if ($('#closeLogin')) $('#closeLogin').onclick = () => loginModal.classList.remove('show');
if (loginModal) {
  loginModal.addEventListener('click', e => {
    if (e.target === loginModal) loginModal.classList.remove('show');
  });
}
if ($('#toForgot')) {
  $('#toForgot').onclick = e => {
    e.preventDefault();
    $('#loginView').hidden = true;
    $('#forgotView').hidden = false;
  };
}
if ($('#toLogin')) {
  $('#toLogin').onclick = e => {
    e.preventDefault();
    $('#forgotView').hidden = true;
    $('#loginView').hidden = false;
  };
}
if ($('#loginForm')) {
  $('#loginForm').onsubmit = e => {
    e.preventDefault();
    loginModal.classList.remove('show');
    toast('Đăng nhập thành công! Chào mừng bạn quay trở lại.');
  };
}
if ($('#forgotForm')) {
  $('#forgotForm').onsubmit = e => {
    e.preventDefault();
    loginModal.classList.remove('show');
    toast('Đã gửi liên kết khôi phục mật khẩu vào email của bạn.');
  };
}
if ($('#newsletterForm')) {
  $('#newsletterForm').onsubmit = e => {
    e.preventDefault();
    e.target.reset();
    toast('Cảm ơn bạn! Đội ngũ EcoBox sẽ gửi catalogue và liên hệ sớm.');
  };
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeCart();
    closeWishlist();
    closeMenu();
    if (loginModal) loginModal.classList.remove('show');
    if (quickviewModal) quickviewModal.classList.remove('show');
    if (checkoutModal) checkoutModal.classList.remove('show');
    if (newsModal) newsModal.classList.remove('show');
  }
});

/* ---------- TÌM KIẾM SẢN PHẨM NHANH ---------- */
const searchBtn = $('#searchBtn');
const searchbar = $('#searchbar');
const searchInput = $('#searchInput');
const searchForm = $('#searchForm');
const clearSearchBtn = $('#clearSearchBtn');

if (searchBtn) {
  searchBtn.onclick = () => {
    searchbar.classList.toggle('open');
    if (searchbar.classList.contains('open') && searchInput) {
      searchInput.focus();
    }
  };
}

if (clearSearchBtn) {
  clearSearchBtn.onclick = () => {
    searchbar.classList.remove('open');
    if (searchInput) searchInput.value = '';
    if (keyword !== '') {
      keyword = '';
      currentPage = 1;
      renderGrid(true);
    }
  };
}

if (searchForm) {
  searchForm.onsubmit = e => {
    e.preventDefault();
    keyword = searchInput.value.trim();
    currentPage = 1;
    renderGrid(true);
    searchbar.classList.remove('open');
  };
}

/* ---------- HERO SLIDER TỰ ĐỘNG VÀ VUỐT ---------- */
(function initHeroSlider() {
  const track = $('#heroTrack');
  const slides = $$('.hero__slide');
  const dotsBox = $('#heroDots');
  if (!track || !slides.length || !dotsBox) return;

  let i = 0;
  let timer;

  dotsBox.innerHTML = '';
  slides.forEach((_, n) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', 'Chuyển slide ' + (n + 1));
    b.onclick = () => go(n);
    dotsBox.appendChild(b);
  });

  function go(n) {
    i = (n + slides.length) % slides.length;
    track.style.transform = `translateX(-${i * 100}%)`;
    $$('button', dotsBox).forEach((d, k) => d.classList.toggle('active', k === i));
    restart();
  }

  function restart() {
    clearInterval(timer);
    timer = setInterval(() => go(i + 1), 6000);
  }

  if ($('#heroPrev')) $('#heroPrev').onclick = () => go(i - 1);
  if ($('#heroNext')) $('#heroNext').onclick = () => go(i + 1);

  // Hỗ trợ vuốt trên điện thoại
  let x0 = null;
  track.addEventListener('touchstart', e => x0 = e.touches[0].clientX, { passive: true });
  track.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
    x0 = null;
  });

  go(0);
})();

/* ---------- HIỆU ỨNG SỐ ĐẾM TĂNG DẦN ---------- */
const counters = $$('[data-count]');
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target;
    const end = +el.dataset.count;
    const t0 = performance.now();
    (function tick(t) {
      const k = Math.min(1, (t - t0) / 1400);
      el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))).toLocaleString('vi-VN');
      if (k < 1) requestAnimationFrame(tick);
    })(t0);
    io.unobserve(el);
  });
}, { threshold: 0.4 });
counters.forEach(c => io.observe(c));

/* ---------- NÚT NỔI & LÊN ĐẦU TRANG ---------- */
if ($('#floatBtn')) {
  $('#floatBtn').onclick = () => $('#floatContact').classList.toggle('open');
}
const toTop = $('#toTop');
if (toTop) {
  window.addEventListener('scroll', () => {
    toTop.classList.toggle('show', window.scrollY > 450);
  }, { passive: true });
  toTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---------- TOAST THÔNG BÁO NHANH ---------- */
let toastTimer;
function toast(msg) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

/* ---------- KHỞI TẠO BAN ĐẦU ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderGrid();
  renderBestGrid();
  renderCart();
  updateWishlistUI();
  renderNews();
});

// Chạy trực tiếp phòng trường hợp DOMContentLoaded đã kích hoạt
renderGrid();
renderBestGrid();
renderCart();
updateWishlistUI();
renderNews();
