const CategoryButton = ({ category }: { category: { name: string; emoji: string } }) => (
  <button className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
    <span className="mr-2">{category.emoji}</span>
    {category.name}
  </button>
);

export default CategoryButton;
