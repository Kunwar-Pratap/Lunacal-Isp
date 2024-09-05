import React from 'react'
import Features from '../FeaturesTab'
import Gallery from '../Gallery'

const MainWrapper = () => {
  return (
    <div className=' flex  border  bg-custom-main-gradient min-h-[895px]  gap-[57px] rounded-xl items-center justify-center shadow-custom-main px-4 xl:flex-row  flex-col overflow-hidden'>
      <div className="sc-1480:w-[836px] w-full border border-[#96bee7] xl:min-h-[689px] hidden xl:block rounded-[27px] bg-[#616161d1]"></div>
      <div className="sc-1480:w-1/2 ">
        <Features />
        <Gallery />

      </div>
    </div>
  )
}

export default MainWrapper