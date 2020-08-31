import '@testing-library/jest-dom';
import { login, logout, startLoginWithEmailAndPassword, startLogout } from '../../actions/auth';
import { types } from '../../types/types';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

// Initialize mockstore with empty state
const initialState = {
    auth: {
        uid: 'ABCDE12345',
        displayName: 'Mr TEST',
        email: 'test@test.com'
    }

}
let store = mockStore(initialState)

describe('Pruebas en auth action', () => {

// limpiar el store cada vez que se inicializa un test
beforeEach( () => {

    store = mockStore(initialState);

});

    test('login y logout deben de crear la acción respectiva', () => {
       const user = {
           uid: 'ABCD123',
           displayName: 'Mr Prueba',
           email: 'prueba@prueba.com'
       }

       const {uid, displayName, email} = user
    
       
        const actionLogin = login(uid, displayName, email)
        expect(actionLogin).toEqual({
            type: types.login,
            payload: {
                uid: 'ABCD123',
                displayName: 'Mr Prueba',
                email: 'prueba@prueba.com'
            }
        })

        const actionLogout = logout()
        expect(actionLogout).toEqual({
            type: types.logout
        })

    })

    test('debe de realizar el startLogout', async() => {
        await store.dispatch(startLogout())
        const actions = store.getActions()
       // console.log(actions)
        
        expect( actions[0].type ).toBe(types.logout)
        expect( actions[1].type ).toBe(types.notesLogOutCleaned)

        expect( actions[0] ).toEqual({
            type: types.logout
        });

        expect( actions[1] ).toEqual({
            type: types.notesLogOutCleaned
        });

    })


    test('debe de iniciar el startLoginEmailPassword', async() => {
       // habilitar autenticacion en firebase email and password 
      // mockear usuario en firebase email y password
        await store.dispatch(startLoginWithEmailAndPassword('test@test.com', '123456'))
        const actions = store.getActions()
       // console.log(actions)
        expect( actions[1] ).toEqual({
            type: types.login,
            payload: {
                // uid que copiamos de firebase al crear el usuario
                uid: 'Y8eqdrLkv8gv9O0qHplfmXqLcfD2',
                displayName: null,
                email: 'test@test.com'
            }
        })
        
    })
})
