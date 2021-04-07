import React from 'react'
import { useSelector } from 'react-redux'
import Category from './Category'
import AddCategoryForm from '../Forms/CategoryForm/AddCategory/AddCategoryForm'

function Categories() {
      const categories = useSelector((state) => state.categories.categories)

    return (
        <div>
            <AddCategoryForm/>
            {categories.map((category,index)=>{
                return<Category key={index}  category={category}></Category>
                

            })}
        </div>
    )
}

export default Categories
