import React from 'react'
import Features from '../FeaturesTab'
import Gallery from '../Gallery'

const MainWrapper = () => {
  return (
    <div className=' flex  bg-gradient-to-b from-[#373E44] to-[#191B1F] min-h-[895px] gap-[57px] rounded-xl items-center justify-center'>
      <div className="w-[836px] border h-full"></div>
      <div className="w-1/2">
      <Features/>
      <Gallery/>

      </div>
    </div>
  )
}

export default MainWrapper