
import AnnouncementBar from "./AnnouncementBar";
import ExclusiveBooks from "./ExclusiveBooks";
import HotDeals from "./HotDeals";
import Recommended from "./Recommended";


const Home = () => {
  return (
    <>
      <AnnouncementBar />
      <HotDeals />
      <Recommended />
      <ExclusiveBooks/>
     
    </>
  );
};

export default Home;
