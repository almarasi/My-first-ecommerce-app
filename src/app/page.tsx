import MainSlider from "@/Components/sliders/MainSlider";
import CategorySlider from "../Components/sliders/CategorySlider";
import AllProducts from "../Components/products/AllProducts";

export default function Home() {
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative">
        <MainSlider />
      </section>
      
      {/* Categories Section */}
      <section className="py-10 bg-white">
        <CategorySlider />
      </section>
      
      {/* Products Section */}
      <section className="py-14 sm:py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-[95%] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Products
            </h2>
            <p className="text-[15px] sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our curated collection of premium products designed to enhance your lifestyle
            </p>
          </div>
          <AllProducts />
        </div>
      </section>
    </div>
  );
}
