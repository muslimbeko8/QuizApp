import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'

const CategoryPage = () => {
  const {id} = useParams()
  const sParams = useSearchParams()
  
  return (
    <div>
      
      {id || ""}
    </div>
  )
}

export default CategoryPage
