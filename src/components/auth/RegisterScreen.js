import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { startRegisterWithEmailAndPassword } from '../../actions/auth'
import { removeError, setError } from '../../actions/ui'
import useForm from '../../hooks/useForm'

const RegisterScreen = () => {
     // para disparar las actions
    const dispatch = useDispatch()
    // para acceder al state ->  const state = useSelector(state => state.state)
    const { msgError, loading } = useSelector(state => state.ui)
    
    const [formValue, reset,  handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formValue

    const handleInputSubmit = (e) =>{
        e.preventDefault();
       // console.log(name, email, password)
        if(isFormValid()){
            console.log('Formulario correcto')
            dispatch( startRegisterWithEmailAndPassword(email, password, name) );
        }
         reset()
    }

    const isFormValid = () => {
        if ( name.trim().length === 0 ) {
            dispatch( setError('Name is required') )
            return false

        }else if ( !validator.isEmail( email ) ){
            dispatch( setError('Email is not valid') )
            return false

        } else if ( password !== password2 || password.length < 5 ){
            dispatch( setError('Password should be at least 6 characters and match each other') )
            return false

        }
        
        dispatch( removeError() );

        return true
    }



    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form 
            className="animate__animated animate__fadeIn animate__faster"
            onSubmit={handleInputSubmit}>
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
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                    className="auth__input"
                    autoComplete="on"
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    className="auth__input"
                    autoComplete="on"
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    className="auth__input"
                />

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    value={password2}
                    onChange={handleInputChange}
                    className="auth__input"
                />


                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

               

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}

export default RegisterScreen
