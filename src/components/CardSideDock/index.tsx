import Image from 'next/image'
import React from 'react'

const CardSideDock = () => {
  return (
    <div className='flex flex-col  w-fit min-h-52 h-full relative justify-between items-center pb-3 pt-[24px] px-4'>
      <Image
        src={'/assets/ico/q.png'}
        height={24}
        width={24}
        alt='?'
      />
      <Image
        src={'/assets/ico/f.png'}
        height={30.69}
        width={24}
        alt='f'
      />
    </div>
  )
}

export default CardSideDock