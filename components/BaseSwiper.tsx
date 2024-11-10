'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useRef, useState } from 'react';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { PROJECTS_PATHNAME } from '@/constant/pathname';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Swiper as SwiperType } from 'swiper/types';
import { Navigation as NavigationModule } from 'swiper/modules';
import type { NavigationOptions } from 'swiper/types';
import Badge from '@/components/Badge';
import { Project } from '@/model/project';

type Props = {
  projects: Project[];
  slidesPerViewLarge: number;
  slidesPerViewSmall: number;
};

export default function BaseSwiper({ projects, slidesPerViewSmall, slidesPerViewLarge }: Props) {
  const [isBeginning, setIsBeginning] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [isMount, setIsMount] = useState(false); // 마운트 여부를 저장하는 상태
  const swiperRef = useRef<SwiperType>();
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const updateNavigationState = (swiper: SwiperType) => {
    setIsBeginning(swiper.activeIndex > 0);
    setIsEnd(swiper.isEnd);
  };

  useEffect(() => {
    setIsMount(true);
  }, []);

  useEffect(() => {
    if (isMount && swiperRef.current) {
      const swiperInstance = swiperRef.current;

      if (prevRef.current && nextRef.current) {
        if (!swiperInstance.params.navigation) {
          swiperInstance.params.navigation = {};
        }
        const navigation = swiperInstance.params.navigation as NavigationOptions;

        navigation.prevEl = prevRef.current;
        navigation.nextEl = nextRef.current;

        // navigation 업데이트 전에 존재 여부를 확인합니다.
        swiperInstance.navigation?.update();
      }

      swiperInstance.on('slideChange', () => {
        updateNavigationState(swiperInstance);
      });

      updateNavigationState(swiperInstance);
    }
  }, [isMount]);

  return (
    <div className="relative">
      <Swiper
        modules={[NavigationModule]}
        spaceBetween={20}
        slidesPerView={slidesPerViewSmall}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        breakpoints={{
          768: { slidesPerView: slidesPerViewSmall },
          1024: { slidesPerView: slidesPerViewLarge },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateNavigationState(swiper);
        }}
        className="mySwiper"
        style={{ paddingBottom: '50px' }}
      >
        {projects.map((project, index) => (
          <SwiperSlide
            key={index}
            className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-700 cursor-pointer min-h-[310px]"
            onClick={() => {
              router.push(`${PROJECTS_PATHNAME}/${project.id}`);
            }}
          >
            <div className="relative w-full h-40">
              <Image
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover rounded-t-lg"
                fill // width, height 대신 fill 사용
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={100}
                priority
              />
            </div>
            <div className="px-4 pt-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{project.title}</h2>
              <div className="mt-3 flex justify-between">
                <Badge text={project.category} color="blue" />
                <Badge text={project.mainTech} color="green" />
              </div>
            </div>
          </SwiperSlide>
        ))}

        <SwiperSlide>
          <div className="flex flex-col items-center justify-center h-[290px]">
            <Link
              href={PROJECTS_PATHNAME}
              className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              <FaArrowRight className="w-6 h-6 text-gray-600 dark:text-gray-200" />
            </Link>
            <p className="text-gray-700 dark:text-gray-300">전체보기</p>
          </div>
        </SwiperSlide>
      </Swiper>

      <button
        ref={prevRef}
        className={`absolute left-[-27px] sm:left-[-30px] top-1/3 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
          !isBeginning ? 'invisible opacity-0' : 'visible opacity-100'
        }`}
      >
        <FaChevronLeft className="text-gray-600 dark:text-gray-300" size={20} />
      </button>

      <button
        ref={nextRef}
        className={`absolute right-[-28px] top-1/3 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
          isEnd ? 'invisible opacity-0' : 'visible opacity-100'
        }`}
      >
        <FaChevronRight className="text-gray-600 dark:text-gray-300" size={20} />
      </button>
    </div>
  );
}
