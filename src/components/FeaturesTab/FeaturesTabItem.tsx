import type { TFeaturesTab } from '@/types';
import React from 'react';

const FeaturesTabItem = ({ featureTab }: { featureTab: TFeaturesTab }) => {
  const { desc1, desc2 } = featureTab;

  return (
    <div className='lg:pt-10 pt-6 flex flex-col lg:gap-7 gap-4 overflow-auto'>
      <p className="text-gray-300 sc-1480:text-xl sc-1390:text-lg lg:text-base md:text-sm text-xs leading-5  sc-1390:leading-[25.2px] font-normal font-plusJak text-wrap">
        {desc1}
      </p>
      <p className="text-gray-300 sc-1480:text-xl sc-1390:text-lg lg:text-base md:text-sm text-xs leading-5 sc-1390:leading-[25.2px] font-normal font-plusJak text-wrap">
        {desc2}
      </p>
    </div>
  )
}

export default FeaturesTabItem