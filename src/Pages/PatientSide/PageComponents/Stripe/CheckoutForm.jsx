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
    <div className='w-full h-full bg-gray-300'>
        <form className="w-[500px] h-[300px] px-2 py-3 flex flex-col text-center justify-evenly bg-gray-100 shadow-md rounded-md custom-form-style">
      <div className="mb-4">
        <label htmlFor="card-element" className="block text-sm font-medium text-gray-700">
          Card details
        </label>
        <div id="card-element" className="mt-1">
          <CardElement className="p-2 bg-red-300 border rounded-md focus:outline-none focus:ring focus:border-green-300" />
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300 disabled:opacity-50 custom-button-style"
        disabled={!stripe}
        onClick={handleSubmit}
      >
        Pay for Hospital Services
      </button>
    </form>
    </div>
  
  );
};

export default CheckoutForm;
