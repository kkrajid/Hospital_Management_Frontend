import React, { useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';


const CheckoutForm = ({ clientSecret, appointmentId, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();




  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    try {
      // Confirm the card payment with the client secret
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            // Add billing details if needed
          },
        },
      });

      if (error) {
        console.error(error);
        // Handle error display or other actions as needed
      } else if (paymentIntent.status === 'succeeded') {
        // Payment succeeded, send a request to your backend to confirm the payment
        const response = await fetch('http://127.0.0.1:8000/api/confirm-payment/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            stripePaymentIntentId: paymentIntent.id,
            appointmentId,
            amount,
          }),
        });

        if (response.ok) {
          console.log('Payment confirmed');
          // Handle successful payment confirmation
          navigate('/patient/appointments');
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
    <div className='w-full h-full bg-[#D1D5DB] '>
      <div className='w-full h-full flex items-center justify-center '>
      <div className='w-[30%] h-[55%] rounded-[10px] bg-white shadow-lg p-2 '>
          <div className='w-full h-full p-3'>
            <form onSubmit={handleSubmit}>
              {/* Add user information components here */}
              {/* For example: */}


              {/* Payment Options */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Card Number</label>
                <div className="bg-gray-200 rounded-md p-4 border-2 border-gray-400 ">
                  <CardNumberElement className="" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Expiration Date</label>
                <div className="bg-gray-200 rounded-md p-4 border-2 border-gray-400">
                  <CardExpiryElement

                    className="outline-none" />

                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">CVV</label>
                <div className="bg-gray-200 rounded-md p-4 border-2 border-gray-400">
                  <CardCvcElement className="outline-none" />
                </div>
              </div>

              <div className='w-full flex items-center justify-center'>
              <button
                type="submit"
                className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-600"
                disabled={!stripe}
              >
                Pay
              </button>
              </div>
            </form>
          </div>
       
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
