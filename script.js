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
    name: 'Hộp REBOX Size S (700 ml) – Xanh lá cây',
    cat: 'size-s',
    price: 25000,
    old: 0,
    color: '#91A384',
    bg: '#f5f8f4',
    tag: 'hot',
    rating: 5.0,
    reviews: 185,
    capacity: '700 ml (18 × 13 × 5,5 cm)',
    material: '100% Nhựa PP nguyên sinh đạt chuẩn an toàn thực phẩm',
    temp: '-20°C đến 120°C',
    desc: 'Kích thước chuẩn: 18 × 13 × 5,5 cm. Màu xanh lá đại diện cho môi trường và lối sống xanh. Cấu trúc 4 ngăn khoa học: 1 ngăn lớn bên trái đựng cơm/món chính, 1 ngăn tròn trung tâm đựng nước chấm/xốt/kim chi/dưa chua, 2 ngăn phụ bên phải đựng rau củ & món mặn phụ. Tối ưu cho khẩu phần tiêu chuẩn sinh viên. Tích hợp tem QR & ID niêm phong tiệt trùng.',
    img: 'images/sanpham/hopxanh.png'
  },
  {
    id: 2,
    name: 'Hộp REBOX Size L (1000 ml) – Màu vàng ấm',
    cat: 'size-l',
    price: 25000,
    old: 0,
    color: '#f4d348',
    bg: '#fffdf0',
    tag: 'hot',
    rating: 5.0,
    reviews: 210,
    capacity: '1000 ml (20 × 15 × 6,5 cm)',
    material: '100% Nhựa PP nguyên sinh chịu lực va đập',
    temp: '-20°C đến 120°C',
    desc: 'Kích thước chuẩn: 20 × 15 × 6,5 cm với chiều sâu 6,5 cm vượt trội. Màu vàng ấm áp, trẻ trung, tương phản nổi bật trong không gian căn tin. Cấu trúc 4 ngăn rộng rãi: 1 ngăn dài lớn phía trước đựng cơm/bún/mì, 2 ngăn chữ nhật bo góc phía sau đựng món mặn chính và rau xào/luộc, 1 ngăn vuông nhỏ góc phải đựng gia vị/xốt. Chứa trọn vẹn suất ăn năng lượng cao mặn - xào - canh.',
    img: 'images/sanpham/hopvang.png'
  }
];

const BEST_IDS = [1, 2];
const CAT_NAMES = {
  all: 'Tất cả sản phẩm',
  'size-s': 'Hộp REBOX Size S (700 ml)',
  'size-l': 'Hộp REBOX Size L (1000 ml)'
};

