import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { FormEvent, useState } from "react";

import { selectTotalPrice } from "../../store/cart/cart.selector"; 
import { selectCurrentUser } from "../../store/user/user.selector";

import { clearCart } from "../../store/cart/cart.action";

import { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";
import { StripeCardElement } from "@stripe/stripe-js";

const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement =>  card !== null

const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectTotalPrice);
    const currentUser = useSelector(selectCurrentUser);

    const dispatch = useDispatch();

    const [isProcessingPayment, setProcessingPayment] = useState(false);

    const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setProcessingPayment(true);

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: amount * 100
            })
        }).then(res => res.json());

        if (response.error) {
            setProcessingPayment(false);
            alert(`An error occured while making the payment: ${response.error.code}`);
            return;
        }

        const cardDetails = elements.getElement(CardElement);

        if (!ifValidCardElement(cardDetails)) {
            return;
        }

        const { paymentIntent: { client_secret } } = response;
        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: cardDetails,
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest'
                }
            }
        });

        setProcessingPayment(false);

        if (paymentResult.error) {
            alert(`An error occured while making the payment: ${paymentResult.error.message}`);
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                dispatch(clearCart());
                cardDetails.clear();
                alert('Payment Successful');
            }
        }
    }; 

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit card payment: </h2>
                <CardElement />
                <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
};

export default PaymentForm;