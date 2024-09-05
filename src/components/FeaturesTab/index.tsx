"use client"

import featuresTabData from '@/data/featuresTabData';
import type { TFeaturesTab } from '@/types';
import React, { useState } from 'react';
import CardSideDock from '../CardSideDock';
import HrLine from '../HrLine';
import FeaturesTabItem from './FeaturesTabItem';

const FeaturesTab = () => {
  const [currentTab, setCurrentTab] = useState<string>('tabOne');

  return (
    <section className='relative max-w-[720px] w-full'>
      <div className="px-[53px] py-[17px] bg-cardHo rounded-[18.89px] relative shadow-custom-card">

        <div className=" max-w-[614px] w-full rounded-[23px] bg-tabHo p-1">

          {/* <-------------- Tab Menu Start ------------> */}

          <div className="max-w-[597px] w-full mx-auto flex h-[62px] gap-[6px] justify-between">

            <div className="w-1/3 h-full">
              <button
                className={`py-[10px] px-6 text-[18px] rounded-[16px] h-full w-full font-medium font-poppins leading-4 text-center text-white  ${currentTab === 'tabOne' ? 'bg-tabActiveHo' : 'bg-transparent'}`}

                onClick={() => setCurrentTab('tabOne')}
              >
                About me
              </button>
            </div>
            <div className="w-1/3 h-full">
              <button
                className={`py-[10px] px-6 text-[18px] rounded-[16px] h-full w-full font-poppins font-medium leading-4 text-center text-white  ${currentTab === 'tabTwo' ? 'bg-tabActiveHo' : 'bg-transparent'}`}
                onClick={() => setCurrentTab('tabTwo')}
              >
                Experiences
              </button>

            </div>
            <div className="w-1/3  h-full">
              <button
                className={`py-[10px] px-6 text-[18px] font-poppins rounded-[16px] font-medium h-full w-full leading-4 text-center text-white  ${currentTab === 'tabThree' ? 'bg-tabActiveHo' : 'bg-transparent'}`}
                onClick={() => setCurrentTab('tabThree')}
              >
                Recommended
              </button>
            </div>

          </div>
        </div>

        {/* <-------------- Tab Menu End ------------> */}

        <div className="absolute left-0 top-0">
          <CardSideDock />
        </div>

        {/* <-------------- Tab Content Start ------------> */}

        <div className="">
          {featuresTabData.map((item: TFeaturesTab) => (
            <div
              className={item.id === currentTab ? 'block' : 'hidden'}
              key={item.id}
            >
              <FeaturesTabItem
                featureTab={item}
              />
            </div>
          ))}
        </div>
        {/* <-------------- Tab Content End ------------> */}

      </div>
      <div className="mb-4 mt-[21px]">
        <HrLine />
      </div>

    </section>
  )
}

export default FeaturesTab