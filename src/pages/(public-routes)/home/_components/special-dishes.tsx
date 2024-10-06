import { useEffect, useRef, useState } from "react";
import Slider, { Settings, ResponsiveObject } from "react-slick";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import { Product } from "@/types";

import { Cards } from "@/components/cards";

import { SampleNextArrow } from "./sample-next-arrow";
import { SamplePrevArrow } from "./sample-prev-arrow";

export function SpecialDishes() {
  const [recipes, setRecipes] = useState<Product[]>([]);
  const [canNext, setCanNext] = useState(true);
  const [canPrev, setCanPrev] = useState(false);
  const slider = useRef<Slider>(null);

  const [settings, setSettings] = useState<Settings>({
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  });

  useEffect(() => {
    (async () => {
      const res = await fetch("/menu.json");
      const data = await res.json();

      const specials = data.filter(
        (item: { category: string }) => item.category === "popular"
      );
      setRecipes(specials);
    })();
  }, []);

  useEffect(() => {
    function findClosestBreakpoint(
      width: number,
      breakpoints: ResponsiveObject[]
    ) {
      let closest = breakpoints[0];

      for (const breakpoint of breakpoints) {
        if (
          Math.abs(breakpoint.breakpoint - width) <
          Math.abs(closest.breakpoint - width)
        ) {
          closest = breakpoint;
        }
      }

      return closest.breakpoint;
    }

    const updateSettingsBasedOnWidth = () => {
      setSettings((prevSettings) => {
        const width = window.innerWidth;
        const newSettings = { ...prevSettings };
        const breakpoint = findClosestBreakpoint(
          width,
          newSettings.responsive!
        );

        const responsiveSettings = newSettings.responsive?.find(
          (value) => Number(value.breakpoint) === Number(breakpoint)
        );

        if (responsiveSettings) {
          const data = {
            ...newSettings,
            slidesToShow: (responsiveSettings.settings as Settings)
              .slidesToShow,
            slidesToScroll: (responsiveSettings.settings as Settings)
              .slidesToScroll
          };
          return data;
        }
        return newSettings;
      });
    };

    updateSettingsBasedOnWidth();

    window.addEventListener("resize", updateSettingsBasedOnWidth);
    return () => {
      window.removeEventListener("resize", updateSettingsBasedOnWidth);
    };
  }, []);

  const handleBeforeChange = (_current: number, next: number) => {
    setCanPrev(next > 0);
    setCanNext(next + settings.slidesToShow! !== recipes.length);
  };

  return (
    <div className="section-container py-16 relative">
      <div className="text-left">
        <p className="subtitle">Special Dishes</p>
        <h2 className="title md:w-[520px]">Standard Dishes From Our Menu</h2>
      </div>
      <div className="flex gap-x-1 justify-center md:block md:absolute md:right-3 md:top-24 md:mr-24">
        <button
          disabled={!canPrev}
          className={`btn p-2 rounded-full ml-5 dark:bg-[#232b33]`}
          onClick={() => slider?.current?.slickPrev()}
        >
          <FaAngleLeft className="size-8 p-1" />
        </button>
        <button
          disabled={!canNext}
          className={`btn p-2 rounded-full ml-5 dark:bg-[#232b33]`}
          onClick={() => slider?.current?.slickNext()}
        >
          <FaAngleRight className="size-8 p-1" />
        </button>
      </div>
      <Slider
        ref={slider}
        {...settings}
        beforeChange={handleBeforeChange}
        className="overflow-hidden mt-10 space-x-5"
      >
        {recipes.map((item, i) => (
          <Cards item={item} key={i} />
        ))}
      </Slider>
    </div>
  );
}
