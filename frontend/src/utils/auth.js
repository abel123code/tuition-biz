import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, updatePassword, sendEmailVerification, FacebookAuthProvider, GithubAuthProvider, linkWithPopup } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

export const doSignInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider)
    //result.user

    return result
}

export const doSignOut = () => {
    return auth.signOut()
}

export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email)
}

export const doSignInWithFacebook = async () => {
    const provider = new FacebookAuthProvider(); 
    try {
        const result = await signInWithPopup(auth, provider);
        return result;
    } catch (error) {
        console.error('Facebook sign-in error:', error);
        throw error;
    }
}

export const doSignInwithGithub = async () => {
    const provider = new GithubAuthProvider(); 
    try {
        const result = await signInWithPopup(auth,provider)
        return result
    } catch (error) {
        console.error('Github Sign in error: ', error)
        throw error
    }
}

export const linkWithGithub = async () => {
    const auth = getAuth();
    const provider = new GithubAuthProvider();
    return await linkWithPopup(auth.currentUser, provider);
};

// export const doPasswordChange = (password) => {
//     return updatePassword(auth.currentUser, password)
// }

// export const doSendEmailVerfication = () => {
//     return sendEmailVerification(auth.currentUser, {
//         url: `${window.location.origin}/home`
//     })
// }