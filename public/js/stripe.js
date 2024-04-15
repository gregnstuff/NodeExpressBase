import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51OzesjGN6vblYd5zHZPbKRLVB0uSAbxRbHRveJQiOCqmr7rCTBhE5AaVVllZPL0scJVuzpLmZPNEIOx964J25F5k009fgaGwL3',
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    );

    // 2) Create checkout form + chaarge CC
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
