import React from "react";
import { useLocation } from "react-router-dom";

import { news } from "@/hardCodedNews";
const NewsDetails = () => {
  const location = useLocation();
  const newsNum = +location.pathname.split("/").slice(-1)[0];

  return <>{news[newsNum].title}</>;
};

export default NewsDetails;
