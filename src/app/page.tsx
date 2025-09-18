import MainSlider from "@/Components/sliders/MainSlider";
import CategorySlider from "../Components/sliders/CategorySlider";
import AllProducts from "../Components/products/AllProducts";

export default function Home() {
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <h1 className="text-start font-bold text-3xl pt-4 w-[95%] mx-auto">
        Products
      </h1>
      <AllProducts />
    </>
  );
}
