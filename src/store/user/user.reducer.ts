import { USER_ACTION_TYPES } from "./user.types";
import { 
    emailSignInStart, 
    googleSignInStart,
    signOutStart,
    signUpStart,
    signInSuccess,
    signOutSuccess,
    signInFailed,
    signOutFailed,
    signUpFailed
} from "./user.action";

import { AnyAction } from "redux";
import { UserData } from "../../utils/firebase/firebase.utils";

export type UserState = {
    readonly currentUser: UserData | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const USER_INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null
};

export const userReducer = (state = USER_INITIAL_STATE, action = {} as AnyAction): UserState => {
    const { type, payload } = action;

    if (emailSignInStart.match(action) || googleSignInStart.match(action) || signOutStart.match(action) || signUpStart.match(action)) {
        return {
            ...state,
            isLoading: true,
            error: null
        };
    }

    if (signInSuccess.match(action)) {
        return {
            ...state,
            isLoading: false,
            currentUser: payload
        };
    }

    if (signOutSuccess.match(action)) {
        return {
            ...state,
            isLoading: false,
            currentUser: null
        };
    }
    
    if (signInFailed.match(action) || signOutFailed.match(action) || signUpFailed.match(action)) {
        return {
            ...state,
            error: payload,
            isLoading: false
        };
    }

    return state;
};