import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'


import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import NoteScreen from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/notes';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../actions/notes', () => ({
    activeNote : jest.fn()
}))

const initState = {
    auth: {
        uid: '1',
        name: 'Fernando',
        email: 'test@test.com'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: '1234',
            title:'presentacion',
            body:'esta es una nota de prueba'
        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
         <NoteScreen />
    </Provider>
    
    )

describe('Pruebas en <NoteScreen />', () => {
    test('should mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('debe de disparar el active note', () => {
     // hay que disparar el useEffect -> modificar formValue -es decir un input
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola de nuevo'
            }
        });


        expect( activeNote ).toHaveBeenLastCalledWith(
            '1234',
            {
                body: 'esta es una nota de prueba',
                title: 'Hola de nuevo',
                id:'1234',         
            }
        );
    })
    
})
