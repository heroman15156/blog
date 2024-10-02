import React from 'react';
import Badge from './Badge';

const techStack = [
  { name: 'React', color: 'blue' },
  { name: 'Next.js', color: 'green' },
  { name: 'NestJS', color: 'red' },
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
