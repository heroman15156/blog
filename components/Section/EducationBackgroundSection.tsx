'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaGraduationCap } from 'react-icons/fa';

export default function EducationalBackgroundSection() {
  const educations = [
    {
      institution: '코드스테이츠',
      course: '풀스택 과정 수료',
      period: '2020.03 - 2020.09',
      icon: 'code',
    },
    {
      institution: '인하대학교',
      course: '소프트웨어융합과 (중퇴)',
      period: '2019',
      icon: 'graduation',
    },
  ];
  return (
    <section className="py-16 bg-background dark:bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-extrabold mb-12 inline-block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Education
          <div className="h-[0.5rem] bg-gray-300 dark:bg-gray-600 mt-2"></div>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educations.map((edu, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                    {edu.icon === 'graduation' ? (
                      <FaGraduationCap className="text-white text-2xl" />
                    ) : (
                      <FaCode className="text-white text-2xl" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{edu.institution}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{edu.period}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{edu.course}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
