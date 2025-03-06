import Categories from '@/components/admin/Category'
import { getAllCategory } from '@/services/category'
import React from 'react'

const CategoryPage = async() => {
  const categories = await getAllCategory();
 
  

  return (
    <div>
      <Categories categories = {categories?.data} />
    </div>
  )
}

export default CategoryPage