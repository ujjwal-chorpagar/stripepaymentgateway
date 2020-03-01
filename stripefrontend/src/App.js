import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';
import button from 'materialize-css';

function App() {

  const [product, setProduct] = useState({
    name: "React from FB",
    price: 10,
    productBy: "Facebook"
  });

  const makePayment = token =>{
    const body = {
      token,
      product 
    }

    const headers = {
      "Content-Type": "application/json",
    }

    return fetch(`http://localhost:9000/payment`, {
      method: "POST",
      headers,
      body:JSON.stringify(body)
    })
    .then( response => {
      console.log("Response",response)
      const {status} = response;
      console.log("STATUS", status)
    })
    .catch(error => console.log(error));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <StripeCheckout 
        stripeKey="{Stripe Public Key Here }" 
        token={makePayment} 
        name="Buy React" 
        amount={product.price*100}
        >
          <button className="waves-effect waves-light btn-small">pay to fb</button>
        </StripeCheckout>
        
      </header>
    </div>
  );
}

export default App;
