import { Cards } from "@/components/cards";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa6";

enum Category {
  ALL = "all",
  SALAD = "salad",
  PIZZA = "pizza",
  SOUP = "soup",
  DESSERT = "dessert",
  DRINKS = "drinks"
}

export default function MenuPage() {
  const [itemsPerPage] = useState(9);

  const [menus, setMenus] = useState<Product[]>([]);
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    Category.ALL
  );
  const [sortOption, setSortOption] = useState<string>("default");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/menu.json");
        const data = await response.json();

        setMenus(data);
        setFilteredItems(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    const filtered =
      category === Category.ALL
        ? menus
        : menus.filter((menu) => menu.category === category);
    setFilteredItems(filtered);
    setCurrentPage(1);
  };

  //   sort based on A-Z or Z-A, Lowest to Highest or Highest to Lowest
  const handleSortChange = (option: string) => {
    setSortOption(option);
    const sortedItems = [...filteredItems];
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        setFilteredItems(menus);
        return;
    }
    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const handlePaginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* menu banner */}
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100% dark:from-transparent dark:to-transparent">
        <div className="py-48 flex flex-col justify-center items-center gap-8">
          {/* content */}
          <div className="text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              For the Love of Delicious <span className="text-green">Food</span>
            </h2>
            <p className="text-[#4A4A4A] text-xl md:w-4/5 mx-auto">
              Come with family & feel the joy of mouthwatering food such as
              Greek Salad, Lasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas
              Rellenas and more for a moderate cost
            </p>
            <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* menu products */}
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100% dark:from-transparent dark:to-transparent">
        {/* filtering & sorting */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-0">
          {/* all product button */}
          <div className="flex flex-row justify-center md:justify-start md:gap-8 gap-4 md:mb-0 mb-4 flex-wrap">
            <button
              onClick={() => handleCategoryChange(Category.ALL)}
              className={`hover:border-none ${
                selectedCategory === Category.ALL
                  ? "underline underline-offset-4 text-green"
                  : ""
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleCategoryChange(Category.SALAD)}
              className={`hover:border-none ${
                selectedCategory === Category.SALAD
                  ? "underline underline-offset-4 text-green"
                  : ""
              }`}
            >
              Salad
            </button>
            <button
              onClick={() => handleCategoryChange(Category.PIZZA)}
              className={`hover:border-none ${
                selectedCategory === Category.PIZZA
                  ? "underline underline-offset-4 text-green"
                  : ""
              }`}
            >
              Pizza
            </button>
            <button
              onClick={() => handleCategoryChange(Category.SOUP)}
              className={`hover:border-none ${
                selectedCategory === Category.SOUP
                  ? "underline underline-offset-4 text-green"
                  : ""
              }`}
            >
              Soups
            </button>
            <button
              onClick={() => handleCategoryChange(Category.DESSERT)}
              className={` hover:border-none ${
                selectedCategory === Category.DESSERT
                  ? "underline underline-offset-4 text-green"
                  : ""
              }`}
            >
              Desserts
            </button>
            <button
              onClick={() => handleCategoryChange(Category.DRINKS)}
              className={` hover:border-none ${
                selectedCategory === Category.DRINKS
                  ? "underline underline-offset-4 text-green"
                  : ""
              }`}
            >
              Drinks
            </button>
          </div>
          {/* sorting options */}
          <div className="flex justify-end relative">
            <div className="absolute left-2 top-1/2 -translate-y-1/2">
              <FaFilter className="size-4" />
            </div>
            <select
              name="sort"
              id="sort"
              className="flex gap-x-2 items-center select select-bordered pl-8 min-h-11 h-11"
              value={sortOption}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>
        {/* product cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentItems.map((product) => (
            <Cards item={product} key={product.id} />
          ))}
        </div>
      </div>

      {/* Pagination section */}
      <div className="section-container flex gap-x-2 justify-center my-4">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage)
        }).map((_, index) => (
          <button
            className={`btn border-none rounded-full min-w-12 min-h-12 ${
              currentPage === index + 1
                ? "bg-green hover:bg-green text-white"
                : ""
            } `}
            key={index + 1}
            onClick={() => handlePaginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
