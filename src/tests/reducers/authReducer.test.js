const { default: authReducer } = require("../../reducers/authReducer");
const { types } = require("../../types/types");

describe('Pruebas en authreducer', () => {
    test('should retornar el state por defaul', () => {
         // todoReducer = (state= {}, action) => { }  / state = {} - action = {type, payload}
         const stateInitial = {}
         const state = authReducer( stateInitial, {});
         expect( state ).toEqual( stateInitial );
    })


    test('debe de hacer LOGIN', () => { 
        const initState = {};

        const user = {   
            name: 'Mr Prueba',
            email: 'prueba@prueba.com',
            uid:'123456ABCDE',
        }

        const action = {
            type : types.login,
            payload: {
                displayName: 'Mr Prueba',
                email: 'prueba@prueba.com',
                uid:'123456ABCDE',
            }
        }
  // todoReducer = (state= {}, action) => { }  / state = {} - action = {type, payload}
     const state = authReducer( initState, action);
     console.log(state)
     
     
     expect( state ).toEqual(user);

    })



    test('debe de hacer LOGOUT', () => {

        const initState = {
            displayName: 'Mr Prueba',
            email: 'prueba@prueba.com',
            uid:'123456ABCDE',     
        }
        
        const action = {
            type : types.logout,
        }
  // todoReducer = (state= [], action) => { }  / state = [] - action = {type, payload}
     const state = authReducer( initState, action);
     console.log(state)
     
   
     expect( state ).toEqual( {} );
    })

        
    test('no debe de hacer cambios en el state', () => {

        const initState = {
            uid: 'jagdfjahdsf127362718',
            name: 'Fernando',
            email: 'jshsgdf@kshjdghd.es'
        };
      
        // mandamos una action que no existe
        const action = {
            type: 'asdjkasd',
        };

        const state = authReducer( initState, action );

        expect( state ).toEqual( initState );
 
    })
    


})
