import CardForm from 'react-payment/dist/CardForm';
import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Stripe} from 'meteor/mrgalaxy:stripe'
import server from './server';
class Card extends Component {
onSubmit(card){
  const { number, exp_month, exp_year, cvc, name, zip } = card;
  Stripe.card.createToken({
    number,
    exp_month,
    exp_year,
    cvc,
    name,
    address_zip: zip
  }, (status, response) => {
    if (response.error) {
      alert('Adding card failed with error: ' + response.error.message);
    } else {
      const cardToken = response.id;
      // send cardToken to server to be saved under the current user
      // show success message and navigate away from form
    }
  });


<CardForm
  onSubmit={this.onSubmit}
  getName={true}
  getZip={true}
/>;
}}
export default Card;
