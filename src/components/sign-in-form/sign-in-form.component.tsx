import { useState, FormEvent, ChangeEvent } from "react";

import { useDispatch } from "react-redux";

import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { SignInContainer, Buttons } from "./sign-in-form.styles";
import { AuthError, AuthErrorCodes } from "firebase/auth";

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const dispatch = useDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        } catch (error) {

            switch ((error as AuthError).code) {
                case AuthErrorCodes.INVALID_PASSWORD:
                    alert('Incorrect password for email');
                    break;
                case AuthErrorCodes.USER_DELETED:
                    alert('No user associated with this email');
                    break;
                default:
                    console.log('error signing in', error as Error);
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