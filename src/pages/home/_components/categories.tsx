const categoryItems = [
  {
    id: 1,
    title: "Main Dish",
    description: "(86 dishes)",
    image: "/images/home/category/img1.png"
  },
  {
    id: 2,
    title: "Break Fast",
    description: "(12 break fast)",
    image: "/images/home/category/img2.png"
  },
  {
    id: 3,
    title: "Dessert",
    description: "(48 dessert)",
    image: "/images/home/category/img3.png"
  },
  {
    id: 4,
    title: "Browse All",
    description: "(255 Items)",
    image: "/images/home/category/img4.png"
  }
];

export function Categories() {
  return (
    <div className="section-container py-16">
      <div className="text-center">
        <p className="subtitle">Customers Favorites</p>
        <h2 className="title">Popular Catagories</h2>
      </div>
      {/* category cards */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-y-8 gap-x-5 justify-around items-center mt-12">
        {categoryItems.map((category) => (
          <div
            key={category.id}
            className="shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 transition-all duration-300 z-10 dark:bg-[#232b33]"
          >
            <div className="flex items-center justify-center w-full mx-auto">
              <img
                src={category.image}
                alt={category.title}
                className="bg-[#C1F1C6] p-5 rounded-full w-28 h-28"
              />
            </div>
            <div className="mt-5 space-y-1">
              <h5>{category.title}</h5>
              <p>{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
