import React from 'react';
import Badge from './Badge';

const techStack = [
  { name: 'Typescript', color: 'blue' },
  { name: 'React', color: 'green' },
  { name: 'Next.js', color: 'red' },
];

export default function TechStackSection() {
  return (
    <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-2">
      {techStack.map((tech) => (
        <Badge key={tech.name} text={tech.name} color={tech.color as 'blue' | 'green' | 'red'} />
      ))}
    </div>
  );
}
