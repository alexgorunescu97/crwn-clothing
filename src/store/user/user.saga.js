import { takeLatest, all, call, put } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";

import { signInSuccess, signInFailed, signOutFailed, signOutSuccess, signUpSuccess, signUpFailed } from "./user.action";

import { 
    getCurrentUser, 
    createUserDocumentFromAuth, 
    signInAuthUserEmailAndPassword, 
    signInWithGooglePopup,
    createAuthUserWithEmailAndPassword,
    signOutUser
} from "../../utils/firebase/firebase.utils";

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* getSnapshotFromUserAuth(userAuth, additionalInformation) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalInformation);
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithEmailAndPassword({ payload }) {
    const { email, password } = payload;
    try {
        const { user } = yield call(signInAuthUserEmailAndPassword, email, password);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signUp({ payload }) {
    const { displayName, email, password} = payload;
    try {
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield put(signUpSuccess(user, { displayName }));
    } catch (error) {
        yield put(signUpFailed(error));
    }
}

export function* signInAfterSignUp({ payload }) {
    const { user, additionalInformation } = payload;
    yield call(getSnapshotFromUserAuth, user, additionalInformation);

}

export function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed(error));
    }
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignIn() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmailAndPassword)
}

export function* onGoogleSignIn() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onSignUp() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOut() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSaga() {
    yield all([call(onCheckUserSession), call(onEmailSignIn), call(onGoogleSignIn), call(onSignUp), call(onSignUpSuccess), call(onSignOut)]);
}