import express from 'express';
import { authorizedRoles, isLoggedIn } from '../middlewares/auth.middleware.js';
import { buySubscription, cancelSubscription, getPaymentDetails, razorpayApiKey, verifySubscription } from '../controllers/payment.controller.js';

const router = express.Router();

router
      .route('/razorpay-key')
      .get(
        isLoggedIn,
        razorpayApiKey
        );

router
      .route('/subscribe')
      .post(
        isLoggedIn,
        buySubscription
        );

router
      .route('/verify')
      .post(
        isLoggedIn,
        verifySubscription
        );

router
      .route('/unsubscribe')
      .post(
        isLoggedIn,
        cancelSubscription
        );

router
      .route('/')
      .get(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        getPaymentDetails
        );


export default router;