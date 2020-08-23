import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { startLoginWithEmailAndPassword, startLoginWithGoogle } from '../../actions/auth'
import { removeError, setError } from '../../actions/ui'
import useForm from '../../hooks/useForm'

const LoginScreen = () => {

const dispatch = useDispatch()
const {msgError, loading} = useSelector(state => state.ui)

const [formValue, reset,  handleInputChange] = useForm({
    email: '',
    password: ''
})

const {email, password} = formValue

const handleInputSubmit = (e) =>{
     e.preventDefault();
    // console.log(email, password)
   //  dispatch(Login(12345, 'FRancisco'))
   console.log('Formulario correcto')
   if(isFormValid()){
    dispatch(startLoginWithEmailAndPassword(email, password))
    reset()
   }  
}

const handleGoogleLogin = () =>{
   
    dispatch(startLoginWithGoogle())
}

const isFormValid = () => {

    if ( !validator.isEmail( email ) ){
        dispatch( setError('Email is not valid') )
        return false

    } else if (  password.length < 5 ){
        dispatch( setError('Password should be at least 6 characters') )
        return false

    }
    
    dispatch( removeError() );

    return true
}



    return (
        <>
        <h3 className="auth__title">Login</h3>

        <form onSubmit={handleInputSubmit}>
        {
            msgError &&
            (
                <div className="auth__alert-error">
                    { msgError }
                </div>
            )
        }
            <input 
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleInputChange}
                className="auth__input"
                autoComplete ='on'  
            />

            <input 
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleInputChange}
                className="auth__input"
            />


            <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
            >
                Login
            </button>

            
            <div className="auth__social-networks">
                <p>Login with social networks</p>

                <div 
                    className="google-btn"
                    onClick={handleGoogleLogin}
                >
                    <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                    </div>
                    <p className="btn-text">
                        <b>Sign in with google</b>
                    </p>
                </div>
            </div>

            <Link 
                to="/auth/register"
                className="link"
            >
                Create new account    
            </Link>

        </form>
    </>
    )
}

export default LoginScreen
