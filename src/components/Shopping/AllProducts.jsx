'use client'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosInstance from '../Hooks/useAxiosInstance'
import FilterSidebar from './FilterSidebar'
import ProductSection from './ProductSection'
import { useParams } from 'next/navigation'

const AllProducts = () => {
  const [searchValue, setSearchValue] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(200000)
  const [sortOption, setSortOption] = useState('default')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const axiosInstance = useAxiosInstance()

  let params = useParams()
  console.log(params)

  const { data: productsData, isLoading } = useQuery({
    queryKey: [
      'products',
      searchValue,
      minPrice,
      maxPrice,
      sortOption,
      selectedCategory,
      selectedBrand,
      selectedTag,
      minRating,
      currentPage
    ],
    queryFn: async () => {
      const response = await axiosInstance.get('/filteredProducts', {
        params: {
          search: searchValue,
          minPrice,
          maxPrice,
          sortBy: sortOption === 'default' ? undefined : sortOption,
          category: selectedCategory,
          brand: selectedBrand,
          tagline: selectedTag,
          minRating,
          page: currentPage
        }
      })
      return response.data
    }
  })

  const handleCategoryChange = e => {
    setSelectedCategory(e.target.value)
    setSelectedBrand('')
    setCurrentPage(1)
  }

  const handleRatingChange = rating => {
    setMinRating(rating)
    setCurrentPage(1)
  }

  const handlePageChange = page => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resetFilters = () => {
    setSearchValue('')
    setMinPrice(0)
    setMaxPrice(200000)
    setSortOption('default')
    setSelectedCategory('')
    setSelectedBrand('')
    setSelectedTag('')
    setMinRating(0)
    setCurrentPage(1)
  }

  return (
    <div className='w-full flex justify-between gap-10 mt-10'>
      <FilterSidebar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        sortOption={sortOption}
        setSortOption={setSortOption}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        minRating={minRating}
        handleRatingChange={handleRatingChange}
        setCurrentPage={setCurrentPage}
      />

      <ProductSection
        productsData={productsData}
        isLoading={isLoading}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        resetFilters={resetFilters}
      />
    </div>
  )
}

export default AllProducts
