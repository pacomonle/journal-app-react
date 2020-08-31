import Swal from "sweetalert2"
import { db } from "../firebase/firebaseConfig"
import { fileUpload } from "../helpers/fileUpload"
import { loadNotes } from "../helpers/loadNotes"
import { types } from "../types/types"


export const startNewNote = () => {
   
   return (
     async(dispatch, getState) => {

        // getState funcion para acceder al state de la libreria redux-thunk
        const {auth:{uid}} = getState()
        // console.log(uid)
         const newNote = {
             title: '',
             body: '',
             date: new Date().getTime()
         }


        try {
            const docRef = await db.collection(`${ uid }/journal/notes`).add( newNote );
    
            dispatch( activeNote( docRef.id, newNote ) );
            dispatch( addNewNote( docRef.id, newNote ) );
            
        } catch (error) {
            console.log(error);
        }
 
   })

}

export const activeNote = (id, note) => ({
        type: types.notesActive,
        payload: {
            id,
            ...note
        }
    })

export const addNewNote = ( id, note ) => ({
        type: types.notesAddNew,
        payload: {
            id, ...note
        }
    })   

export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {
            
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    
        }
    }


export const setNotes = (notes) => ({

        type: types.notesLoad,
        payload: notes

})


export const startSaveNote = ( note ) => {
    return async( dispatch, getState ) => {

        const { auth:{ uid } } = getState();

        if ( !note.url ){
            delete note.url;
        }
        // hacer un clon de la note
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );

        dispatch( refreshNote( note.id, noteToFirestore ) );
        Swal.fire('Saved', note.title, 'success');
    }
}

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});

export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {

        const { active:activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });
       // ir al api backend de archivos (cloudinary) a guardar imagen
        const fileUrl = await fileUpload( file );
        // guardar url en la nota activa
        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote ) )
        

        Swal.close();
    }
}

export const startDeleting = ( id ) => {
    return async( dispatch, getState ) => {
        
        const { uid }= getState().auth;
        // al ser una promesa podriamos hacer un try / catch
        await db.doc(`${ uid }/journal/notes/${ id }`).delete();

        dispatch( deleteNote(id) );

    }
}

export const deleteNote = (id) => ({
    type: types.notesDeleted,
    payload: id
});


export const noteLogout = () => ({
    type: types.notesLogOutCleaned
});
