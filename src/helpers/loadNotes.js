import { db } from "../firebase/firebaseConfig";




export const loadNotes = async ( uid ) => {

    const notesSnap = await db.collection(`${ uid }/journal/notes`).get();
   // console.log(notesSnap)
    const notes = [];

    notesSnap.forEach( note => {
      //  console.log(note.data(), note.id)
        notes.push({
            id: note.id,
            ...note.data()
        })
    });
    console.log(notes)
    return notes;
}



