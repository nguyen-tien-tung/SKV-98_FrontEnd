import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/scss";
import "swiper/scss/pagination";
import { useNavigate, Navigate } from "react-router-dom";
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
        {Array.from(Array(4).keys()).map((e, index) => (
          <SwiperSlide key={index} onClick={() => navigate(`/news/${index}`)}>
            <div
              className="flex flex-col justify-items-start cursor-pointer"
              style={{ maxWidth: "354px" }}
            >
              <img
                src={
                  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                }
                style={{ width: "354px", height: "253px" }}
              />
              <h2>3 điều bạn nên biết khi mua đông trùng hạ thảo</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled
              </p>
              <div style={{ height: "55px" }}></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default News;
