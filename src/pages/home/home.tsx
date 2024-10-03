import { Banner } from "./_components/banner";
import { Categories } from "./_components/categories";
import { SpecialDishes } from "./_components/special-dishes";
import { Testimonials } from "./_components/testimonials";
import { OutService } from "./_components/out-service";

export default function Home() {
  return (
    <>
      <Banner />
      <Categories />
      <SpecialDishes />
      <Testimonials />
      <OutService />
    </>
  );
}
