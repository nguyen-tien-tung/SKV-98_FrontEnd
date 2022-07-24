import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/scss";
import "swiper/scss/pagination";
import "./News.scss";
import { useNavigate, Navigate } from "react-router-dom";
import { news } from "@/hardCodedNews";
const News = () => {
  let navigate = useNavigate();

  return (
    <div className="section mb-14">
      <h2 className="sectionHeader mt-4 mb-8">Tin Tức & thông tin</h2>
      <Swiper
        slidesPerView={3}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
      >
        {news.map((n, index) => (
          <SwiperSlide key={index} onClick={() => navigate(`/news/${index}`)}>
            <div
              className="flex flex-col justify-items-start cursor-pointer"
              style={{ maxWidth: "354px" }}
            >
              <img
                src={`/newsImages/${n.content[0].images[0]}.png`}
                style={{ width: "354px", height: "253px" }}
              />
              <h2>{n.title}</h2>
              <p className="line-clamp">{n.content[0].subTitle}</p>
              <div style={{ height: "55px" }}></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default News;
