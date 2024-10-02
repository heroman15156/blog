'use client';
import React from 'react';
import { TypeAnimation } from 'react-type-animation';

export default function IntroductionSection() {
  return (
    <div className="flex justify-center pt-10px sm:pt-[100px] mb-16">
      <div className="text-center text-lg container">
        <TypeAnimation
          className="inline-block font-bold"
          sequence={['어려움에 도전하는 개발자 김현진입니다.', 1000]}
          wrapper="h1"
          speed={50}
          repeat={Infinity}
        />
      </div>
    </div>
  );
}
