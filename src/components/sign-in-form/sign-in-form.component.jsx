import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { signInAuthUserEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

import { SignInContainer, Buttons } from "./sign-in-form.styles";

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChange = (event) => {

        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInAuthUserEmailAndPassword(email, password);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                default:
                    console.log('error signing in', error.message);
            }
        }
    };

    return (
        <SignInContainer>
            <h2>I already have an account</h2>
            <span>Sign In With Your Email And Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" onChange={handleChange} name="email" value={email}required/>
                <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password} required/>
                <Buttons>
                    <Button type='submit'>SIGN IN</Button>
                    <Button type='button' onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>GOOGLE SIGN IN</Button>
                </Buttons>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;