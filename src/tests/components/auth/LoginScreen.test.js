import '@testing-library/jest-dom'
import React from 'react';
import { Provider } from 'react-redux';
import LoginScreen from '../../../components/auth/LoginScreen'
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom';
import { startLoginWithEmailAndPassword, startLoginWithGoogle } from '../../../actions/auth';
const { mount } = require("enzyme")

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
// mockeo de las actions
jest.mock('../../../actions/auth', () => ({
    startLoginWithGoogle : jest.fn(),
    startLoginWithEmailAndPassword : jest.fn(),
}))

// Initialize mockstore with empty state
const initialState = {
    auth:{},
    ui:{
        loading: false,
        msgError: null
    }
}
let store = mockStore(initialState)
// mockeo del dispatch
store.dispatch = jest.fn();
// hay que crear enl context de recat-redux -> <Provider></Provider>
const wrapper = mount(
    <Provider store={store}>
       <MemoryRouter>
            <LoginScreen />
       </MemoryRouter>
    </Provider>
    )

describe('Pruebas en <LoginScreen/>', () => {

    // limpiar el store cada vez que se inicializa un test
        beforeEach( () => {

            store = mockStore(initialState);
            jest.clearAllMocks();
        });


    test('debe de mostrarse correctamente', () => {
        
            expect( wrapper ).toMatchSnapshot();
    
        });


    test('debe de disparar la acción de startGoogleLogin', () => {

        wrapper.find('.google-btn').prop('onClick')();

        expect( startLoginWithGoogle ).toHaveBeenCalled();

        })
     
    test('debe de disparar el startLoginWithEmailAndPassword con los respectivos argumentos', () => {

            
        wrapper.find('form').prop('onSubmit')({ 
            preventDefault(){}
        });
        
 // se llama con dos argumentos '' ->  dispatch(startLoginWithEmailAndPassword(email, password))
        expect( startLoginWithEmailAndPassword ).toHaveBeenLastCalledWith("emai@email.com", "123456");


        })
})
