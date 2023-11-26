import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate, Link, Navigate } from "react-router-dom";

const CheckoutForm = ({ clientSecret, appointmentId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        console.error(error);
        // Handle error display or other actions as needed
      } else if (paymentIntent.status === 'succeeded') {
        const response = await fetch('http://127.0.0.1:8000/api/confirm-payment/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            stripePaymentIntentId: paymentIntent.id,
            appointmentId,
          }),
        });

        if (response.ok) {
          console.log('Payment confirmed');
          // Handle successful payment confirmation
          navigate("/patient/appointments");
        } else {
          console.error('Error confirming payment:', await response.json());
          // Handle error in payment confirmation
        }
      }
    } catch (error) {
      console.error('Error during payment confirmation:', error);
      // Handle unexpected errors during payment confirmation
    }
  };

  return (
    <div className='w-full h-full '>
    <div className='w-full h-full bg-[#FFD8D7]  flex  py-3 px-4'>
      <div className='w-8/12 h-full  py-4 bg-green-300 rounded-l-[10px]'>
      
      </div>
      <div className='w-4/12 h-full py-4 bg-blue-300 rounded-r-[10px] '>
        
      </div>
    </div>
  </div>
  );
};

export default CheckoutForm;
