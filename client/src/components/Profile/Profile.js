import {React,useState }from 'react'

import { useFormik, Formik } from "formik";
import { useDispatch ,useSelector } from 'react-redux'
import {   Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Validation } from "./Validations/validation";
import { Container,Row,Col,Form } from 'react-bootstrap'
import profil from "./profil.png";
import updateUser from "../../redux/slices/auth";



function Profile(props) {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'));
 //const u = useSelector(state => state.users.users.find(u => u._id === user?.result?._id,));
  //const user = useState(props.location.user);

  const formik = useFormik({
    initialValues: {
      name:"",
      email :""
   
    
      
    },
    validationSchema: Validation,
   onSubmit: async values => {
      // e.preventDefault();
      dispatch(updateUser(user?.result?._id, values));
      console.log("vals update" + JSON.stringify(values, null, 4));
    }
  });
  
  return (
    <Container>
    <Row>
   <Col>
   <img src={profil} alt="profils pic" />
   </Col>
    <Col>
        <h1>User Profile</h1>
        <Form className="form">     

<Form.Group controlId="formCategory1">
<Form.Label>Username</Form.Label>
<Form.Control type="text" placeholder={user?.result?.name} Value={formik.values.message} name="name"/>

</Form.Group>
<Form.Group controlId="formCategory2">
<Form.Label>Email</Form.Label>
<Form.Control type="email" Value={user?.result?.email} name="email" />

</Form.Group>

<button
                className="btn btn-primary btn-icon-split btn-sm"
                type="submit"
              >
                Submit
              </button>
</Form>
</Col>

   </Row>
    </Container>
)

}
    


export default Profile;