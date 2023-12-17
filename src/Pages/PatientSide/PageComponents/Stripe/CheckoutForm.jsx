import React, { useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../../../api/UseAxios';
import { Toaster, toast } from 'react-hot-toast';


const CheckoutForm = ({ clientSecret, appointmentId, amount, paymentData }) => {
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
        const response = await fetch(`${baseURL}confirm-payment/`, {
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
          toast.success('Payment confirmed. Appointment is confirmed.');
          // Handle successful payment confirmation
          navigate('/patient/appointments');
        } else {
          console.error('Error confirming payment:', await response.json());
          // Handle error in payment confirmation
        }
      }
    } catch (error) {
      console.error('Error during payment confirmation:', error);
      // Handle unexpected errors during payment confirmation  bg-gradient-to-r from-purple-700 to-indigo-700
    }
  };

  const closePayment = ()=>{
    navigate('/patient/appointments');
  }

  return (
    <div className="flex items-center  justify-center h-screen bg-gray-700 rounded-xl ">

      <div className="relative">

        <div className="fixed inset-0 flex items-center justify-center z-50 shadow">
          <div
            className="absolute inset-0 bg-gray-600 bg-opacity-30 backdrop-blur-[3px]"
            onClick={'closeModal'}
          ></div>
     
            <div className="w-2/5 max-w-2xl bg-white rounded-xl overflow-hidden shadow-lg z-10">
              <div className="bg-[#B0B0B0] p-6 text-white">

                <h2 className="text-3xl font-bold flex justify-between "><p>{paymentData.appointment_data.doctor_profile.user.full_name}</p><p className='text-lg'>{paymentData.appointment_data.doctor_profile.specialization}</p></h2>
                <p className="text-sm flex justify-end"><p>{paymentData.appointment_data.time_slot.start_time}-{paymentData.appointment_data.time_slot.end_time}</p> </p>
                <p className="text-sm flex justify-end">{paymentData.appointment_data.time_slot.date}</p>
                <p className="text-lg font-bold flex justify-end"> <p>Amount:</p> <p>Rs.{amount}</p></p>
              </div>
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Payment Details</h1>
                <form onSubmit={handleSubmit}>
                  {/* Payment Options */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Card Number</label>
                    <div className="bg-gray-200 rounded-md p-4 border-2 border-gray-400">
                      <CardNumberElement className="" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Expiration Date</label>
                    <div className="bg-gray-200 rounded-md p-4 border-2 border-gray-400">
                      <CardExpiryElement className="outline-none" />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">CVV</label>
                    <div className="bg-gray-200 rounded-md p-4 border-2 border-gray-400">
                      <CardCvcElement className="outline-none" />
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={closePayment}
                    className="bg-gray-500 text-white font-bold w-full py-3 px-6 rounded-md mr-2 hover:bg-gray-600"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="bg-[#B0B0B0] text-white font-bold w-full py-3 px-6 rounded-md hover:bg-blue-600"
                    disabled={!stripe}
                  >
                    Pay Now
                  </button>
                  </div>
                </form>
              </div>
            </div>
         
        </div>

      </div>

    </div>
  );
};

export default CheckoutForm;
