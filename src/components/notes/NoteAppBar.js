import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';
import moment from 'moment'

const NoteAppBar = () => {
    const date = new Date().getFullYear()
    const noteDate = moment(date).format("MMM Do YY");

    const dispatch = useDispatch()
    const {active} = useSelector(state => state.notes)
   
    const handleSave = () => {

        dispatch( startSaveNote( active ) );
    }

    const handlePictureClick = () => {
        
       // simular input file en un button 
       document.querySelector('#fileSelector').click();
    }

    const handleFileChange  = (e) => {
        const file = e.target.files[0];
        console.log(file)
        if ( file ) {
           dispatch( startUploading( file ) );
        }
    }

    return (
        <div className="notes__appbar">
            <span>{noteDate}</span>
              {/** simular input file en un button con display : none */}
              <input 
              id="fileSelector"
              type="file"
              name="file"
              style={{ display: 'none' }}
              onChange={ handleFileChange }
             />
            <div>
                <button 
                onClick={ handlePictureClick }
                className="btn">
                    Picture
                </button>

                <button 
                onClick={ handleSave }
                className="btn">
                    Save
                </button>
            </div>
        </div>
    )
}

export default NoteAppBar
