import React, { useState } from 'react';
import backdrop from '../../assets/backdrop.png';
import { auth as authFirebase } from "../../firebase/firebase";
import './Login.css';

import Spinner from '../../Elements/Spinner/Spinner'
import validate from '../../helpers/inputValidator'
import { useHistory } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {
    const [auth, setAuth] = useState(false)
    const initialSignup = {
        name: '',
        username: '',
        email: '',
        passsword: '',
        confirmPassword: ''
    }
    const initialLogin = {
        email: '',
        password: ''
    }

    const [signupState, setSignupState] = useState(initialSignup)
    const [loginState, setLoginState] = useState(initialLogin)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [isSigning, setIsSigning] = useState(false)
    const history = useHistory();

    const cleanupState = () => {
        setIsSigning(false)
        setSignupState(initialSignup)
        setLoginState(initialLogin)
        setError('')
        setLoading(false)
    }
    const toggleAuth = () => {
        setAuth(auth => !auth)
        cleanupState()

    }

    //connexion
    const onSubmitLogin = async (e) => {
        const { email, password } = loginState
        let signed = true;
        try {
            setLoading(true)
            e.preventDefault()
            await signInWithEmailAndPassword(authFirebase, email, password)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            signed = false;
            if (error.code === "auth/user-not-found") {
                alert("Cet utilisateur n'exite pas !")
            } else if (error.code === "auth/wrong-password") {
                alert("Votre mot de passe est incorrect !")
            } else {
                alert(error.message)
            }
        }
        if (signed) {
            history.replace("/home")
        }
    }

    const preSignup = (e) => {
        e.preventDefault()
        setIsSigning(true)
    }


    return (
        <section className='login__section'>
            <div className={`login__container ${auth ? 'active' : ''}`}>
                <div className="user signinBc">
                    <div className="imgBc"><img src={backdrop} alt='backdrop' /></div>
                    <div className="formBc">
                        <form autoComplete="off" onSubmit={onSubmitLogin}>
                            <h2>Log In</h2>
                            <input type="email" name='email' placeholder='Email' value={loginState.email} onChange={e => setLoginState({ ...loginState, email: e.target.value })} />
                            <input type="password" name='password' placeholder='Password' value={loginState.password} onChange={e => setLoginState({ ...loginState, password: e.target.value })} required />
                            <button type='submit' className='button'>{loading ? <Spinner /> : 'Log in'}</button>
                            {error.length > 0 && <div className='error'>{error}</div>}
                            <p className="signup">Don't have an account? <span onClick={toggleAuth}>Sign up</span></p>
                        </form>
                    </div>
                </div>
                <div className="user signupBc">
                    <div className="formBc">
                        <form autoComplete="off" onSubmit={preSignup} >
                            <h2>Create an Account</h2>
                            <input type="text" name="name" placeholder='Full Name' value={signupState.name} onChange={(e) => setSignupState({ ...signupState, name: e.target.value })} />
                            <input type="text" name="username" placeholder='Username' value={signupState.username} onChange={(e) => setSignupState({ ...signupState, username: e.target.value })} />
                            <input type="text" name="email" placeholder='Email' value={signupState.email} onChange={(e) => setSignupState({ ...signupState, email: e.target.value })} />
                            <input type="password" name="password" placeholder='Create Password' value={signupState.password} onChange={(e) => setSignupState({ ...signupState, password: e.target.value })} />
                            <input type="password" name="confirmPassword" placeholder='Confirm Password' value={signupState.confirmPassword} onChange={(e) => setSignupState({ ...signupState, confirmPassword: e.target.value })} />
                            {error.length > 0 && <div className='error'>{error}</div>}
                            <button type='submit' className='button'>{loading ? <Spinner /> : 'Sign up'}</button>
                            <p className="signup">have an account? <span onClick={toggleAuth}>Log in</span></p>
                        </form>
                    </div>
                    <div className="imgBc"><img src={backdrop} alt='backdrop' /></div>
                </div>

            </div>
        </section>
    );
}

export default Login;
