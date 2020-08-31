import { types } from "../types/types"
import { auth, googleAuthProvider } from '../firebase/firebaseConfig'
import { finishLoading, startLoading } from "./ui";
import Swal from "sweetalert2";
import { noteLogout } from "./notes";

// peticion asincrona que devuelve un callback
export const startLoginWithEmailAndPassword = (email, password) =>{

return ((dispatch) =>{
   dispatch( startLoading() );
            
      return  auth.signInWithEmailAndPassword( email, password )
            .then( ({ user }) => {
                dispatch(login( user.uid, user.displayName, user.email ));

                dispatch( finishLoading() );
            })
            .catch( e => {
                console.log(e);
                dispatch( finishLoading() );
                Swal.fire('Error', e.message, 'error');
            })
})

}

export const startRegisterWithEmailAndPassword = (email, password, name) =>{

    return ((dispatch) =>{
        dispatch( startLoading() );

    return  auth.createUserWithEmailAndPassword( email, password )
        .then( async({ user }) => {
            // actualizar el name al profile del user
            await user.updateProfile({ displayName: name });
 
            dispatch(
                login( user.uid, user.displayName, user.email )
            );
            dispatch( finishLoading() );
        })
        .catch( e => {
            console.log(e);
            dispatch( finishLoading() );
            Swal.fire('Error', e.message, 'error');
        })

    })
    
    }

export const startLoginWithGoogle = () => {

return ((dispatch)=>{

 return auth.signInWithPopup(googleAuthProvider)
  .then(({user}) =>{
      console.log(user)
      dispatch(
        login( user.uid, user.displayName, user.email )
      )
  })
  
})

}


export const login = (uid, displayName, email) => ( 
    {
        type: types.login,
        payload: {uid, displayName, email}
    }
)


export const startLogout = () => {
    return async( dispatch ) => {
        await auth.signOut();

        dispatch( logout() );
        dispatch( noteLogout() );
    }
}


export const logout = () => ({
    type: types.logout
})