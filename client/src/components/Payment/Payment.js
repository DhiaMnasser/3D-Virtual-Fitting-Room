import { CardForm, BankForm, PaymentMethods } from 'react-payment';
import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Stripe} from 'meteor/mrgalaxy:stripe'
import server from './server';

let loadedStripe = false;


export default class Payment extends Component {
  state = {
    dialogOpen: false,
    cardDialog: true
  };
  componentWillMount() {
    if (loadedStripe) {
      return;
    }
 
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v2/";
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => {
      Stripe.setPublishableKey('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
    };
    document.body.appendChild(script);
 
    loadedStripe = true;
  }
 
  openDialog = (type) => {
    this.setState({
      dialogOpen: true,
      cardDialog: type === 'card' ? true : false
    });
  };
 
  closeDialog = () => {
    this.setState({dialogOpen: false});
  };
 
  removeCard = (id) => {
    server.removeCard(id);
  };
 
  removeBank = (id) => {
    server.removeBankAccount(id);
  };
 
  onSubmitCard = (card) => {
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
        alert('Adding card failed with error: ' + response.error.message)
      } else {
        const cardToken = response.id;
        server.saveCard(cardToken);
        this.closeDialog();
        // show success message
      }
    });
  };
 
  onSubmitBank = (account) => {
    const { name, accountNumber, routingNumber, accountType } = account;
    const account_holder_type = accountType === 'personal' ? 'individual' : 'company';
 
    Stripe.bankAccount.createToken({
      country: 'US',
      currency: 'USD',
      routing_number: routingNumber,
      account_number: accountNumber,
      account_holder_name: name,
      account_holder_type
    }, (status, response) => {
      if (response.error) {
        alert('Adding bank account failed with error: ' + response.error.message);
      } else {
        const bankAccountToken = response.id;
        server.saveBankAccount(bankAccountToken);
        this.closeDialog();
        // show success message
      }
    })
  };
 
  render() {
    const title = this.state.cardDialog ? 'Add credit card' : 'Add bank account';
 
    return (
      <MuiThemeProvider>
        <PaymentMethods
          showCards={true}
          showBanks={true}
          cards={[{ id: '1', last4: '1234', brand: 'visa' }]}
          banks={[]}
          onAddCard={() => this.openDialog('card')}
          onAddBank={() => this.openDialog('bank')}
          onRemoveCard={this.removeCard}
          onRemoveBank={this.removeBank}
          />
        <Dialog
          title={title}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.closeDialog}
        >
          {
            this.state.cardDialog ?
            <CardForm
              onSubmit={this.onSubmitCard}
              getName={true}
              getZip={true}
            />
            :
            <BankForm
              onSubmit={this.onSubmitBank}
            />
          }
        </Dialog>
      </MuiThemeProvider>
    );
  }
}