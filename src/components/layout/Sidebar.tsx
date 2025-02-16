export const Sidebar = () => {
  const categories = [
    'Electronics',
    'Home & Living',
    'Fashion',
    'Sports Equipment',
    'Garden & Tools',
    'Health & Wellness',
    'Books & Media',
    'Collectibles',
    'Automotive',
    'Art & Crafts',
    'Musical Instruments',
    'Office Supplies',
    'Cameras & Photo',
    'Gaming',
    'Outdoor Gear',
    'Other',
  ];

  return (
    <div className="px-6 py-4">
      <h2 className="text-2xl font-normal text-gray-900 mb-4">Categories</h2>
      <ul className="space-y-3">
        {categories.map((category) => (
          <li key={category}>
            <a
              href={`/category/${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="text-gray-600 hover:text-[#4169e1] text-base block"
            >
              {category}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
