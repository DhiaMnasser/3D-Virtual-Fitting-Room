import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {toast} from 'react-toastify';
function Stripe(props) {
    const [product,setProduct]=useState(
        {
            name:props.name,
            price:Number(props.price)

        }
    )
   async function handleToken(token,addresses) {
 console.log({token,addresses})
 const response=await axios.post('http://localhost:5000/checkout',{
     token,
     product
 })
 const {status}= response.data
 if(status==='success'){
     toast('Success',{type:'success'})
 }else{
     toast('failed',{type:'error'})
 }
    }
   
    return (
        <div>
            <StripeCheckout 
            stripeKey="pk_test_51IcLvHCPAWlRLabT6adlnxA0G0L53LzzHeX9BorU709bkAnuW9W3zEUYYFao4mq9WuE0NACPLELwduK8czUfAhtd00j5WIl0Zg"
            token={handleToken}
            amount={product.price*100}
            name={product.name}
            ></StripeCheckout>
        </div>
    )
}

export default Stripe
