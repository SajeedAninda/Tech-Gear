import React from 'react'
import { GrSearch } from 'react-icons/gr'

const SearchItems = ({showSearch,handleShowSearch}) => {
  return (
    <div className='flex items-center gap-4 overflow-hidden'>
      <input
        className={`absolute right-[88px] top-1/2 -translate-y-1/2 w-[240px] rounded-lg bg-[#E5E5E5] py-2 px-6 transition-all duration-500 ease-in-out ${
          showSearch
            ? 'opacity-100 visible translate-x-0'
            : 'opacity-0 invisible -translate-x-full'
        }`}
        type='text'
        name='search'
        placeholder='Search for Gears'
      />
      <GrSearch
        onClick={handleShowSearch}
        className='text-[#111111] text-[24px] font-bold hover:opacity-65 cursor-pointer relative z-10'
      />
    </div>
  )
}

export default SearchItems
