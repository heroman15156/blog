'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ContactSocialSection from '@/components/ContactSocialSection';
import styles from '@/app/about/about.module.css';

export default function AboutMeSection() {
  const skillRef = useRef<HTMLDivElement | null>(null);
  const [isMovingUp, setIsMovingUp] = useState(false);
  const [isSpread, setIsSpread] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsMovingUp(true);
            setTimeout(() => {
              setIsSpread(true);
            }, 1500);
          } else {
            // 화면에서 사라지면 초기화
            setIsMovingUp(false);
            setIsSpread(false);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-100px',
      }
    );

    if (skillRef.current) {
      observer.observe(skillRef.current);
    }

    return () => {
      if (skillRef.current) {
        observer.unobserve(skillRef.current);
      }
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3 }}
      className="py-16 bg-background dark:bg-background"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold mb-6 pb-2 border-b-[8px] border-gray-300 dark:border-gray-600 inline-block">
          About Me
        </h2>
        <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
          끊임없는 성장과 학습을 삶의 원동력으로 삼는 열정적인 웹 개발자입니다. 새로운 기술을
          습득하고 이를 실제 프로젝트에 적용하는 과정에서 큰 즐거움을 느낍니다. 지식은 나눌 때 그
          가치가 배가 된다고 믿으며, 동료들과의 지식 공유를 통해 함께 성장하는 문화를 만들어가고
          있습니다. 최신 웹 기술 트렌드를 주시하며, 이를 활용하여 사용자 중심의 혁신적인 웹 솔루션을
          개발하는 것을 목표로 합니다. 개인의 성장이 팀과 프로젝트의 성공으로 이어진다는 믿음 하에,
          학습과 성장을 일상화하며 더 나은 개발자가 되기 위해 노력하고 있습니다. 기술적 전문성과
          창의성을 바탕으로, 사용자에게 가치 있는 경험을 제공하는 웹 애플리케이션을 만들어가는
          여정에 함께하고 싶습니다..
        </p>
        <ContactSocialSection />
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">주요 기술 스택</h3>
          <div className="w-full flex justify-center">
            <div className={styles.scene}>
              <div className={styles.cube}>
                <div className={`${styles.face} ${styles.front}`}></div>
                <div className={`${styles.face} ${styles.right}`}></div>
                <div className={`${styles.face} ${styles.back}`}></div>
                <div className={`${styles.face} ${styles.left}`}></div>
                <div className={`${styles.face} ${styles.bottom}`}></div>
                <div
                  className={`${styles.skillsContainer} ${isMovingUp ? styles.startAnimation : ''}`}
                  id="skillsContainer"
                  ref={skillRef}
                  data-spread={isSpread ? 'true' : 'false'}
                >
                  <div className={`${styles.skill} ${isSpread ? styles.spreadLeft : ''}`}>
                    TypeScript
                  </div>
                  <div className={`${styles.skill} ${isSpread ? styles.spreadCenter : ''}`}>
                    React
                  </div>
                  <div className={`${styles.skill} ${isSpread ? styles.spreadRight : ''}`}>
                    Next.js
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
