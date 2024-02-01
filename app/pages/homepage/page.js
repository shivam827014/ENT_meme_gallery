// Home.js
import React from "react";
import MemeGallery from "@/app/components/meme-gallery";
import Navbar from "@/app/components/navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <MemeGallery />
      {/* <style jsx>...styles</style> */}
    </div>
  );
};

export default Home;
