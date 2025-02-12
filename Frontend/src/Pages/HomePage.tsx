import React, { useEffect } from "react";
import { useMusicStore } from "../store/useMusicStore";
import TopBar from "../Components/TopBar";
import FeaturedSection from "../Components/FeaturedSection";
import SectionGrid from "../Components/SectionGrid";

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

  useEffect(()=>{
    fetchFeturedSongs(),
    fetchMadeForYouSongs(),
    fetchTrendingSong()
  },[fetchFeturedSongs,fetchMadeForYouSongs,fetchTrendingSong])

  // console.log({isLoading,madeForYouSongs,feturedSongs,trendingSong});
  
  return (
    <div>
      <TopBar />
      <div className="p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Good Afternoon</h1>
        <FeaturedSection/>
        <div className="space-y-8">
          <SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading} />
          <SectionGrid title="Trending" songs={trendingSong} isLoading={isLoading}/>
        </div>
      </div>
    </div> 
  );
};

export default HomePage;
