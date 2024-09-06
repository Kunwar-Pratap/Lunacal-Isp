import React from 'react'
import Features from '../FeaturesTab'
import Gallery from '../Gallery'

const MainWrapper = () => {
  return (
    <div className='flex border-none box-border bg-custom-main-gradient min-h-[895px] lg:gap-[57px] gap-4 rounded-xl items-center justify-center shadow-custom-main lg:px-4 px-[2px] md:flex-row  flex-col overflow-auto'>
      <div className="w-1/2  border border-bBlankHo md:min-h-[689px]   hidden md:block rounded-[27px] bg-blankHo overflow-auto"></div>
      <div className="md:w-1/2  relative overflow-auto">
        <Features />
        <Gallery />
      </div>
    </div>
  )
}

export default MainWrapper