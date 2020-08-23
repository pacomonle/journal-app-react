import { types } from "../types/types"


const authReducer = (state={}, action) => {
   
   // manejo de actions
   switch (action.type) {
       case types.login:
           
           return {
               uid: action.payload.uid,
               name: action.payload.displayName,
               email: action.payload.email
           }
       case types.logout:
           
          return { }
       default:
          return state
   }
   
    
     
}

export default authReducer
