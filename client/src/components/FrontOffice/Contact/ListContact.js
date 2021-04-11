import React, { useState } from "react";
// import Product from "../Product/Product";
import { fa, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory } from "../../../redux/slices/contacts";
const Contacts = () => {
  const dispatch= useDispatch()
  const [update, setUpdate] = useState(false)
  const contacts = useSelector(state => state.contacts.contacts);

  console.log(contacts);
  const handle=()=>{
    setUpdate(!update)
    };
    const style = {
      
    };
  return (
    <>
    <table class="table align-middle">
  <thead>
    <tr>
      <th scope="col">Num</th>
      <th scope="col">Nom</th>
      <th scope="col">Email</th>
      <th scope="col">Message</th>
      <th scope="col">Options</th>
    </tr>
  </thead>
  {contacts.map((contacts)=>(
  <tbody>
    <tr>
      <td>contacts.id</td>
      <td>contacts.nom</td>
      <td>contacts.email</td>
      <td>contacts.message</td>
      <td>
        <button type="button" class="btn btn-danger btn-sm px-3" onClick={()=>{  dispatch(deleteCategory(contacts.id))}}>
          <i class="fas fa-times"></i>
        </button>
      </td>
    </tr>
    
  </tbody>
  ))}
</table>
    {/* <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
    <script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
    <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
    <div class="container">
    <div class="row">
        <div class="">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <span class="glyphicon glyphicon-list"></span>contacts List
                    <div class="pull-right action-buttons">
                        <div class="btn-group pull-right">
                            <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                                <span class="glyphicon glyphicon-cog" style={style}></span>
                            </button>
                            <ul class="dropdown-menu slidedown">
                                <li><a href="http://www.jquery2dotnet.com"><span class="glyphicon glyphicon-pencil"></span>Edit</a></li>
                                <li><a href="#"><span class="glyphicon glyphicon-trash"></span>Delete</a></li>
                                <li><a href="http://www.jquery2dotnet.com"><span class="glyphicon glyphicon-flag"></span>Flag</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {contacts.map((contacts)=>(
                <div class="panel-body">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="checkbox">
                                <input type="checkbox" id="checkbox" />
                                <label for="checkbox" onClick={()=>{  handle()}}>
                                {contacts.name}
                                </label>
                            </div>
                            <div class="pull-right action-buttons">
                                <a href="http://www.jquery2dotnet.com"><span class="glyphicon glyphicon-pencil"></span></a>
                                <button onClick={()=>{  dispatch(deleteCategory(contacts._id))}}class="trash"><span class="glyphicon glyphicon-trash"></span></button>
                                <a href="http://www.jquery2dotnet.com" class="flag"><span class="glyphicon glyphicon-flag"></span></a>
                            </div>
                        </li>
                    </ul>
                </div>
                 ))}
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-md-6">
                            <h6>
                                Total Count <span class="label label-info">25</span></h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> */}
</>
);
};

export default Contacts;