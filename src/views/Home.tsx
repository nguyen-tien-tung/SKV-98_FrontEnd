import React from "react";
import SimpleImageSlider from "react-simple-image-slider";

import "./Home.scss";

const images = [
  { url: "src/public/1banner.png" },
  { url: "src/public/2banner.png" },
  { url: "src/public/3banner.png" },
  { url: "src/public/4banner.png" },
  { url: "src/public/5banner.png" },
];

const Home = () => {
  return (
    <div className="section-no-padding homeSlider">
      <SimpleImageSlider
        width={1440}
        height={600}
        images={images}
        showBullets={true}
        showNavs={true}
      />
    </div>
  );
};

export default Home;
