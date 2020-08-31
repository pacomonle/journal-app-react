import React from 'react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import RegisterScreen from '../../../components/auth/RegisterScreen';
import { mount } from 'enzyme';
import { types } from '../../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// jest.mock('../../../actions/auth', () => ({
//     startGoogleLogin: jest.fn(),
//     startLoginEmailPassword: jest.fn(),
// }))

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
};

let store = mockStore(initState);
// el mock solo para accione asyncronas
// store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <MemoryRouter>
            <RegisterScreen /> 
        </MemoryRouter>
    </Provider>

)

describe('Pruebas en <RegisterScreen />', () => {
    test('debe de mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();
 
    })

    test('debe de hacer el dispatch de la acción respectiva', () => {

        const emailField = wrapper.find('input[name="email"]');
        // console.log(emailField.html())
        emailField.simulate('change', {
            target: {
                value: '',
                name: 'email'
            }
        });
        
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        const actions = store.getActions();
        // console.log(actions)
        expect( actions[0] ).toEqual({
            type: types.uiSetError,
            // payload: 'Email is not valid'
            payload: 'Name is required'
        });
        
    })
     
  
    
})

test('debe de mostrar la caja de alerta con el error', () => {

    const initState = {
        auth: {},
        ui: {
            loading: false,
            msgError: 'Email no es correcto'
        }
    };
    
    const store = mockStore(initState);
    
    
    const wrapper = mount( 
        <Provider store={ store }>
            <MemoryRouter>
                <RegisterScreen /> 
            </MemoryRouter>
        </Provider>
    );

    
    expect( wrapper.find('.auth__alert-error').exists()  ).toBe(true);
    expect( wrapper.find('.auth__alert-error').text().trim()  ).toBe( initState.ui.msgError );


    
})