/* ---------- DỮ LIỆU BÀI VIẾT TIN TỨC ---------- */
const NEWS_ARTICLES = [
  {
    id: 1,
    date: '01/12/2026',
    title: 'THÔNG CÁO BÁO CHÍ: REBOX Ra Mắt Mô Hình Hộp Đựng Thức Ăn Tái Sử Dụng Tại Trường Đại Học Sư Phạm – Đại Học Đà Nẵng',
    desc: 'Lễ ra mắt chính thức mô hình hộp tuần hoàn và phát động Thử thách số “7 ngày dùng xanh cùng REBOX” từ ngày 12/12 đến 19/12/2026 tại Hội trường Đất Quảng (phòng 202 toà nhà A6)...',
    readTime: '4 phút đọc',
    author: 'Mai Thùy Linh – Phụ trách Truyền thông REBOX',
    tag: 'Thông cáo báo chí',
    badge: 'CHÍNH THỨC',
    content: `
      <div class="news-reader__press-head">
        <div style="text-align:center; margin-bottom:18px;">
          <h3 style="color:var(--navy); font-size:18px; margin-bottom:4px; text-transform:uppercase;">THÔNG CÁO BÁO CHÍ</h3>
          <h2 style="color:var(--green-sage); font-size:20px; line-height:1.4;">REBOX RA MẮT MÔ HÌNH HỘP ĐỰNG THỨC ĂN TÁI SỬ DỤNG TẠI TRƯỜNG ĐẠI HỌC SƯ PHẠM – ĐẠI HỌC ĐÀ NẴNG</h2>
          <p style="font-style:italic; color:var(--muted); margin-top:6px;">Đà Nẵng, ngày 01 tháng 12 năm 2026</p>
        </div>
      </div>

      <p>Trong bối cảnh rác thải từ hộp xốp và bao bì dùng một lần ngày càng gây áp lực lên môi trường và gây hại cho sức khỏe con người, việc thúc đẩy các giải pháp tiêu dùng bền vững càng trở nên cấp thiết. Mô hình hộp đựng thức ăn tái sử dụng <b>REBOX</b> hướng đến cung cấp giải pháp thay thế thuận tiện, góp phần giảm thiểu rác thải và hình thành thói quen tiêu dùng có trách nhiệm trong sinh viên.</p>

      <p>Nhằm khuyến khích sinh viên trải nghiệm mô hình, REBOX triển khai chương trình thử thách số <b>“7 ngày dùng xanh cùng REBOX”</b> từ ngày <b>12/12 đến 19/12/2026</b> tại Trường Đại học Sư phạm – Đại học Đà Nẵng. Đây là hoạt động mở đầu cho chiến dịch thử nghiệm kéo dài ba tháng, từ tháng 12/2026 đến tháng 02/2027. Hoạt động diễn ra nhằm giúp sản phẩm REBOX tiếp cận đến công chúng thông qua những thử thách truyền thông số được quay bởi KOL, KOCs, Influencers và học sinh, sinh viên.</p>

      <div class="news-reader__callout">
        <b>Đại diện Ban Giám đốc Công ty REBOX chia sẻ:</b><br>
        “Sự an tâm về vệ sinh là một trong những yếu tố quan trọng để sinh viên thay đổi thói quen sử dụng hộp đựng thức ăn tái sử dụng. Thông qua chiến dịch truyền thông: <i>“Đằng sau mỗi chiếc hộp sử dụng một lần là những hệ luỵ khó lường”</i> và thử thách <i>“7 ngày dùng xanh cùng REBOX”</i>, REBOX mong muốn mang đến sự minh bạch về quy trình làm sạch, giúp sinh viên an tâm trong quá trình sử dụng hộp.”
      </div>

      <p>REBOX ứng dụng công nghệ truy xuất thông tin vệ sinh hộp qua mã QR, kết hợp quy trình làm sạch và khử khuẩn cùng hệ thống trạm trả hộp, hướng đến nâng cao sự an tâm và thuận tiện cho người sử dụng. Thông qua mô hình này, REBOX hướng đến giảm thiểu hộp xốp dùng một lần, đồng thời thúc đẩy thói quen tiêu dùng bền vững.</p>

      <div class="news-reader__press-box" style="background:#f4fbf7; border:1px solid #b7e0c8; border-radius:12px; padding:18px; margin:20px 0;">
        <h4 style="color:var(--navy); margin-bottom:10px; display:flex; align-items:center; gap:8px;">
          📅 THÔNG TIN CHƯƠNG TRÌNH LỄ RA MẮT
        </h4>
        <ul style="list-style:none; padding:0; margin:0; display:grid; gap:8px;">
          <li>⏰ <b>Thời gian:</b> 7g30 ngày 12/12/2026 (Thứ Bảy)</li>
          <li>🏛️ <b>Địa điểm:</b> Hội trường Đất Quảng (phòng 202 toà nhà A6), Trường Đại học Sư phạm – Đại học Đà Nẵng, số 459 Tôn Đức Thắng, phường Hoà Khánh Nam, quận Liên Chiểu, TP. Đà Nẵng.</li>
        </ul>
        <p style="margin-top:12px; font-style:italic; font-size:14px; color:#3d5a45;">Công ty REBOX trân trọng kính mời quý thầy cô là giảng viên trường Đại học Sư phạm – Đại học Đà Nẵng, các tổ chức, cá nhân, sinh viên, các phóng viên báo chí truyền thông đến tham dự chương trình.</p>
      </div>

      <div class="news-reader__contact-box" style="background:#fffdf0; border:1px solid #fae477; border-radius:12px; padding:16px; margin-top:20px;">
        <h5 style="color:#8a6400; margin-bottom:8px;">📞 THÔNG TIN LIÊN HỆ BÁO CHÍ:</h5>
        <p style="margin:4px 0;"><b>Đơn vị:</b> Công ty REBOX (Đồ án Nhóm 6 – Khoa Ngữ văn - Truyền thông, ĐH Sư phạm Đà Nẵng)</p>
        <p style="margin:4px 0;"><b>Người phụ trách truyền thông:</b> Mai Thùy Linh</p>
        <p style="margin:4px 0;"><b>Điện thoại / Hotline:</b> <a href="tel:0374596585" style="color:var(--navy); font-weight:700;">0374 596 585</a></p>
        <p style="margin:4px 0;"><b>Email:</b> <a href="mailto:Maitlinh209@gmail.com" style="color:var(--navy); font-weight:700;">Maitlinh209@gmail.com</a></p>
      </div>
    `
  },
  {
    id: 2,
    date: '20/12/2026',
    title: 'THÔNG CÁO BÁO CHÍ: REBOX Thông Tin Chính Thức Về Việc Xử Lý Sự Cố Chậm Hoàn Tiền Đặt Cọc Cho Khách Hàng',
    desc: 'Phản hồi minh bạch và trách nhiệm của REBOX liên quan đến sự cố kỹ thuật chưa đồng bộ dữ liệu hoàn cọc 25.000 đồng tại trạm toà B3, cùng chính sách đền bù voucher Phê La & Cơm tấm Bụi...',
    readTime: '5 phút đọc',
    author: 'Mai Thùy Linh – Phụ trách Truyền thông REBOX',
    tag: 'Xử lý sự cố truyền thông',
    badge: 'MINH BẠCH',
    content: `
      <div class="news-reader__press-head">
        <div style="text-align:center; margin-bottom:18px;">
          <h3 style="color:var(--navy); font-size:18px; margin-bottom:4px; text-transform:uppercase;">THÔNG CÁO BÁO CHÍ</h3>
          <h2 style="color:#d9534f; font-size:20px; line-height:1.4;">REBOX THÔNG TIN CHÍNH THỨC VỀ VIỆC XỬ LÝ SỰ CỐ CHẬM HOÀN TIỀN ĐẶT CỌC CHO KHÁCH HÀNG</h2>
          <p style="font-style:italic; color:var(--muted); margin-top:6px;">Đà Nẵng, ngày 20 tháng 12 năm 2026</p>
        </div>
      </div>

      <p>Trong những ngày vừa qua, những thông tin được lan truyền liên quan đến phản ánh của khách hàng về việc chưa nhận được khoản tiền đặt cọc <b>25.000 đồng</b> sau khi hoàn trả hộp đúng thời hạn theo quy định của hệ thống. REBOX xin gửi lời phản hồi chính thức nhằm làm rõ vụ việc, đảm bảo thông tin minh bạch và thể hiện trách nhiệm với công chúng, khách hàng và các bên liên quan.</p>

      <div style="background:#fff5f5; border-left:4px solid #d9534f; padding:14px; margin:16px 0; border-radius:0 8px 8px 0; font-style:italic; font-size:14px; color:#555;">
        <p>Vào ngày 15 tháng 12 năm 2026, chúng tôi ghi nhận được thông tin lan truyền trên mạng xã hội với bài đăng được trích dẫn nội dung chính:</p>
        <p><i>“Đến ngày trả hộp, mình đã đem trả tại trạm thu gom hộp ngay toà B3, đúng thời hạn và có xác nhận hoàn trả từ hệ thống. Theo thông tin REBOX cung cấp, khách hàng sẽ được hoàn lại tiền cọc sau khi trả hộp thành công trong vòng 48 giờ. Nhưng vấn đề là đến nay mình vẫn chưa nhận được 25.000 đồng đó... Nếu REBOX đã đưa ra quy định đặt cọc thì cũng phải có trách nhiệm hoàn trả đúng cam kết chứ?”</i></p>
      </div>

      <p>Trước hết, <b>REBOX gửi lời xin lỗi chân thành đến khách hàng</b> vì sự bất tiện và trải nghiệm chưa tốt trong quá trình sử dụng dịch vụ. Sau quá trình tìm hiểu vụ việc, sau đây là phản hồi chi tiết của REBOX:</p>

      <h4 style="color:var(--navy); margin-top:18px;">1. Nguyên nhân sự việc</h4>
      <p>Sau khi tiếp nhận phản ánh và tiến hành kiểm tra quy trình vận hành, REBOX xác định sự cố xuất phát từ việc <b>chưa đồng bộ dữ liệu giữa hệ thống quản lý thu hồi hộp và hệ thống xử lý hoàn tiền</b>.</p>
      <ul style="padding-left:20px; line-height:1.6;">
        <li>Cụ thể, khi khách hàng hoàn trả hộp và quét mã QR thành công, hệ thống thu hồi đã ghi nhận trạng thái hoàn trả. Tuy nhiên, do lỗi truyền dữ liệu giữa hai hệ thống, một số giao dịch không được chuyển tiếp đầy đủ sang hệ thống thanh toán, dẫn đến việc lệnh hoàn tiền đặt cọc 25.000 đồng không được tạo trong dữ liệu hệ thống.</li>
        <li>Bên cạnh đó, REBOX chưa thiết lập cơ chế cảnh báo tự động đối với các giao dịch hoàn tiền bị gián đoạn. Quy trình đối soát giữa bộ phận vận hành và thanh toán còn thiếu chặt chẽ, khiến sự cố không được phát hiện và xử lý kịp thời.</li>
        <li>REBOX cũng nhìn nhận thiếu sót trong công tác chăm sóc khách hàng khi chưa cung cấp được thông tin rõ ràng về nguyên nhân và thời gian xử lý, khiến khách hàng phải chờ đợi và chủ động liên hệ.</li>
      </ul>

      <h4 style="color:var(--navy); margin-top:18px;">2. Biện pháp khắc phục sự cố</h4>
      <ul style="padding-left:20px; line-height:1.6;">
        <li><b>Thứ nhất, rà soát và hoàn trả 100% tiền cọc:</b> REBOX tiến hành kiểm tra toàn bộ giao dịch hoàn trả hộp nhưng vẫn chưa nhận được tiền cọc. Những khách hàng đủ điều kiện hoàn tiền sẽ được ưu tiên xử lý và hoàn trả đầy đủ <b>25.000 đồng</b>. Đồng thời, khách hàng sẽ được thông báo về tình trạng và tiến độ xử lý giao dịch.</li>
        <li><b>Thứ hai, khắc phục lỗi hệ thống:</b> Kiểm tra và điều chỉnh kết nối dữ liệu giữa hệ thống xác nhận thu hồi hộp và hệ thống thanh toán. Thiết lập cơ chế cảnh báo tự động đối với các giao dịch chưa hoàn tất để kịp thời phát hiện và xử lý.</li>
        <li><b>Thứ ba, tăng cường kiểm soát vận hành:</b> Thiết lập quy trình đối soát giao dịch hằng ngày giữa bộ phận thu hồi hộp và bộ phận thanh toán. Bộ phận CSKH được hỗ trợ công cụ tra cứu trạng thái giao dịch nhằm cung cấp thông tin chính xác và kịp thời cho người sử dụng.</li>
        <li><b>Thứ tư, minh bạch hóa quy trình hoàn tiền:</b> Cung cấp mã giao dịch riêng cho mỗi lần hoàn trả hộp, giúp khách hàng chủ động theo dõi trạng thái hoàn tiền và nắm rõ các bước xử lý khi phát sinh sự cố.</li>
      </ul>

      <div class="news-reader__press-box" style="background:#fcf8e3; border:1px solid #faebcc; border-radius:12px; padding:18px; margin:20px 0;">
        <h4 style="color:#8a6d3b; margin-bottom:10px;">🎁 3. CHÍNH SÁCH HỖ TRỢ KHÁCH HÀNG BỊ ẢNH HƯỞNG</h4>
        <p>Bên cạnh việc hoàn trả đầy đủ khoản tiền đặt cọc 25.000 đồng, REBOX triển khai chính sách hỗ trợ dành cho những khách hàng bị ảnh hưởng:</p>
        <ul style="padding-left:20px; line-height:1.6; margin-top:8px;">
          <li><b>01 Voucher giảm giá 50%</b> tại hệ thống chuỗi <b>Phê La tại Đà Nẵng</b>.</li>
          <li><b>01 Voucher suất ăn miễn phí</b> tại quán đối tác <b>Cơm tấm Bụi (40 Phạm Như Xương, phường Hoà Khánh Nam, Đà Nẵng)</b>.</li>
        </ul>
        <p style="font-size:13.5px; color:#8a6d3b; margin-top:8px; font-style:italic;">* Chính sách hỗ trợ này không thay thế nghĩa vụ hoàn trả tiền cọc mà khách hàng được nhận theo quy định.</p>
      </div>

      <h4 style="color:var(--navy); margin-top:18px;">4. Cam kết từ REBOX</h4>
      <p>Qua sự việc, REBOX cam kết:</p>
      <ul style="padding-left:20px; line-height:1.6;">
        <li>Tăng cường quy trình kiểm tra - kiểm soát nội bộ.</li>
        <li>Minh bạch trong quy trình đặt cọc, hoàn trả và xử lý giao dịch.</li>
        <li>Đảm bảo quyền lợi và hoàn trả đầy đủ tiền cọc cho khách hàng đủ điều kiện.</li>
        <li>Chủ động tiếp nhận, giải quyết phản ánh và không để khách hàng phải chờ đợi mà không có thông tin.</li>
        <li>Đào tạo lại nhân sự, phòng ban trong hoạt động đặt cọc.</li>
      </ul>

      <div class="news-reader__contact-box" style="background:#fffdf0; border:1px solid #fae477; border-radius:12px; padding:16px; margin-top:20px;">
        <h5 style="color:#8a6400; margin-bottom:8px;">📞 THÔNG TIN LIÊN HỆ:</h5>
        <p style="margin:4px 0;"><b>Đơn vị:</b> Công ty REBOX</p>
        <p style="margin:4px 0;"><b>Người phụ trách truyền thông:</b> Mai Thùy Linh</p>
        <p style="margin:4px 0;"><b>Điện thoại:</b> <a href="tel:0374596585" style="color:var(--navy); font-weight:700;">0374 596 585</a></p>
        <p style="margin:4px 0;"><b>Email:</b> <a href="mailto:Maitlinh209@gmail.com" style="color:var(--navy); font-weight:700;">Maitlinh209@gmail.com</a></p>
      </div>
    `
  },
  {
    id: 3,
    date: '15/11/2026',
    title: 'Câu chuyện thương hiệu REBOX: “Hộp gọn gói gọn món ngon, trọn vị sống xanh”',
    desc: 'Đồ án Kỹ năng viết cho Quan hệ công chúng của Nhóm 6 (Khoa Ngữ văn - Truyền thông, Trường ĐH Sư phạm – ĐH Đà Nẵng) với sứ mệnh loại bỏ hộp xốp dùng một lần...',
    readTime: '4 phút đọc',
    author: 'Nhóm 6 – Khoa Ngữ văn - Truyền thông ĐHSP',
    tag: 'Câu chuyện thương hiệu',
    badge: 'SỨ MỆNH',
    content: `
      <p>Tại khu vực đường Tôn Đức Thắng và Phạm Như Xương quanh Trường ĐH Sư phạm – ĐH Đà Nẵng, các quán cơm và căn tin mỗi ngày phục vụ hàng ngàn suất ăn mang đi cho sinh viên.</p>
      <p>Lượng bao bì dùng một lần như hộp xốp, túi nilon và thìa đũa nhựa phát sinh sau mỗi bữa ăn đang là một vấn đề môi trường đáng quan tâm đối với cảnh quan học đường và sức khỏe thế hệ trẻ.</p>
      <div class="news-reader__callout">
        "Một chiếc hộp được sử dụng nhiều lần, một hành động nhỏ được lặp lại mỗi ngày và nhiều vòng đời mới được tiếp nối."
      </div>
      <p>REBOX được nghiên cứu và phát triển bởi <b>Nhóm 6 (Nguyễn Thái Vy, Phạm Thị Thùy Mỹ, Trịnh Trương Ái Mỹ, Nguyễn Thị Tây Thi, Võ Anh Thư, Mai Thùy Linh)</b> trong khuôn khổ học phần <i>Kỹ năng viết cho Quan hệ công chúng</i> tại Khoa Ngữ văn – Truyền thông, Trường Đại học Sư phạm – Đại học Đà Nẵng.</p>
      <p>Thay vì sử dụng một chiếc hộp rồi bỏ đi, REBOX hướng đến mô hình: <b>Mượn – Sử dụng – Trả hộp – Làm sạch & Tiệt trùng – Tiếp tục sử dụng</b>, kéo dài vòng đời của mỗi sản phẩm và hạn chế tối đa rác thải nhựa phát sinh.</p>
    `
  },
  {
    id: 4,
    date: '08/11/2026',
    title: 'Tiêu chuẩn kiểm nghiệm TCVN ISO/IEC 17025:2017: Cam kết an toàn tuyệt đối cho bữa ăn học đường',
    desc: 'Quy trình kiểm nghiệm định kỳ 1 lần/tuần của hộp REBOX tại Trung tâm Ứng dụng Khoa học Công nghệ và Đo lường Chất lượng TP. Đà Nẵng (1000/1 Tôn Đản, An Khê)...',
    readTime: '5 phút đọc',
    author: 'Bộ phận Vận hành & Tiêu chuẩn Chất lượng REBOX',
    tag: 'Tiêu chuẩn chất lượng',
    badge: 'KIỂM ĐỊNH',
    content: `
      <p>An tâm vệ sinh là cam kết danh dự của REBOX đối với toàn thể sinh viên và giảng viên Trường ĐH Sư Phạm – ĐH Đà Nẵng. Mỗi chiếc hộp REBOX trước khi đưa vào lưu hành và trong suốt quá trình vận hành đều tuân thủ các quy chuẩn nghiêm ngặt nhất.</p>
      <p>Đặc biệt, trong quá trình vận hành, hộp REBOX được <b>kiểm tra định kỳ 1 lần / tuần</b> tại <b>Trung tâm Ứng dụng khoa học công nghệ và tiêu chuẩn đo lường chất lượng TP. Đà Nẵng</b> (tổ chức KH&CN trực thuộc Sở Khoa học và Công nghệ TP. Đà Nẵng) tại địa chỉ <b>1000/1 Tôn Đản, phường An Khê, TP. Đà Nẵng</b>.</p>
      <div class="news-reader__callout">
        "Mẫu hộp REBOX được gửi tới phòng kiểm nghiệm được công nhận phù hợp chuẩn quốc tế ISO/IEC 17025 (tiêu chuẩn quốc gia TCVN ISO/IEC 17025:2017) kiểm tra phơi nhiễm vi sinh và thôi nhiễm kim loại nặng."
      </div>
      <p>Toàn bộ kết quả thử nghiệm được số hóa và lưu trữ thành hồ sơ dữ liệu web. Người dùng chỉ cần quét mã QR trên nắp hộp là có thể tra cứu tức thì tình trạng vô trùng của hộp.</p>
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
  const c = p.color || '#2d6645';
  if (p.cat === 'hop-com') {
    return `<svg viewBox="0 0 140 110" aria-hidden="true">
      <ellipse cx="70" cy="98" rx="48" ry="7" fill="rgba(0,0,0,.06)"/>
      <rect x="20" y="44" width="100" height="50" rx="14" fill="${c}"/>
      <rect x="14" y="30" width="112" height="22" rx="10" fill="${c}" opacity=".88"/>
      <rect x="26" y="34" width="36" height="6" rx="3" fill="#fae477" opacity=".9"/>
      <path d="M70 82c-10-2-15-10-13-20 10 0 18 6 18 15 0 3-1 4-5 5z" fill="#ffffff" opacity=".95"/>
      <rect x="68" y="48" width="4" height="42" rx="2" fill="rgba(255,255,255,.25)"/>
    </svg>`;
  } else if (p.cat === 'tru-dong') {
    return `<svg viewBox="0 0 140 110" aria-hidden="true">
      <ellipse cx="70" cy="98" rx="46" ry="7" fill="rgba(0,0,0,.06)"/>
      <rect x="22" y="46" width="96" height="48" rx="12" fill="${c}" opacity=".88"/>
      <rect x="16" y="34" width="108" height="18" rx="8" fill="#52946e"/>
      <rect x="28" y="38" width="40" height="5" rx="2.5" fill="#fae477" opacity=".85"/>
      <circle cx="70" cy="70" r="14" fill="rgba(255,255,255,.3)"/>
      <path d="M70 60v20M60 70h20" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`;
  } else if (p.cat === 'mang-di') {
    return `<svg viewBox="0 0 140 110" aria-hidden="true">
      <ellipse cx="70" cy="98" rx="32" ry="6" fill="rgba(0,0,0,.06)"/>
      <rect x="42" y="28" width="56" height="68" rx="18" fill="${c}"/>
      <rect x="50" y="16" width="40" height="16" rx="7" fill="#d6f0e1"/>
      <rect x="62" y="10" width="16" height="8" rx="4" fill="${c}"/>
      <circle cx="70" cy="62" r="12" fill="#fff" opacity=".85"/>
      <path d="M70 68c-4-1-6-4-5-8 4 0 7 2 7 6 0 1 0 1-2 2z" fill="${c}"/>
    </svg>`;
  } else {
    // combo
    return `<svg viewBox="0 0 140 110" aria-hidden="true">
      <ellipse cx="70" cy="98" rx="52" ry="7" fill="rgba(0,0,0,.06)"/>
      <rect x="24" y="52" width="92" height="42" rx="12" fill="${c}"/>
      <rect x="34" y="24" width="72" height="32" rx="10" fill="#f4d348" opacity=".95"/>
      <rect x="30" y="18" width="80" height="12" rx="5" fill="#52946e"/>
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
  const isBox = p.cat.startsWith('size');
  const badge = p.sold
    ? '<span class="badge">TẠM HẾT</span>'
    : p.tag === 'new'
      ? '<span class="badge badge--new">MỚI</span>'
      : p.tag === 'hot'
        ? '<span class="badge">HOT</span>'
        : '';

  const isFav = wishlist.includes(p.id);

  return `
  <article class="card ${p.sold ? 'card--sold' : ''}">
    ${badge}
    <button class="card__wishlist ${isFav ? 'is-fav' : ''}" data-wishlist="${p.id}" aria-label="Lưu mẫu quan tâm">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="${isFav ? '#f0647c' : 'none'}" stroke="${isFav ? '#f0647c' : 'currentColor'}" stroke-width="2">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    </button>
    <div class="card__img-wrap">
      <a href="javascript:void(0)" class="card__img" style="--bg:${p.bg}" data-quickview="${p.id}" aria-label="${p.name}">
        ${imageOf(p)}
      </a>
      <button class="card__quickview-btn" data-quickview="${p.id}">
        👁️ Xem quy cách
      </button>
    </div>
    <div class="card__body">
      <div class="card__meta">
        <span class="card__cat">${CAT_NAMES[p.cat] || 'Mô hình REBOX'}</span>
        <div class="card__rating">⭐ <b>${p.rating}</b> <span>(${p.reviews})</span></div>
      </div>
      <h3 class="card__title"><a href="javascript:void(0)" data-quickview="${p.id}">${p.name}</a></h3>
      <div class="card__specs">
        <span>📐 ${p.capacity}</span>
        <span>♻️ PP #5</span>
      </div>
      <div class="card__foot card__foot--model">
        <div class="card__deposit-info">
          <span class="deposit-lbl">${isBox ? 'Cọc hoàn lại 100%:' : p.price === 0 ? 'Ưu đãi sinh viên:' : 'Cọc mượn hoàn lại:'}</span>
          <b class="deposit-val">${p.price === 0 ? '0₫ (Miễn phí cọc)' : money(p.price)}</b>
          ${isBox ? '<span class="deposit-free">Hoàn cọc 48h tại trạm</span>' : ''}
          ${p.price === 0 ? '<span class="deposit-free">Thẻ EcoPass ĐHSP</span>' : ''}
        </div>
        <div class="card__actions-btn-group">
          <button class="btn btn--primary btn--sm card__detail-btn" data-quickview="${p.id}" title="Xem cấu tạo và tiêu chuẩn của hộp">
            Xem quy cách
          </button>
          <a href="#cua-hang" class="btn btn--outline btn--sm card__station-btn" title="Xem 2 căn tin & 8 quán đối tác">
            Điểm mượn
          </a>
        </div>
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
  const content = $('#quickviewContent');
  if (!content) return;

  const isBox = p.cat.startsWith('size');
  content.innerHTML = `
    <div class="quickview__img-col" style="--bg:${p.bg}">
      ${imageOf(p)}
    </div>
    <div class="quickview__details">
      <span class="quickview__cat">${CAT_NAMES[p.cat] || 'Giải pháp REBOX'}</span>
      <h2 class="quickview__title">${p.name}</h2>
      <div class="quickview__meta">
        <span style="color:#ff9800; font-weight:700;">⭐⭐⭐⭐⭐ ${p.rating} / 5</span>
        <span style="color:var(--muted)">(${p.reviews} lượt mượn & trải nghiệm thực tế)</span>
      </div>
      <div class="quickview__price-box">
        <div class="quickview__model-tag">
          <span class="tag-label">${isBox ? 'Định mức cọc hoàn lại 100%:' : p.price === 0 ? 'Ưu đãi sinh viên:' : 'Mức cọc hoàn lại:'}</span>
          <b class="tag-price">${p.price === 0 ? '0₫ (Miễn phí cọc)' : money(p.price)}</b>
          ${isBox ? '<span class="tag-sub">Miễn phí 0₫ cọc khi đăng ký Thẻ EcoPass Sinh viên</span>' : ''}
        </div>
      </div>
      <p style="font-size:14.5px; color:#2c4464; line-height:1.5; margin:10px 0;">${p.desc}</p>
      
      <div class="quickview__specs-list">
        <div><b>📐 Quy cách kích thước:</b> ${p.capacity}</div>
        <div><b>♻️ Tiêu chuẩn vật liệu:</b> ${p.material}</div>
        <div><b>🔥 Ngưỡng chịu nhiệt:</b> ${p.temp} (An toàn lò vi sóng & máy sấy)</div>
        <div><b>🍱 Cấu trúc 4 ngăn khoa học:</b> Đúc liền khối, chống tràn xốt, chống lẫn mùi</div>
        <div><b>📱 Tem niêm phong mã QR & ID:</b> Minh bạch lịch sử rửa sấy và tiệt trùng tia UV</div>
        <div><b>🧪 Kiểm nghiệm định kỳ:</b> 1 lần/tuần tại TT KH&CN Đà Nẵng (1000/1 Tôn Đản) theo chuẩn ISO 17025</div>
        <div><b>🏫 Điểm phục vụ mượn - trả:</b> 2 Căn tin ĐH Sư Phạm, Kiosk Tòa B3 & 8 Quán đối tác</div>
      </div>

      <div class="quickview__actions" style="margin-top:16px; display:flex; gap:10px; flex-wrap:wrap;">
        <a href="#cua-hang" class="btn btn--primary" style="flex:1;" onclick="quickviewModal.classList.remove('show');">
          Xem 2 Căn Tin & 8 Quán Đối Tác Mượn Hộp
        </a>
        <button class="btn btn--outline" style="flex:1;" onclick="quickviewModal.classList.remove('show'); openRegisterModal('${p.name}');">
          🤝 Đăng ký trải nghiệm mô hình
        </button>
      </div>
    </div>
  `;

  quickviewModal.classList.add('show');
}

if (closeQuickview) closeQuickview.onclick = () => quickviewModal.classList.remove('show');
if (quickviewModal) {
  quickviewModal.addEventListener('click', e => {
    if (e.target === quickviewModal) quickviewModal.classList.remove('show');
  });
}

/* ---------- MODAL ĐĂNG KÝ TRẢI NGHIỆM MÔ HÌNH & HỢP TÁC ĐỐI TÁC ---------- */
const registerModal = $('#registerModal');
const closeRegisterModalBtn = $('#closeRegisterModal');
const registerModelForm = $('#registerModelForm');

function openRegisterModal(note) {
  if (!registerModal) return;
  if (note && $('#regNote')) {
    $('#regNote').value = `Mình quan tâm đến: ${note}`;
  }
  registerModal.classList.add('show');
  registerModal.setAttribute('aria-hidden', 'false');
}

function closeRegisterModal() {
  if (!registerModal) return;
  registerModal.classList.remove('show');
  registerModal.setAttribute('aria-hidden', 'true');
}

window.openRegisterModal = openRegisterModal;
window.closeRegisterModal = closeRegisterModal;

if (closeRegisterModalBtn) {
  closeRegisterModalBtn.onclick = closeRegisterModal;
}

if (registerModal) {
  registerModal.addEventListener('click', e => {
    if (e.target === registerModal) closeRegisterModal();
  });
}

if (registerModelForm) {
  registerModelForm.onsubmit = e => {
    e.preventDefault();
    const name = ($('#regName') ? $('#regName').value.trim() : '');
    const phone = ($('#regPhone') ? $('#regPhone').value.trim() : '');
    toast(`🎉 Cảm ơn ${name || 'bạn'} đã đăng ký đồng hành cùng REBOX!`);
    alert(`CẢM ƠN BẠN ĐÃ ĐĂNG KÝ ĐỒNG HÀNH CÙNG REBOX!\n\nThông tin của bạn (${name} - ${phone}) đã được chuyển đến Ban điều phối dự án REBOX tại Trường ĐH Sư phạm – ĐH Đà Nẵng.\nĐội ngũ dự án sẽ liên hệ với bạn trong thời gian sớm nhất!`);
    closeRegisterModal();
    registerModelForm.reset();
  };
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
      <div class="news-card__img img${(i % 4) + 1}">
        <span class="news-card__badge">${a.badge || 'TIN TỨC'}</span>
        📰
      </div>
      <div class="news-card__meta-bar" style="display:flex; justify-content:space-between; align-items:center; margin-top:10px; font-size:12.5px; color:var(--muted);">
        <span class="news-card__tag" style="background:#eef7f2; color:#2d6645; padding:2px 8px; border-radius:12px; font-weight:700;">${a.tag}</span>
        <time>${a.date}</time>
      </div>
      <h4 style="margin-top:8px;">${a.title}</h4>
      <p>${a.desc}</p>
      <span class="read-link">Đọc chi tiết toàn văn →</span>
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


/* ---------- MODAL XEM POSTER / BẢN VẼ PHÓNG TO (LIGHTBOX) ---------- */
const posterModal = $('#posterModal');
const posterModalImg = $('#posterModalImg');
const posterModalCaption = $('#posterModalCaption');
const closePosterModalBtn = $('#closePosterModal');

function openPosterModal(src, caption) {
  if (!posterModal || !posterModalImg) return;
  posterModalImg.src = src;
  posterModalImg.alt = caption || 'Bản vẽ phóng to REBOX';
  if (posterModalCaption) {
    posterModalCaption.textContent = caption || '';
  }
  posterModal.classList.add('show');
  posterModal.setAttribute('aria-hidden', 'false');
}

function closePosterModal() {
  if (!posterModal) return;
  posterModal.classList.remove('show');
  posterModal.setAttribute('aria-hidden', 'true');
}

window.openPosterModal = openPosterModal;
window.closePosterModal = closePosterModal;

if (closePosterModalBtn) closePosterModalBtn.onclick = closePosterModal;
if (posterModal) {
  posterModal.addEventListener('click', e => {
    if (e.target === posterModal) closePosterModal();
  });
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
    if (posterModal) closePosterModal();
    if (registerModal) closeRegisterModal();
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
