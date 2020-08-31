import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { auth } from '../../firebase/firebaseConfig';


import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { act } from '@testing-library/react';


jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 'ABC',
        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();





describe('Pruebas en <AppRouter />', () => {

    test('debe de llamar el login si estoy autenticado -> useEffect', async() => {
        
        let user;

        await act( async () => {
            // funciond e firebase que retona el usercredentialS
            const userCred = await auth.signInWithEmailAndPassword('test@test.com', '123456');
           // console.log(userCred)
            user = userCred.user;
            

            const wrapper = mount( 
                <Provider store={ store }>
                    <MemoryRouter>
                        <AppRouter /> 
                    </MemoryRouter>
                </Provider>
    
            )

        });


      expect( login ).toHaveBeenCalledWith('Y8eqdrLkv8gv9O0qHplfmXqLcfD2', null, "test@test.com");



    })
    
    
})

