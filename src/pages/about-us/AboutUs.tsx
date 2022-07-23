import companyLogo from "/companyLogo.png";
import "./AboutUs.scss";

const AboutUs = () => {
  return (
    <div className="section mb-10">
      <div className="flex flex-row justify-between p-8">
        <img src={companyLogo} />
        <p style={{ maxWidth: "773px" }}>
          Suckhoevang98 ra đời với mục đích đem đến những sản phẩm giá trị,
          thượng hạng với chất lượng cao nhất cho cộng đồng.
          <br />
          <br /> “Với đội ngũ tràn đầy sức trẻ nhiệt huyết, cộng thêm tình yêu
          và lòng biết ơn sâu sắc về miền núi tuyết – nơi được ân sủng trời đất
          ban cho những dược liệu vô cùng quý báu có tác dụng rất lớn với sức
          khoẻ của con người. Suckhoevang98 luôn tâm nguyện mang đến tận tay
          người dùng những sản vật quý giá nhất, chất lượng tốt nhất, giá tốt
          nhất để bất cứ ai cũng có thể tiếp cận với các sản vật của vùng núi
          tuyết Hymalaya”.
          <br />
          <br /> Chúng tôi luôn đặt tiêu chuẩn chất lượng lên hàng đầu và nghiêm
          ngặt tuân thủ các quy định về kiểm định chất lượng. Lựa chọn nguyên
          liệu tỉ mỉ khắt khe. Suckhoevang98 tự hào là đơn vị cung cấp 100%﻿
          ﻿nguồn sản phẩm thượng hạng , chất lượng cao.
        </p>
      </div>
      <div>
        <h2 className="mx-auto aboutUsTitle">Thư ngỏ</h2>
        <div>
          Kính gửi Quý đối tác,
          <br />
          <br />
          Suckhoevang98 xin được gửi tới Quý khách hàng lời chào trân trọng và
          lời cảm ơn chân thành vì sự lựa chọn của Quý khách hàng dành cho dòng
          sản phẩm của chúng tôi.
          <br />
          <br /> Với ban cố vấn cấp cao là các Giáo sư, Phó giáo sư hàng đầu
          trong ngành công nghệ sinh học, cùng với đội ngũ tràn đầy sức trẻ,
          nhiệt huyết của suckhoevang98, chúng tôi luôn tâm huyết và nỗ lực hết
          mình trong từng sản phẩm.
          <br />
          <br /> Vì chúng tôi hiểu rằng chỉ mang tới những sản phẩm có giá trị,
          sản phẩm cấp hàng đầu mới tương xứng với sự tin tưởng mà Quý khách
          hàng dành cho Suckhoevang98 và cũng vì sức khỏe là vốn quý nhất mà mỗi
          con người chúng ta có được.
          <br />
          <br /> Chúng tôi hy vọng rằng dù mục đích sử dụng là gì thì Quý khách
          hàng cũng sẽ hài lòng về sản phẩm của chúng tôi. Bất kì một sự thiếu
          hài lòng nào của Quý khách về Suckhoevang98, chúng tôi cũng sẽ tiếp
          nhận với thái độ chân thành và cầu thị nhất.
          <br />
          <br /> Một lần nữa xin chân thành cảm ơn sự lựa chọn của Quý khách.
          <br />
          <div className="w-full text-right ">
            Chúc Quý khách hàng sức khỏe – thành công – hạnh phúc!
            <br />
            Trân trọng!
          </div>
        </div>
      </div>
      <div>
        <h2 className="mx-auto aboutUsTitle">Tầm nhìn & sứ mạnh</h2>
        <div>
          Mỗi thành viên là một mắt xích không thể thiếu trong đội ngũ của của
          Suckhoevang98.
          <br />
          Chúng tôi với đội ngũ tràn đầy sức trẻ, nhiệt huyết và mong muốn được
          cống hiến vì cộng đồng với một TẦM NHÌN – SỨ MỆNH rõ ràng, tạo dựng
          GIÁ TRỊ CỐT LÕI.
          <br />
          <br /> TẦM NHÌN
          <br />
          Suckhoevang98 là:
          <ul className="customUl">
            <li>
              Doanh nghiệp top đầu về cung cấp mặt hàng nâng tầm sức khỏe người
              Việt.
            </li>
            <li>
              Một đội ngũ vững mạnh với đầy đủ kiến thức, sức trẻ, nhiệt huyết.
            </li>
            <li>
              Địa chỉ uy tín, tin cậy và quen thuộc của mỗi người dân Việt Nam.
            </li>
          </ul>
          <br />
          SỨ MỆNH
          <ul className="customUl">
            <li>Nâng tầm sức khỏe, trao giá trị cốt lõi cho cộng đồng.</li>
          </ul>
          <br />
          GIÁ TRỊ CỐT LÕI
          <ul className="customUl">
            <li>Con người là nền tảng cho sự phát triển.</li>

            <li>Trách nhiệm, hợp tác, sẻ chia là nguyên tắc cho bền vững.</li>
            <li>Bí quyết công nghệ là lợi thế cạnh tranh.</li>
            <li>Cùng thịnh vượng là phương châm trong hợp tác.</li>
            <li>
              Lợi ích cộng đồng là khởi đầu và kết thúc của mọi hành động.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
