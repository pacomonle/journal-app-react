import '@testing-library/jest-dom'
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes'
import { db } from '../../firebase/firebaseConfig'
import { fileUpload } from '../../helpers/fileUpload'
import { types } from '../../types/types'
// const { configureStore } = require('redux-mock-store') //CommonJS
 
const middlewares = [thunk]
const mockStore = configureStore(middlewares)

// importar fileUpload para mockear su path
jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn( () => {
        // mockeo de return de una url
        return 'https://hola-mundo.com/cosa.jpg';
        // return Promise.resolve('https://hola-mundo.com/cosa.jpg');
    })
}))

// Initialize mockstore with empty state
const initialState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: 'Q0O6qUBly8YJqsUjNnuV',
            title: 'Hola',
            body: 'Mundo'
        }
    }
}
let store = mockStore(initialState)

describe('Pruebas en notes action', () => {
// limpiar el store cada vez que se inicializa un test
beforeEach( () => {

    store = mockStore(initialState);

});

    test('debe de crear una nueva nota startNewNote' , async() => {
        await store.dispatch(startNewNote())
        const actions = store.getActions()
        // console.log(actions)

        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                    id: expect.any(String),
                    title: '',
                    body: '',
                    date: expect.any(Number)
                    }
        })

        expect( actions[1] ).toEqual({
            type: types.notesAddNew,
            payload: {
                    id: expect.any(String),
                    title: '',
                    body: '',
                    date: expect.any(Number) 
                    }
        })
 
        const docId = actions[0].payload.id
        await db.doc(`/TESTING/journal/notes/${ docId }`).delete();
    })

    test('startLoadingNotes debe cargar las notas', async() => {

        await store.dispatch(startLoadingNotes('TESTING'))
        const actions = store.getActions()
       // console.log(actions)

        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        }

        expect( actions[0].payload[0] ).toMatchObject( expected );
    })
    

    test('startSaveNote debe de actualizar la nota', async() => {
        const note = {
            // debe de ser un id real de la firebase data base
            id: '3WGTIZik6022lWBw3Jn3',
            title: 'titulo',
            body: 'body'
        };

        await store.dispatch(startSaveNote(note))
        const actions = store.getActions()
       // console.log(actions)
        expect( actions[0].type ).toBe( types.notesUpdated );

        const docRef = await db.doc(`/TESTING/journal/notes/${ note.id }`).get();

        expect( docRef.data().title ).toBe( note.title );
    })

    test('startUploading debe de actualizar el url del entry', async() => {

        const file = new File([], 'foto,jpg')
        await store.dispatch(startUploading(file))

        const docRef = await db.doc('/TESTING/journal/notes/Q0O6qUBly8YJqsUjNnuV').get();
        expect( docRef.data().url ).toBe('https://hola-mundo.com/cosa.jpg');

    })


})
