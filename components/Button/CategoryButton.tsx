import React from 'react';

type Props = {
  category: { name: string; emoji: string };
  isSelected: boolean;
  onClick: () => void;
};
export default function CategoryButton({ category, isSelected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        isSelected
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
      }`}
    >
      <span className="mr-2" role="img" aria-label={category.name}>
        {category.emoji}
      </span>
      {category.name}
    </button>
  );
}
