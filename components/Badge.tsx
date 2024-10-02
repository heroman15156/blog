import React from 'react';

type BadgeProps = {
  text: string;
  color: 'blue' | 'green' | 'yellow' | 'red';
};

export default function Badge({ text, color }: BadgeProps) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <span
      className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${colorClasses[color]}`}
    >
      {text}
    </span>
  );
}
