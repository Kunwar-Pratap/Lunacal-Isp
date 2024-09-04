"use client"

import Image from 'next/image';
import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import CardSideDock from '../CardSideDock';
import HrLine from '../HrLine';

const Gallery = () => {

  const [images, setImages] = useState([
    '/assets/images/image.png',
    '/assets/images/image.png',
    '/assets/images/image.png',
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAddImage = () => {
    const newImage = prompt('Enter the URL of new image');
    if (newImage) setImages([...images, newImage]);
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }

  const getVisibleImages = () => {
    return [
      images[currentIndex],
      images[(currentIndex + 1) % images.length],
      images[(currentIndex + 2) % images.length],
    ]
  }

  return (
    <>
      <section className='max-w-[720px] w-full  h-full relative'>
        <div className="pt-[20px] pb-[22px] px-[54px] bg-cardHo rounded-[18.89px] relative">

          <div className="flex items-center justify-between">
            <button className='h-[62px] w-[149px] bg-black text-white rounded-[20px] font-poppins text-[20px] leading-[30px]'>Gallery</button>
            <div className="flex gap-4">
              <button
                onClick={handleAddImage}
                className="w-[131px] h-[46px] text-[12px] leading-[6.29px] font-extrabold text-white rounded-[104px] shadow-custom-inner shadow-custom-outer text-center font-plusJak">

                <span className="text-[12.1px] -translate-y-[1px] inline-block mr-1">+</span>
                Add image
              </button>
              <div className="flex gap-3">
                <button
                  onClick={handlePrevious}
                  className="px-4 py-2 bg-sm-btn-gradient shadow-sm-btn-shadow text-white rounded-full">
                  <FaArrowLeft className='text-[#6f787c]' />

                </button>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-sm-btn-gradient shadow-sm-btn-shadow text-white rounded-full">
                  <FaArrowRight className='text-[#6f787c]' />
                </button>
              </div>
            </div>
          </div>

          <div className="absolute left-0 top-1">
            <CardSideDock />
          </div>

          <div className="flex gap-[20px] mt-[47px] ">
            {getVisibleImages().map((src, index) => (
              <div className="relative h-[179px] w-[190px] "
                key={index}
              >
                <Image
                  src={src}
                  fill
                  alt={`Gallery Image - ${index + 1}`}
                  className='rounded-[24px] object-cover grayscale hover:grayscale-0 hover:scale-x-[1.15] hover:scale-y-[1.14] duration-700 ease-in-out transform transition-all hover:rotate-[-1deg] h-auto w-auto'
                />
              </div>

            ))}
          </div>
        </div>
        <div className="mt-[22px]">
          <HrLine />
        </div>
      </section>
    </>
  )
}

export default Gallery