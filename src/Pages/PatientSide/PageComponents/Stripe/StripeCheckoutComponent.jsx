import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PatientSideBar from '../PatientSideBar';

const stripePromise = loadStripe('pk_test_51O7aFpSFII5KNwJp2bsAyecnA5ZNfUCj61lEDpzjRp3xgwVBUAjcQWfo2BFGvqJUwKAUWF4D24SyOwwtrN2DoeSq00quZMuFz1');

const StripeCheckoutComponent = () => {
    const { payment_app } = useParams();
   const appointmentId = payment_app;
   const [clientSecret, setClientSecret] = useState(null);
   const [amount, setAmount] = useState(0);

   useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await axios.post('http://127.0.0.1:8000/api/create-payment-intent/', {
           appointmentId: appointmentId,
         });

         const data = response.data;
         console.log(response.data);
         setClientSecret(data.clientSecret);
         setAmount(data.amount); 
       } catch (error) {
         console.error('Error creating PaymentIntent:', error.message);
       }
     };

     fetchData();
   }, [appointmentId]);

   return (
     <PatientSideBar child={
       clientSecret && (
         <Elements stripe={stripePromise}>
             <CheckoutForm clientSecret={clientSecret} appointmentId={appointmentId} amount={amount} />
         </Elements>
       )} />
     
   );
};

export default StripeCheckoutComponent;
