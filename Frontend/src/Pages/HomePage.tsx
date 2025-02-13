import { usePlayerStore } from "../store/usePlayerStore";
import FeaturedSection from "../Components/FeaturedSection";
import SectionGrid from "../Components/SectionGrid";
import TopBar from "../Components/TopBar";
import { useMusicStore } from "../store/useMusicStore";
import { useEffect } from "react";

const HomePage = () => {
  const {
    fetchFeturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSong,
    isLoading,
    madeForYouSongs,
    feturedSongs,
    trendingSong
  } = useMusicStore();

  const {initialQueue} = usePlayerStore()

  useEffect(() => {
    fetchFeturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSong();
  }, [fetchFeturedSongs, fetchMadeForYouSongs, fetchTrendingSong]);

  useEffect(()=>{
    if(madeForYouSongs.length > 0 && feturedSongs.length > 0 && trendingSong.length > 0){
      const allSongs = [...feturedSongs,...madeForYouSongs,...trendingSong]
      initialQueue(allSongs)
    }
  },[initialQueue,madeForYouSongs,trendingSong,feturedSongs])

  return (
    <div className="h-full overflow-auto scrollbar-hide">
      <TopBar />
      <div className="p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Good Afternoon</h1>
        <FeaturedSection />
        <div className="space-y-8">
          <SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading} />
          <SectionGrid title="Trending" songs={trendingSong} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
