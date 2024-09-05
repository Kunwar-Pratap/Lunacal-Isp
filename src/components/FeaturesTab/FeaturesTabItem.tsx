import type { TFeaturesTab } from '@/types';
import React from 'react';

const FeaturesTabItem = ({ featureTab }: { featureTab: TFeaturesTab }) => {
  const { desc1, desc2 } = featureTab;

  return (
    <div className='pt-10 flex flex-col gap-7  '>
      <p className="text-gray-300 text-xl leading-[25.2px] font-normal font-plusJak">
        {desc1}
      </p>
      <p className="text-gray-300 text-xl leading-[25.2px] font-normal font-plusJak">
        {desc2}
      </p>
    </div>
  )
}

export default FeaturesTabItem