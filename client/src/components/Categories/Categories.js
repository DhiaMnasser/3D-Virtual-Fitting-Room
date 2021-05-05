import React from 'react'
import { useSelector } from 'react-redux'
import Category from './Category'
import AddCategoryForm from '../Forms/CategoryForm/AddCategory/AddCategoryForm'

function Categories() {
      const categories = useSelector((state) => state.categories.categories)

    return (
        <div>
  <table class="table table-striped">
  <thead>
      <th>Add Categorie</th>
      <th>Categories List</th>
  </thead>
  <tbody>
  <td><AddCategoryForm/> </td>
      <th>
  {categories.map((category,index)=>{
                return<Category key={index}  category={category}></Category>
            })}
            </th>
    </tbody>
    </table>            
    </div>
    )
}

export default Categories
