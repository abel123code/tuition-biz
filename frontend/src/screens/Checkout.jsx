import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { getAuth } from 'firebase/auth'; // Firebase Auth

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const priceId = searchParams.get('priceId');
  const tier = searchParams.get('tier');
  const auth = getAuth();

  

  useEffect(() => {
    const createCheckoutSession = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        navigate('/login'); // Redirect to login if not authenticated
        return;
      }

      const token = await currentUser.getIdToken(); // Get Firebase ID token
      console.log('token: ', token)

      const userId = currentUser.uid;
      console.log('tier: ', tier)

      if (priceId && tier) {
        try {
          const response = await fetch('https://educard-86c06b06f6c2.herokuapp.com/create-checkout-session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Add token to Authorization header
            },
            body: JSON.stringify({ priceId, userId, tier }),
          });

          const { sessionId } = await response.json();
          const stripe = await stripePromise;
          const { error } = await stripe.redirectToCheckout({ sessionId });

          if (error) {
            console.error('Stripe error:', error);
            navigate('/error');
          }
        } catch (error) {
          console.error('Error during checkout:', error);
          navigate('/error');
        }
      } else {
        navigate('/pricing');
      }
    };

    createCheckoutSession();
  }, [priceId, navigate, auth, tier]);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Redirecting to Payment...</h1>
        <p className="text-lg">Please wait while we process your request.</p>
        <div className="mt-8">
          <svg
            className="animate-spin h-12 w-12 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
