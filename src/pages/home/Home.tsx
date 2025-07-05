import AnnouncementBar from "./AnnouncementBar";
import BestSellers from "./BestSellers";
import BroadcastToast from "./BroadcastToast";
import ExclusiveBooks from "./ExclusiveBooks";
import HotDeals from "./HotDeals";
import Recommended from "./Recommended";

const Home = () => {
  return (
    <>
      <BroadcastToast />
      <AnnouncementBar />
      <HotDeals />
      <Recommended />
      <ExclusiveBooks />
      <BestSellers />
    </>
  );
};

export default Home;
