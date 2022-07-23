import React from "react";
import { useLocation } from "react-router-dom";

import { news } from "@/hardCodedNews";

const NewsDetails = () => {
  const location = useLocation();
  const newsNum = +location.pathname.split("/").slice(-1)[0];

  return (
    <>
      <div className="flex flex-col justify-center items-center align-middle">
        <h1>{news[newsNum].title}</h1>
        {news[newsNum].content.map((content, index) => (
          <div key={index}>
            <h2>{content.subTitle}</h2>
            {content.texts?.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
            {content.images?.map((image, i) => (
              <img
                key={i}
                src={"/newsImages/" + image + ".png"}
                alt=""
                className="mx-auto"
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default NewsDetails;
