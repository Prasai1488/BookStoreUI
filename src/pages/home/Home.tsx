import React from "react";
import AnnouncementBar from "./AnnouncementBar";
import HotDeals from "./HotDeals";
import Recommended from "./Recommended";
// import News from "./News";

const Home = () => {
  return (
    <>
      <AnnouncementBar />
      <HotDeals />
      <Recommended />
      {/* <News /> */}
    </>
  );
};

export default Home;
