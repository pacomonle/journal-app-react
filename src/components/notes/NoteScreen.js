import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NoteAppBar from './NoteAppBar'
import useForm from '../../hooks/useForm'
import { activeNote, startDeleting } from '../../actions/notes'

const NoteScreen = () => {

    const {active:note} = useSelector(state => state.notes)
    // console.log(note)
    const [formValue, reset,  handleInputChange] = useForm(note)
    const { body, title, id} = formValue;
    
    const dispatch = useDispatch()
    
    // el hook useRef da acceso al valor actual .current
    const activeId = useRef( note.id );

    useEffect(() => {
        
        if ( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id
        }

    }, [note, reset])

    useEffect(() => {
        // actualizar nota activa
        dispatch( activeNote( formValue.id, { ...formValue } ) );

    }, [formValue, dispatch])

    
    const handleDelete = () => {
        dispatch( startDeleting( id ) );
    }

    return (
        <div className="notes__main-content">
            
            <NoteAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name = 'title'
                    value = {title}
                    onChange = {handleInputChange}
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    name = 'body'
                    value = { body }
                    onChange = {handleInputChange}
                ></textarea>

               { note.url && 
                   
                 (  <div className="notes__image">
                       <img 
                       src={ note.url }
                       alt="imagen"
                        />
                    </div>)

               }
            </div>
            <button 
                className="btn btn-danger"
                onClick={ handleDelete }
                >
                Delete
            </button>
        </div>
    )
}

export default NoteScreen
