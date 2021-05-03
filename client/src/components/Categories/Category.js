import * as api from "../../api/index";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Validation } from '../Forms/CategoryForm/AddCategory/Validations/validation'
import {updateCategory,editCategory} from '../../redux/slices/categories'
import {deleteCategory,selectCategory,deselectCategory} from '../../redux/slices/categories'
import { useFormik } from 'formik'
import './style.css';
function Category(props) {
    const dispatch= useDispatch()
const [update, setUpdate] = useState(false)
const [categName, setCategName] = useState(props.category.categoryName);

  const formik = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema: Validation,
    onSubmit: async (values) => {
      // e.preventDefault();
          setUpdate(false)
      try {
    const  data = await api.updateCategory(props.category._id, values);

const datas = {"_id": props.category._id, ...data.data}
console.log(datas)
setCategName(datas.categoryName)
    dispatch(editCategory(datas));
  } catch (error) {
    console.log(error.response);
  }
    }
  });
 
const handle=()=>{
setUpdate(!update)
}
    return (<>
<table class="table table-striped">
    <tr>
      <th scope="row"></th>
      <th><div>{update===true || <div><div className="kl" >
            <div onClick={()=>{  handle()}}>{categName}</div></div></div>}
            </div></th>
      <th><button className="btn btn-danger" onClick={()=>{ dispatch(deleteCategory(props.category._id))}}>delete</button></th>
    </tr>
</table>
          {update===false || <div>
               <form onSubmit={formik.handleSubmit }>
                <input
                  name="categoryName"
                  type="text"
                  placeholder="category Name"
                  value={formik.values.categoryName}
                  onChange={formik.handleChange}
                />
              <button className="btn btn-sucess"  type="submit" >
                Submit
                </button>
            </form>
        </div>}

        </>
    )
}

export default Category
