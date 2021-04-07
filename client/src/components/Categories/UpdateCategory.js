import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateCategory } from '../../api'

import { Validation } from '../Forms/CategoryForm/AddCategory/Validations/validation'
function UpdateCategory(props) {
    const dispatch= useDispatch()


  const formik = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema: Validation,
    onSubmit: async (values) => {
      // e.preventDefault();
    
    
      dispatch(updateCategory(props.category._id,values))
  
    }
  });
    return (<>
 <div>
               <form onSubmit={formik.handleSubmit }>
              
                <input
                  name="categoryName"
                  type="text"
                  placeholder="category Name"
                  value={formik.values.categoryName}
                  onChange={formik.handleChange}
                />

              <button  type="submit" >
                Submit
                </button>

            </form>
        </div>

        </>
    )
}

export default UpdateCategory