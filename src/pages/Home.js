import React from "react";
import HeroSlider from "../components/sliders/HeroSlider";
import FeaturedSlider from "../components/sliders/FeaturedSlider";
import SectionsHead from "../components/common/SectionsHead";
import TopProducts from "../components/product/TopProducts";
import Services from "../components/common/Services";

const Home = () => {
  return (
    <main>
      <section id="hero">
        <HeroSlider />
      </section>

      <section id="featured" className="section">
        <div className="container">
          <SectionsHead heading="Featured Products" />
          <FeaturedSlider />
        </div>
      </section>

      <section id="products" className="section">
        <div className="container">
          <SectionsHead heading="Category" />
          <span>
            <h1>Phone</h1>
            <TopProducts categories="Phone" />
          </span>
          <span>
            <h1>Laptop</h1>
            <TopProducts categories="Laptop" />
          </span>
          <span>
            <h1>TV</h1>
            <TopProducts categories="TV" />
          </span>
          <span>
            <h1>Camera</h1>
            <TopProducts categories="Camera" />
          </span>
        </div>
      </section>

      <Services />
    </main>
  );
};

export default Home;
