import { takeLatest, all, call, put } from "typed-redux-saga/macro";

import { USER_ACTION_TYPES } from "./user.types";

import { 
    signInSuccess, 
    signInFailed, 
    signOutFailed, 
    signOutSuccess, 
    signUpSuccess, 
    signUpFailed, 
    EmailSignInStart, 
    SignUpStart, 
    SignUpSucess 
} from "./user.action";

import { 
    getCurrentUser, 
    createUserDocumentFromAuth, 
    signInAuthUserEmailAndPassword, 
    signInWithGooglePopup,
    createAuthUserWithEmailAndPassword,
    signOutUser,
    AdditionalInformation
} from "../../utils/firebase/firebase.utils";

import { User } from "firebase/auth";

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if (!userAuth) return;
        yield* call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* getSnapshotFromUserAuth(userAuth: User, additionalInformation?: AdditionalInformation) {
    try {
        const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalInformation);

        if (userSnapshot) {
            yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signInWithEmailAndPassword({ payload }: EmailSignInStart) {
    const { email, password } = payload;
    try {
        const userCredential = yield* call(signInAuthUserEmailAndPassword, email, password);
        if (userCredential) {
            const { user } = userCredential;
            yield* call(getSnapshotFromUserAuth, user);
        }
        
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield* call(signInWithGooglePopup);
        yield* call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signUp({ payload }: SignUpStart) {
    const { displayName, email, password} = payload;
    try {
        const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password);
        if (userCredential) {
            const { user } = userCredential;
            yield* put(signUpSuccess(user, { displayName }));
        }
    } catch (error) {
        yield* put(signUpFailed(error as Error));
    }
}

export function* signInAfterSignUp({ payload }: SignUpSucess) {
    const { user, additionalInformation } = payload;
    yield* call(getSnapshotFromUserAuth, user, additionalInformation);

}

export function* signOut() {
    try {
        yield* call(signOutUser);
        yield* put(signOutSuccess());
    } catch (error) {
        yield* put(signOutFailed(error as Error));
    }
}

export function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignIn() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmailAndPassword)
}

export function* onGoogleSignIn() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onSignUp() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOut() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSaga() {
    yield* all([call(onCheckUserSession), call(onEmailSignIn), call(onGoogleSignIn), call(onSignUp), call(onSignUpSuccess), call(onSignOut)]);
}