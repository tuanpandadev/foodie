import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

import { Product } from "@/types";

interface CardProps {
  item: Product;
}

export function Cards({ item }: CardProps) {
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div className="card shadow-xl relative mr-5 md:my-5 dark:bg-[#232b33]">
      <div
        className={`rating cursor-pointer gap-1 absolute right-2 top-2 p-4 heart-star bg-green ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="size-5" />
      </div>
      <Link className="hover:border-none" to={`/menu/${item.id}`}>
        <figure>
          <img
            src={item.image}
            alt="Shoes"
            className="hover:scale-105 transition-all duration-300 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link className="hover:border-none" to={`/menu/${item.id}`}>
          <h2 className="card-title">{item.name}!</h2>
        </Link>
        <p>Description of the item</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$ </span> {item.price}
          </h5>
          <button className="btn bg-green text-white">Add to Cart </button>
        </div>
      </div>
    </div>
  );
}
