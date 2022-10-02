import { useState } from "react";

import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { SignUpContainer } from "./sign-up-form.styles";
import { signUpStart } from "../../store/user/user.action";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const dispatch = useDispatch();

    const handleChange = (event) => {

        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try {
            dispatch(signUpStart(displayName, email, password));
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log('error creating the user', error.message);
            }
        }
    };

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign Up With Your Email And Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" onChange={handleChange} name="displayName" value={displayName} required/>
                <FormInput label="Email" type="email" onChange={handleChange} name="email" value={email}required/>
                <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password} required/>
                <FormInput label="Confirm Password" type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} required/>
                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    );
};

export default SignUpForm;